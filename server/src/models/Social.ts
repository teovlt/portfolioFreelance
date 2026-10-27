import { Schema, model } from "mongoose";
import { displayFields } from "./shared.js";

export const socialIcons = ["github", "linkedin", "mail", "x", "instagram", "facebook", "youtube", "dribbble", "malt", "website"] as const;

const socialSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    icon: { type: String, enum: socialIcons, default: "website" },
    ...displayFields,
  },
  { timestamps: true },
);

export const Social = model("Social", socialSchema);
