export enum ProjectStatus {
  STARTED = "started",
  ONGOING = "ongoing",
  DONE = "done",
}

export type LocalizedText = {
  fr: string;
  en: string;
};

export type Project = {
  _id: string;
  slug: string;
  title: string;
  image: string;
  stack: string[];
  status: ProjectStatus;
  order: number;
  liveLink?: string;
  githubLink?: string;
  tagline: LocalizedText;
  role: LocalizedText;
  timeline: LocalizedText;
  overview: LocalizedText;
  challenge: LocalizedText;
  approach: LocalizedText;
  features: LocalizedText[];
  createdAt: string;
  updatedAt: string;
};

export type ProjectInput = Omit<Project, "_id" | "createdAt" | "updatedAt">;
