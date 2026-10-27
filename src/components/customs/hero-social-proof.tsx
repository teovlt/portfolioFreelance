"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, PenLine, Star } from "lucide-react";
import { ReviewDialog } from "@/components/customs/review-dialog";
import { useLocalize, usePublicContent } from "@/hooks/usePublicContent";
import type { Review } from "@/types/content";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function HeroSocialProof() {
  const { t } = useTranslation();
  const localize = useLocalize();
  const { data: reviews } = usePublicContent<Review[]>("/reviews", []);
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % reviews.length), [reviews.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + reviews.length) % reviews.length), [reviews.length]);

  useEffect(() => {
    if (isHovered || reviews.length < 2) return;
    const interval = setInterval(next, 4200);
    return () => clearInterval(interval);
  }, [isHovered, next]);

  const active = reviews[index];

  if (!active) return null;

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden xl:block relative mt-12 xl:mt-0"
    >
      <div className="absolute -top-5 -left-5 w-full h-full rounded-3xl bg-accent/70 -z-10 rotate-2" />
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex -space-x-3">
            {reviews.map((r) => (
              <Avatar key={r._id} className="w-11 h-11 rounded-full ring-4 ring-card">
                {r.image && <AvatarImage src={r.image} alt={r.name} className="object-cover" />}
                <AvatarFallback className="text-xs">{initials(r.name)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(average) ? "fill-accent text-accent" : "text-border"}`} />
              ))}
            </div>
            <span className="text-xs text-muted-foreground mt-1">{t("home.socialProof.count", { count: reviews.length })}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="min-h-[9.5rem]"
          >
            <p className="font-serif italic text-2xl leading-snug text-foreground line-clamp-4 mb-5">"{localize(active.comment)}"</p>
            <p className="text-sm text-muted-foreground">
              {active.website ? (
                <a
                  href={active.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground hover:text-accent transition-colors"
                >
                  {active.name}
                </a>
              ) : (
                <span className="font-semibold text-foreground">{active.name}</span>
              )}{" "}
              {localize(active.company) && <> · {localize(active.company)}</>}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
          <div className="flex gap-1.5 flex-1 mr-4">
            {reviews.map((r, i) => (
              <button
                key={r._id}
                aria-label={`${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i === index ? "bg-accent" : "bg-border hover:bg-foreground/30"}`}
              />
            ))}
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            <button
              aria-label={t("home.socialProof.prev")}
              onClick={prev}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              aria-label={t("home.socialProof.next")}
              onClick={next}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsReviewOpen(true)}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <PenLine className="h-3.5 w-3.5" />
          {t("reviews.leave")}
        </button>
      </div>
      <ReviewDialog open={isReviewOpen} onOpenChange={setIsReviewOpen} />
    </motion.div>
  );
}
