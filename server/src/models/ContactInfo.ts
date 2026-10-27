import { Schema, model } from "mongoose";
import { bilingualText } from "./shared.js";

// Singleton: the site only ever has one document in this collection
const contactInfoSchema = new Schema(
  {
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true, default: "" },
    location: bilingualText,
    locationUrl: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

export const ContactInfo = model("ContactInfo", contactInfoSchema);
