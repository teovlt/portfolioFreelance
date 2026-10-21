import { Schema, model } from "mongoose";

export enum ProjectStatus {
  STARTED = "started",
  ONGOING = "ongoing",
  DONE = "done",
}

const bilingualText = {
  fr: { type: String, required: true },
  en: { type: String, required: true },
};

const projectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    stack: { type: [String], default: [] },
    status: { type: String, enum: Object.values(ProjectStatus), default: ProjectStatus.STARTED },
    order: { type: Number, required: true, default: 0 },
    liveLink: { type: String },
    githubLink: { type: String },
    tagline: bilingualText,
    role: bilingualText,
    timeline: bilingualText,
    overview: bilingualText,
    challenge: bilingualText,
    approach: bilingualText,
    features: {
      type: [
        {
          fr: { type: String, required: true },
          en: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export const Project = model("Project", projectSchema);
