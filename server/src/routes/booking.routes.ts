import { Router } from "express";
import rateLimit from "express-rate-limit";
import { createBooking, deleteBooking, getAvailability, listBookings, updateBookingStatus } from "../controllers/booking.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many bookings sent, please try again later" },
});

export const bookingRouter = Router();

bookingRouter.get("/availability", asyncHandler(getAvailability));
bookingRouter.post("/", submitLimiter, asyncHandler(createBooking));
bookingRouter.get("/admin", requireAuth, asyncHandler(listBookings));
bookingRouter.patch("/:id/status", requireAuth, asyncHandler(updateBookingStatus));
bookingRouter.delete("/:id", requireAuth, asyncHandler(deleteBooking));
