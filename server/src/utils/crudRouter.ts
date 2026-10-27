import { Request, Response, Router } from "express";
import { FilterQuery, Model, isValidObjectId } from "mongoose";
import { requireAuth } from "../middleware/auth.middleware.js";
import { HttpError } from "../middleware/error.middleware.js";
import { asyncHandler } from "./asyncHandler.js";

type CrudOptions = {
  // Filter applied to the public listing, e.g. only visible items
  publicFilter?: FilterQuery<unknown>;
  // Fields never sent to the public listing
  publicExclude?: string;
  sort?: Record<string, 1 | -1>;
};

const readOnlyFields = ["_id", "__v", "createdAt", "updatedAt"];

const cleanBody = (body: Record<string, unknown>) => {
  const data = { ...body };
  for (const field of readOnlyFields) delete data[field];
  return data;
};

const assertId = (id: string) => {
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid id");
};

// Standard collection endpoints: public listing, admin listing, create, update,
// reorder and delete. Every write requires authentication.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCrudRouter = (
  model: Model<any>,
  { publicFilter = {}, publicExclude, sort = { order: 1, createdAt: -1 } }: CrudOptions = {},
) => {
  const router = Router();

  router.get(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
      const query = model.find(publicFilter).sort(sort);
      if (publicExclude)
        query.select(
          publicExclude
            .split(" ")
            .map((field) => `-${field}`)
            .join(" "),
        );
      res.json(await query);
    }),
  );

  router.get(
    "/admin",
    requireAuth,
    asyncHandler(async (req: Request, res: Response) => {
      res.json(await model.find().sort(sort));
    }),
  );

  router.post(
    "/",
    requireAuth,
    asyncHandler(async (req: Request, res: Response) => {
      const data = cleanBody(req.body);
      if (data.order === undefined) {
        const last = await model.findOne().sort({ order: -1 });
        data.order = last ? last.order + 1 : 0;
      }
      res.status(201).json(await model.create(data));
    }),
  );

  // Declared before "/:id" so "reorder" isn't read as an id
  router.put(
    "/reorder",
    requireAuth,
    asyncHandler(async (req: Request, res: Response) => {
      const ids = req.body?.ids;
      if (!Array.isArray(ids) || !ids.every((id) => typeof id === "string" && isValidObjectId(id))) {
        throw new HttpError(400, "ids must be an array of ids");
      }
      await model.bulkWrite(ids.map((id, order) => ({ updateOne: { filter: { _id: id }, update: { $set: { order } } } })));
      res.json(await model.find().sort(sort));
    }),
  );

  router.put(
    "/:id",
    requireAuth,
    asyncHandler(async (req: Request, res: Response) => {
      assertId(req.params.id);
      const doc = await model.findByIdAndUpdate(req.params.id, cleanBody(req.body), { new: true, runValidators: true });
      if (!doc) throw new HttpError(404, "Not found");
      res.json(doc);
    }),
  );

  router.delete(
    "/:id",
    requireAuth,
    asyncHandler(async (req: Request, res: Response) => {
      assertId(req.params.id);
      const doc = await model.findByIdAndDelete(req.params.id);
      if (!doc) throw new HttpError(404, "Not found");
      res.status(204).send();
    }),
  );

  return router;
};
