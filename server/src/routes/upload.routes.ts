import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import express, { RequestHandler, Router } from "express";
import multer from "multer";
import sharp from "sharp";
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

export const imageUpload = multer({
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

const MAX_SIDE = 2000;
// Otherwise sharp keeps the source file open, and we write over it
sharp.cache(false);

// Phone photos and full-page screenshots arrive at several MB; scale them
// down and re-encode in place so the site never serves them at full size.
// GIFs are left alone (re-encoding would drop the animation). A file sharp
// can't read is kept as is rather than failing the upload.
export const optimizeUpload: RequestHandler = async (req, res, next) => {
  const file = req.file;
  if (!file || file.mimetype === "image/gif") return next();
  try {
    let image = sharp(file.path).rotate().resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true });
    if (file.mimetype === "image/jpeg") image = image.jpeg({ quality: 82, mozjpeg: true });
    else if (file.mimetype === "image/png") image = image.png({ compressionLevel: 9, palette: true, quality: 90 });
    else if (file.mimetype === "image/webp") image = image.webp({ quality: 82 });
    else if (file.mimetype === "image/avif") image = image.avif({ quality: 60 });
    const buffer = await image.toBuffer();
    if (buffer.length < file.size) await fs.promises.writeFile(file.path, buffer);
  } catch (err) {
    console.warn(`Could not optimize ${file.filename}`, err);
  }
  next();
};

export const uploadRouter = Router();

uploadRouter.post("/", requireAuth, imageUpload.single("file"), optimizeUpload, (req, res) => {
  if (!req.file) throw new HttpError(400, "No file received");
  res.status(201).json({ url: `/api/uploads/${req.file.filename}` });
});

// Filenames are random and never reused, so they can be cached forever
uploadRouter.use(express.static(uploadDir, { immutable: true, maxAge: "1y", index: false }));
