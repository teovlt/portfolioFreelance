import { Router } from "express";
import { getStats } from "../controllers/stats.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const statsRouter = Router();

statsRouter.get("/", requireAuth, asyncHandler(getStats));
