import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAdminProject,
  getProject,
  listAdminProjects,
  listProjects,
  updateProject,
} from "../controllers/project.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const projectRouter = Router();

projectRouter.get("/", asyncHandler(listProjects));
// Declared before "/:slug" so "admin" isn't read as a slug
projectRouter.get("/admin", requireAuth, asyncHandler(listAdminProjects));
projectRouter.get("/admin/:slug", requireAuth, asyncHandler(getAdminProject));
projectRouter.get("/:slug", asyncHandler(getProject));
projectRouter.post("/", requireAuth, asyncHandler(createProject));
projectRouter.put("/:slug", requireAuth, asyncHandler(updateProject));
projectRouter.delete("/:slug", requireAuth, asyncHandler(deleteProject));
