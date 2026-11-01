import { Router } from "express";
import rateLimit from "express-rate-limit";
import { createMessage, deleteMessage, listMessages, updateMessage } from "../controllers/message.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many messages sent, please try again later" },
});

export const messageRouter = Router();

messageRouter.post("/", submitLimiter, asyncHandler(createMessage));
messageRouter.get("/admin", requireAuth, asyncHandler(listMessages));
messageRouter.patch("/:id", requireAuth, asyncHandler(updateMessage));
messageRouter.delete("/:id", requireAuth, asyncHandler(deleteMessage));
