import { z } from "zod";
import type { TFunction } from "i18next";

// Built from `t` so the error messages follow the site's language.
// `website2` is the honeypot: hidden from visitors, filled in by bots, and
// checked by the server.
export const makeContactSchema = (t: TFunction) =>
  z.object({
    name: z.string().trim().min(2, { message: t("validation.name") }),
    email: z.string().trim().email({ message: t("validation.email") }),
    subject: z.string().trim().min(2, { message: t("validation.subject") }),
    message: z.string().trim().min(10, { message: t("validation.message") }),
    website2: z.string().optional(),
  });

export type ContactValues = z.infer<ReturnType<typeof makeContactSchema>>;

export const makeBookingSchema = (t: TFunction) =>
  z.object({
    name: z.string().trim().min(2, { message: t("validation.name") }),
    email: z.string().trim().email({ message: t("validation.email") }),
    phone: z.string().regex(/\d(?:\D*\d){5,}/, { message: t("validation.phone") }),
    details: z.string().optional(),
    website2: z.string().optional(),
  });

export type BookingValues = z.infer<ReturnType<typeof makeBookingSchema>>;
