import { Schema, model } from "mongoose";
import { optionalBilingualText } from "./shared.js";

export enum ReviewStatus {
  PENDING = "pending",
  PUBLISHED = "published",
  HIDDEN = "hidden",
}

const reviewSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    // Only kept so I can reply to the author; never sent to the public site
    email: { type: String, trim: true, lowercase: true },
    company: optionalBilingualText,
    comment: optionalBilingualText,
    project: optionalBilingualText,
    rating: { type: Number, min: 1, max: 5, default: 5 },
    image: { type: String },
    website: { type: String, trim: true },
    status: { type: String, enum: Object.values(ReviewStatus), default: ReviewStatus.PENDING },
    // true when it came from the public "leave a review" form
    submitted: { type: Boolean, default: false },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

reviewSchema.pre("validate", function (next) {
  if (!this.comment?.fr && !this.comment?.en) {
    this.invalidate("comment", "A comment is required in at least one language");
  }
  next();
});

export const Review = model("Review", reviewSchema);
