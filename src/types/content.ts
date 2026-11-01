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

export const socialIcons = ["github", "linkedin", "mail", "x", "instagram", "facebook", "youtube", "dribbble", "malt", "whatsapp", "website"] as const;
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

export enum PhotoSource {
  NONE = "none",
  UPLOAD = "upload",
  LINKEDIN = "linkedin",
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
  photoSource?: PhotoSource;
  status: ReviewStatus;
  submitted: boolean;
  order: number;
};

export const pricingModes = ["oneTime", "subscription", "both"] as const;
export type PricingMode = (typeof pricingModes)[number];

export type Package = Document &
  Displayable & {
    title: LocalizedText;
    description: LocalizedText;
    pricing: PricingMode;
    price: string;
    monthlyPrice: string;
    commitment: LocalizedText;
    duration: LocalizedText;
    badge: LocalizedText;
    deliverables: LocalizedText[];
    popular: boolean;
  };

export type Faq = Document &
  Displayable & {
    question: LocalizedText;
    answer: LocalizedText;
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
  whatsapp: string;
  location: LocalizedText;
  locationUrl: string;
  siret: string;
  legalAddress: string;
  vatMention: string;
  hostName: string;
  hostAddress: string;
};

type CollectionStat = { count: number; updatedAt: string | null };

export type Stats = {
  projects: CollectionStat;
  reviews: CollectionStat & { pending: number };
  photos: CollectionStat;
  socials: CollectionStat;
  packages: CollectionStat;
  experiences: CollectionStat;
  faqs: CollectionStat;
  contact: CollectionStat;
  bookings: { pending: number };
  messages: { unread: number };
};

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  DECLINED = "declined",
}

export type Booking = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  details: string;
  package: string;
  date: string;
  time: string;
  status: BookingStatus;
  createdAt: string;
};

export type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export type Availability = {
  slots: string[];
  taken: Record<string, string[]>;
  now: { date: string; time: string };
  maxDate: string;
};
