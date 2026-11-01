import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { HttpError } from "../middleware/error.middleware.js";
import { Booking, BOOKING_SLOTS, BookingStatus } from "../models/Booking.js";
import { notifyByFormspree } from "../utils/notify.js";
import { isEmail, str } from "../utils/input.js";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_DAYS_AHEAD = 90;

// Current date and time in Paris, where the calls take place
const parisNow = () => {
  const [date, time] = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date())
    .split(" ");
  return { date, time };
};

const addDays = (date: string, days: number) => {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

const isWeekend = (date: string) => [0, 6].includes(new Date(`${date}T12:00:00Z`).getUTCDay());

const isDuplicateKey = (err: unknown) => (err as { code?: number })?.code === 11000;

// Which slots are taken between two dates. Only dates and times leave the
// server, never who booked them.
export const getAvailability = async (req: Request, res: Response) => {
  const from = str(req.query.from, 10);
  const to = str(req.query.to, 10);
  if (!DATE_RE.test(from) || !DATE_RE.test(to) || to < from || to > addDays(from, 62)) {
    throw new HttpError(400, "Invalid date range");
  }

  const bookings = await Booking.find({ active: true, date: { $gte: from, $lte: to } })
    .select("date time")
    .lean();
  const taken: Record<string, string[]> = {};
  for (const { date, time } of bookings) (taken[date] ??= []).push(time);

  const now = parisNow();
  res.json({ slots: BOOKING_SLOTS, taken, now, maxDate: addDays(now.date, MAX_DAYS_AHEAD) });
};

export const createBooking = async (req: Request, res: Response) => {
  const body = req.body ?? {};

  // Honeypot, see review.controller
  if (str(body.website2, 200)) return res.status(201).json({ ok: true });

  const name = str(body.name, 80);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const details = str(body.details, 2000);
  const pkg = str(body.package, 120);
  const date = str(body.date, 10);
  const time = str(body.time, 5);
  const now = parisNow();

  if (name.length < 2) throw new HttpError(400, "Name is required");
  if (!isEmail(email)) throw new HttpError(400, "Invalid email");
  if (phone.replace(/\D/g, "").length < 6) throw new HttpError(400, "Invalid phone number");
  if (!DATE_RE.test(date) || !BOOKING_SLOTS.includes(time)) throw new HttpError(400, "Invalid slot");
  if (isWeekend(date) || date > addDays(now.date, MAX_DAYS_AHEAD) || date < now.date || (date === now.date && time <= now.time)) {
    throw new HttpError(400, "This slot isn't available");
  }

  let booking;
  try {
    booking = await Booking.create({ name, email, phone, details, package: pkg, date, time });
  } catch (err) {
    if (isDuplicateKey(err)) throw new HttpError(409, "This slot was just taken");
    throw err;
  }

  const dateLabel = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(
    new Date(`${date}T12:00:00Z`),
  );
  // Not awaited: the visitor shouldn't wait on Formspree
  void notifyByFormspree({
    _subject: `Nouveau rendez-vous : ${name}, ${dateLabel} à ${time}`,
    name,
    email,
    telephone: phone,
    creneau: `${dateLabel} à ${time}`,
    forfait: pkg || undefined,
    details: details || undefined,
    gerer: `${process.env.FRONTEND_URL ?? ""}/admin/bookings`,
  });

  res.status(201).json({ ok: true, id: booking.id });
};

export const listBookings = async (req: Request, res: Response) => {
  res.json(await Booking.find().sort({ date: -1, time: -1 }));
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  if (!isValidObjectId(req.params.id)) throw new HttpError(400, "Invalid id");
  const status = req.body?.status;
  if (!Object.values(BookingStatus).includes(status)) throw new HttpError(400, "Invalid status");

  let booking;
  try {
    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, active: status !== BookingStatus.DECLINED },
      { new: true, runValidators: true },
    );
  } catch (err) {
    // Restoring a declined booking whose slot someone else has taken since
    if (isDuplicateKey(err)) throw new HttpError(409, "Ce créneau a été réservé par quelqu'un d'autre entre-temps");
    throw err;
  }
  if (!booking) throw new HttpError(404, "Booking not found");
  res.json(booking);
};

export const deleteBooking = async (req: Request, res: Response) => {
  if (!isValidObjectId(req.params.id)) throw new HttpError(400, "Invalid id");
  await Booking.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
