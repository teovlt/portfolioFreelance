import { Schema, model } from "mongoose";
import { bilingualText, displayFields } from "./shared.js";

// Questions of the FAQ section. An answer can contain {{tarifs}} or {{delais}},
// which the site replaces with the prices or timelines of the visible packages.
const faqSchema = new Schema(
  {
    question: bilingualText,
    answer: bilingualText,
    ...displayFields,
  },
  { timestamps: true },
);

export const Faq = model("Faq", faqSchema);
