import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalize } from "@/hooks/usePublicContent";
import { cn } from "@/lib/utils";
import type { Review } from "@/types/content";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// The client's review on their project's case study: their photo large, the
// rating pinned on it and the quote given room to breathe
export const ProjectReview = ({ review, className }: { review: Review; className?: string }) => {
  const { t } = useTranslation();
  const localize = useLocalize();
  const company = localize(review.company);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative grid gap-10 overflow-hidden rounded-3xl border border-border bg-card p-6 pb-8 sm:p-10 md:grid-cols-[minmax(0,15rem)_1fr] md:items-center md:gap-14",
        className,
      )}
    >
      <Quote aria-hidden className="pointer-events-none absolute -right-4 -top-6 h-40 w-40 rotate-180 text-accent/15" />

      <div className="relative mx-auto w-44 sm:w-52 md:w-full">
        <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-3 rounded-[2rem] bg-accent/70" />
        {review.image ? (
          <img
            src={review.image}
            alt={review.name}
            loading="lazy"
            decoding="async"
            className="relative aspect-square w-full rounded-[2rem] object-cover shadow-xl"
          />
        ) : (
          <div className="relative flex aspect-square w-full items-center justify-center rounded-[2rem] bg-muted font-display text-6xl font-bold text-muted-foreground shadow-xl">
            {initials(review.name)}
          </div>
        )}
        <div
          role="img"
          aria-label={t("a11y.rating", { rating: review.rating })}
          className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-background shadow-lg"
        >
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="font-display text-lg font-bold leading-none">{review.rating}</span>
          <span className="text-sm leading-none opacity-60">/ 5</span>
        </div>
      </div>

      <div className="relative">
        <p className="eyebrow mb-4">{t("reviews.projectTitle")}</p>
        <div className="mb-5 flex gap-1" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={cn("h-5 w-5", i < review.rating ? "fill-accent text-accent" : "text-border")} />
          ))}
        </div>
        <blockquote className="font-serif text-2xl italic leading-snug text-foreground sm:text-3xl">
          “{localize(review.comment)}”
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3 text-sm">
          <span className="h-px w-8 bg-foreground/40" />
          <span>
            {review.website ? (
              <a
                href={review.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                {review.name}
              </a>
            ) : (
              <span className="font-semibold text-foreground">{review.name}</span>
            )}
            {company && <span className="text-muted-foreground"> · {company}</span>}
          </span>
        </figcaption>
      </div>
    </motion.figure>
  );
};
