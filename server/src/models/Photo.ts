import { Schema, model } from "mongoose";
import { bilingualText, displayFields } from "./shared.js";

const photoSchema = new Schema(
  {
    src: { type: String, required: true },
    alt: bilingualText,
    // CSS object-position, e.g. "50% 30%" — the focal point kept in frame when cropped
    position: { type: String, default: "50% 50%" },
    ...displayFields,
  },
  { timestamps: true },
);

export const Photo = model("Photo", photoSchema);
