import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, PenLine, Play, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAutoplay } from "@/hooks/useAutoplay";
import { openReviewDialog } from "@/utils/reviewDialog";
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

  const next = useCallback(() => setIndex((i) => (i + 1) % reviews.length), [reviews.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + reviews.length) % reviews.length), [reviews.length]);

  const { isPaused, liveMode, togglePause, holdProps } = useAutoplay(next, 4200, reviews.length > 1);

  const active = reviews[index];
  // Only the public listing resolves the project; a hidden one comes back null
  const linkedProject = typeof active?.linkedProject === "object" ? active.linkedProject : null;

  if (!active) return null;

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  // Room for the project link on every slide, so the card doesn't jump between reviews
  const anyLinked = reviews.some((r) => r.linkedProject && typeof r.linkedProject === "object");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      {...holdProps}
      role="region"
      aria-roledescription="carousel"
      aria-label={t("home.socialProof.count", { count: reviews.length })}
      className="relative mt-12 mx-2 sm:mx-5 xl:mx-0 xl:mt-0"
    >
      <div className="absolute -top-5 -left-5 w-full h-full rounded-3xl bg-accent/70 -z-10 rotate-2" />
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
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
            <div className="flex items-center gap-1" role="img" aria-label={t("a11y.averageRating", { rating: average.toFixed(1) })}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(average) ? "fill-accent text-accent" : "text-border"}`} />
              ))}
            </div>
            <span aria-hidden="true" className="text-xs text-muted-foreground mt-1">
              {t("home.socialProof.count", { count: reviews.length })}
            </span>
          </div>
        </div>

        <div aria-live={liveMode}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              role="group"
              aria-roledescription="slide"
              aria-label={t("a11y.reviewN", { n: index + 1, total: reviews.length })}
              className={anyLinked ? "min-h-[12rem]" : "min-h-[9.5rem]"}
            >
              <p className="font-serif italic text-xl sm:text-2xl leading-snug text-foreground line-clamp-4 mb-5">
                "{localize(active.comment)}"
              </p>
              <p className="text-sm text-muted-foreground">
                {active.website ? (
                  <a
                    href={active.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground underline-offset-4 hover:underline"
                  >
                    {active.name}
                  </a>
                ) : (
                  <span className="font-semibold text-foreground">{active.name}</span>
                )}{" "}
                {localize(active.company) && <> · {localize(active.company)}</>}
              </p>
              {linkedProject && (
                <Link
                  to={`/projects/${linkedProject.slug}`}
                  className="group/link mt-3 inline-flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 text-xs font-semibold transition-colors hover:border-foreground"
                >
                  <img src={linkedProject.image} alt="" className="h-6 w-9 rounded-full object-cover object-left-top" />
                  {t("reviews.viewProject")} · {linkedProject.title}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
          <div className="flex gap-1.5 flex-1 mr-4">
            {reviews.map((r, i) => (
              <button
                key={r._id}
                aria-label={t("a11y.reviewN", { n: i + 1, total: reviews.length })}
                aria-current={i === index ? "true" : undefined}
                onClick={() => setIndex(i)}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i === index ? "bg-accent" : "bg-border hover:bg-foreground/30"}`}
              />
            ))}
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            <button
              aria-label={t(isPaused ? "a11y.playSlides" : "a11y.pauseSlides")}
              onClick={togglePause}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            </button>
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
          onClick={openReviewDialog}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <PenLine className="h-3.5 w-3.5" />
          {t("reviews.leave")}
        </button>
      </div>
    </motion.div>
  );
}
