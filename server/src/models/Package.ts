import { Schema, model } from "mongoose";
import { bilingualList, bilingualText, displayFields, optionalBilingualText } from "./shared.js";

const packageSchema = new Schema(
  {
    title: bilingualText,
    description: bilingualText,
    price: { type: String, required: true, trim: true },
    duration: bilingualText,
    badge: optionalBilingualText,
    deliverables: bilingualList,
    popular: { type: Boolean, default: false },
    ...displayFields,
  },
  { timestamps: true },
);

export const Package = model("Package", packageSchema);
