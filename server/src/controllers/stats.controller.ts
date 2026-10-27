import { Request, Response } from "express";
import { Model } from "mongoose";
import { Experience } from "../models/Experience.js";
import { Package } from "../models/Package.js";
import { Photo } from "../models/Photo.js";
import { Project } from "../models/Project.js";
import { Review, ReviewStatus } from "../models/Review.js";
import { Social } from "../models/Social.js";
import { ContactInfo } from "../models/ContactInfo.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const summarize = async (model: Model<any>) => {
  const [count, latest] = await Promise.all([model.countDocuments(), model.findOne().sort({ updatedAt: -1 }).select("updatedAt")]);
  return { count, updatedAt: latest?.updatedAt ?? null };
};

// Counts and last-modified dates for the dashboard cards
export const getStats = async (req: Request, res: Response) => {
  const [projects, reviews, photos, socials, packages, experiences, contact, pendingReviews] = await Promise.all([
    summarize(Project),
    summarize(Review),
    summarize(Photo),
    summarize(Social),
    summarize(Package),
    summarize(Experience),
    summarize(ContactInfo),
    Review.countDocuments({ status: ReviewStatus.PENDING }),
  ]);

  res.json({ projects, reviews: { ...reviews, pending: pendingReviews }, photos, socials, packages, experiences, contact });
};
