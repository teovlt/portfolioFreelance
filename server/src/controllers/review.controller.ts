import { Request, Response } from "express";
import { HttpError } from "../middleware/error.middleware.js";
import { Review } from "../models/Review.js";
import { notifyByFormspree } from "../utils/notify.js";

const str = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

// Public endpoint behind the "leave a review" button. The review is stored as
// pending and only shows on the site once I publish it from the dashboard.
export const submitReview = async (req: Request, res: Response) => {
  const body = req.body ?? {};

  // Honeypot: real visitors never see this field, bots tend to fill it.
  // Pretend it worked so they don't retry.
  if (str(body.website2, 200)) {
    return res.status(201).json({ ok: true });
  }

  const name = str(body.name, 80);
  const email = str(body.email, 200);
  const company = str(body.company, 120);
  const project = str(body.project, 120);
  const comment = str(body.comment, 2000);
  const website = str(body.website, 300);
  const rating = Number(body.rating);
  const lang = body.lang === "en" ? "en" : "fr";

  if (name.length < 2) throw new HttpError(400, "Name is required");
  if (comment.length < 10) throw new HttpError(400, "Comment is too short");
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new HttpError(400, "Rating must be between 1 and 5");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, "Invalid email");
  if (website && !isHttpUrl(website)) throw new HttpError(400, "Invalid website");

  const inLang = (value: string) => ({ fr: lang === "fr" ? value : "", en: lang === "en" ? value : "" });

  const last = await Review.findOne().sort({ order: -1 });
  const review = await Review.create({
    name,
    email: email || undefined,
    company: inLang(company),
    project: inLang(project),
    comment: inLang(comment),
    website: website || undefined,
    rating,
    submitted: true,
    order: last ? last.order + 1 : 0,
  });

  // Not awaited: the visitor shouldn't wait on Formspree.
  // `email` becomes the reply-to address; `_subject` the email's subject.
  void notifyByFormspree({
    _subject: `Nouvel avis de ${name} (${rating}/5)`,
    name,
    email: email || undefined,
    note: `${"★".repeat(rating)}${"☆".repeat(5 - rating)} (${rating}/5)`,
    avis: comment,
    entreprise: company || undefined,
    projet: project || undefined,
    site: website || undefined,
    statut: "En attente — n'apparaît sur le site qu'une fois publié",
    gerer: `${process.env.FRONTEND_URL ?? ""}/admin/reviews`,
  });

  res.status(201).json({ ok: true, id: review.id });
};
