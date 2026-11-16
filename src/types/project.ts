export enum ProjectStatus {
  STARTED = "started",
  ONGOING = "ongoing",
  DONE = "done",
}

// Drives which section of the public projects list a project appears in
export enum ProjectCategory {
  CLIENT = "client",
  DEMO = "demo",
  PERSONAL = "personal",
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
  gallery?: string[];
  stack: string[];
  status: ProjectStatus;
  category: ProjectCategory;
  order: number;
  visible: boolean;
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
