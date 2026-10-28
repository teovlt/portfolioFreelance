import fs from "node:fs";
import { Request, Response } from "express";
import { HttpError } from "../middleware/error.middleware.js";
import { PhotoSource, Review } from "../models/Review.js";
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
// Sent as multipart form data so the optional photo travels with the review;
// a photo that doesn't end up attached to a saved review is deleted.
export const submitReview = async (req: Request, res: Response) => {
  const photo = req.file;
  try {
    await saveReview(req, res);
  } catch (err) {
    if (photo) fs.unlink(photo.path, () => {});
    throw err;
  }
};

const isLinkedInUrl = (value: string) => isHttpUrl(value) && /(^|\.)linkedin\.com$/i.test(new URL(value).hostname);

const saveReview = async (req: Request, res: Response) => {
  const body = req.body ?? {};
  const photo = req.file;

  // Honeypot: real visitors never see this field, bots tend to fill it.
  // Pretend it worked so they don't retry.
  if (str(body.website2, 200)) {
    if (photo) fs.unlink(photo.path, () => {});
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
  const photoSource = Object.values(PhotoSource).includes(body.photoSource) ? (body.photoSource as PhotoSource) : PhotoSource.NONE;

  if (name.length < 2) throw new HttpError(400, "Name is required");
  if (comment.length < 10) throw new HttpError(400, "Comment is too short");
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new HttpError(400, "Rating must be between 1 and 5");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, "Invalid email");
  if (website && !isHttpUrl(website)) throw new HttpError(400, "Invalid website");
  if (photoSource === PhotoSource.UPLOAD && !photo) throw new HttpError(400, "Photo is missing");
  if (photoSource === PhotoSource.LINKEDIN && !isLinkedInUrl(website)) throw new HttpError(400, "A LinkedIn profile link is required");
  // A file sent alongside another choice is dropped rather than kept unused
  if (photo && photoSource !== PhotoSource.UPLOAD) fs.unlink(photo.path, () => {});

  const inLang = (value: string) => ({ fr: lang === "fr" ? value : "", en: lang === "en" ? value : "" });

  const last = await Review.findOne().sort({ order: -1 });
  const review = await Review.create({
    name,
    email: email || undefined,
    company: inLang(company),
    project: inLang(project),
    comment: inLang(comment),
    website: website || undefined,
    image: photoSource === PhotoSource.UPLOAD && photo ? `/api/uploads/${photo.filename}` : undefined,
    photoSource,
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
    photo: {
      [PhotoSource.UPLOAD]: "Photo jointe à l'avis",
      [PhotoSource.LINKEDIN]: "Autorise l'utilisation de sa photo LinkedIn — à ajouter à la main",
      [PhotoSource.NONE]: "Pas de photo",
    }[photoSource],
    statut: "En attente — n'apparaît sur le site qu'une fois publié",
    gerer: `${process.env.FRONTEND_URL ?? ""}/admin/reviews`,
  });

  res.status(201).json({ ok: true, id: review.id });
};
