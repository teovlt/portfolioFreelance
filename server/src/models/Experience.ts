import { Schema, model } from "mongoose";
import { bilingualList, bilingualText, displayFields } from "./shared.js";

export const experienceTypes = ["formation", "alternance", "stage", "emploi", "freelance"] as const;

const experienceSchema = new Schema(
  {
    type: { type: String, enum: experienceTypes, required: true },
    org: bilingualText,
    logo: { type: String },
    title: bilingualText,
    location: bilingualText,
    date: bilingualText,
    description: bilingualText,
    highlights: bilingualList,
    ...displayFields,
  },
  { timestamps: true },
);

export const Experience = model("Experience", experienceSchema);
