import { Router } from "express";
import { getContactInfo, updateContactInfo } from "../controllers/contact.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const contactRouter = Router();

contactRouter.get("/", asyncHandler(getContactInfo));
contactRouter.put("/", requireAuth, asyncHandler(updateContactInfo));
