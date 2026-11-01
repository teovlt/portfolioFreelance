import { Schema, model } from "mongoose";
import { bilingualList, bilingualText, displayFields, optionalBilingualText } from "./shared.js";

const packageSchema = new Schema(
  {
    title: bilingualText,
    description: bilingualText,
    // A package can be paid once, by subscription, or offer the client both
    pricing: { type: String, enum: ["oneTime", "subscription", "both"], default: "oneTime" },
    price: { type: String, default: "", trim: true },
    monthlyPrice: { type: String, default: "", trim: true },
    commitment: optionalBilingualText,
    duration: bilingualText,
    badge: optionalBilingualText,
    deliverables: bilingualList,
    popular: { type: Boolean, default: false },
    ...displayFields,
  },
  { timestamps: true },
);

export const Package = model("Package", packageSchema);
