import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import express, { Router } from "express";
import multer from "multer";
import { requireAuth } from "../middleware/auth.middleware.js";
import { HttpError } from "../middleware/error.middleware.js";

export const uploadDir = path.resolve(process.env.UPLOAD_DIR ?? "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

// SVG is left out on purpose: it can carry scripts and is served from our origin
const extensions: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => cb(null, `${crypto.randomBytes(12).toString("hex")}${extensions[file.mimetype]}`),
  }),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    if (extensions[file.mimetype]) cb(null, true);
    else cb(new HttpError(400, "Only JPG, PNG, WebP, GIF or AVIF images are allowed"));
  },
});

export const uploadRouter = Router();

uploadRouter.post("/", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) throw new HttpError(400, "No file received");
  res.status(201).json({ url: `/api/uploads/${req.file.filename}` });
});

// Filenames are random and never reused, so they can be cached forever
uploadRouter.use(express.static(uploadDir, { immutable: true, maxAge: "1y", index: false }));
