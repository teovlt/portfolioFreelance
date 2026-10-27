import type { LocalizedText } from "./project";

type Document = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type Displayable = {
  order: number;
  visible: boolean;
};

export const socialIcons = ["github", "linkedin", "mail", "x", "instagram", "facebook", "youtube", "dribbble", "malt", "website"] as const;
export type SocialIcon = (typeof socialIcons)[number];

export type Social = Document &
  Displayable & {
    label: string;
    url: string;
    icon: SocialIcon;
  };

export type Photo = Document &
  Displayable & {
    src: string;
    alt: LocalizedText;
    position: string;
  };

export enum ReviewStatus {
  PENDING = "pending",
  PUBLISHED = "published",
  HIDDEN = "hidden",
}

export type Review = Document & {
  name: string;
  email?: string;
  company: LocalizedText;
  comment: LocalizedText;
  project: LocalizedText;
  rating: number;
  image?: string;
  website?: string;
  status: ReviewStatus;
  submitted: boolean;
  order: number;
};

export type Package = Document &
  Displayable & {
    title: LocalizedText;
    description: LocalizedText;
    price: string;
    duration: LocalizedText;
    badge: LocalizedText;
    deliverables: LocalizedText[];
    popular: boolean;
  };

export const experienceTypes = ["formation", "alternance", "stage", "emploi", "freelance"] as const;
export type ExperienceType = (typeof experienceTypes)[number];

export type Experience = Document &
  Displayable & {
    type: ExperienceType;
    org: LocalizedText;
    logo?: string;
    title: LocalizedText;
    location: LocalizedText;
    date: LocalizedText;
    description: LocalizedText;
    highlights: LocalizedText[];
  };

export type ContactInfo = Document & {
  email: string;
  phone: string;
  location: LocalizedText;
  locationUrl: string;
};

type CollectionStat = { count: number; updatedAt: string | null };

export type Stats = {
  projects: CollectionStat;
  reviews: CollectionStat & { pending: number };
  photos: CollectionStat;
  socials: CollectionStat;
  packages: CollectionStat;
  experiences: CollectionStat;
  contact: CollectionStat;
};
