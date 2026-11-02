import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, me } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Stops password guessing; successful logins don't count against the limit
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many login attempts, please try again later" },
});

export const authRouter = Router();

authRouter.post("/login", loginLimiter, asyncHandler(login));
authRouter.get("/me", requireAuth, asyncHandler(me));
