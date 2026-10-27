import rateLimit from "express-rate-limit";
import { submitReview } from "../controllers/review.controller.js";
import { Review, ReviewStatus } from "../models/Review.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createCrudRouter } from "../utils/crudRouter.js";

export const reviewRouter = createCrudRouter(Review, {
  publicFilter: { status: ReviewStatus.PUBLISHED },
  publicExclude: "email submitted status",
});

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many reviews sent, please try again later" },
});

// Express matches routes in registration order; "/submit" is a POST path the
// CRUD router doesn't define, so adding it afterwards is fine.
reviewRouter.post("/submit", submitLimiter, asyncHandler(submitReview));
