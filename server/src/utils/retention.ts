import { Booking } from "../models/Booking.js";
import { Message } from "../models/Message.js";

// The privacy policy promises contact requests are kept 3 years, no longer
const RETENTION_YEARS = 3;
const DAY = 24 * 60 * 60 * 1000;

export const purgeOldRequests = async () => {
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - RETENTION_YEARS);

  const [messages, bookings] = await Promise.all([
    Message.deleteMany({ createdAt: { $lt: cutoff } }),
    // Booking dates are YYYY-MM-DD strings, which sort like dates
    Booking.deleteMany({ date: { $lt: cutoff.toISOString().slice(0, 10) } }),
  ]);
  if (messages.deletedCount || bookings.deletedCount) {
    console.log(`Retention: deleted ${messages.deletedCount} messages and ${bookings.deletedCount} bookings older than ${RETENTION_YEARS} years`);
  }
};

// Once at startup, then daily. A failed run is retried the next day.
export const scheduleRetention = () => {
  const run = () => purgeOldRequests().catch((err) => console.error("Retention purge failed", err));
  run();
  setInterval(run, DAY).unref();
};
