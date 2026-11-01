import { Schema, model } from "mongoose";

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  DECLINED = "declined",
}

// Call slots offered on weekdays, in Paris time. The site shows exactly these.
export const BOOKING_SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

const bookingSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    details: { type: String, trim: true, default: "" },
    package: { type: String, trim: true, default: "" },
    // Kept as plain strings (YYYY-MM-DD, HH:mm) so a slot means the same thing
    // whatever the server's or visitor's timezone
    date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    time: { type: String, required: true, enum: BOOKING_SLOTS },
    status: { type: String, enum: Object.values(BookingStatus), default: BookingStatus.PENDING },
    // Mirrors status !== declined; the unique index below only covers active
    // bookings, so declining one frees its slot
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// The database itself refuses a second active booking on the same slot, which
// also covers two visitors submitting at the same moment
bookingSchema.index({ date: 1, time: 1 }, { unique: true, partialFilterExpression: { active: true } });

export const Booking = model("Booking", bookingSchema);
