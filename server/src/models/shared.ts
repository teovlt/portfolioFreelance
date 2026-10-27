import { Schema } from "mongoose";

export const bilingualText = {
  fr: { type: String, required: true, trim: true },
  en: { type: String, required: true, trim: true },
};

// For fields that may only be filled in one language (e.g. a review a visitor
// wrote in French); the site falls back to the other language when one is empty.
export const optionalBilingualText = {
  fr: { type: String, default: "", trim: true },
  en: { type: String, default: "", trim: true },
};

export const bilingualList = {
  type: [new Schema(bilingualText, { _id: false })],
  default: [],
};

// Shared by every orderable collection the public site can show or hide
export const displayFields = {
  order: { type: Number, required: true, default: 0 },
  visible: { type: Boolean, default: true },
};
