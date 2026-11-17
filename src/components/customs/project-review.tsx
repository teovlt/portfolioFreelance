import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

// The client's review on their project's case study, as a small card. Set on
// the screenshot (`floating`), it shows two lines of the quote and unfolds on
// hover or keyboard focus; below the gallery on phones it's simply shown whole.
export const ProjectReview = ({ review, floating = false, className }: { review: Review; floating?: boolean; className?: string }) => {
  const { t } = useTranslation();
  const localize = useLocalize();
  const company = localize(review.company);

  return (
    <figure
      tabIndex={floating ? 0 : undefined}
      aria-label={t("reviews.projectTitle")}
      className={cn(
        "group/review rounded-2xl border border-border bg-background/90 p-3.5 shadow-xl backdrop-blur-md outline-none transition-[width,box-shadow] duration-300 ease-out",
        floating && "w-72 cursor-default hover:w-[25rem] focus-visible:w-[25rem] focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <figcaption className="flex items-center gap-3">
        <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-accent ring-offset-2 ring-offset-background">
          {review.image && <AvatarImage src={review.image} alt={review.name} className="object-cover" />}
          <AvatarFallback className="text-xs">{initials(review.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {review.website ? (
              <a href={review.website} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                {review.name}
              </a>
            ) : (
              review.name
            )}
          </p>
          {company && <p className="truncate text-xs text-muted-foreground">{company}</p>}
        </div>
        <span
          role="img"
          aria-label={t("a11y.rating", { rating: review.rating })}
          className="flex flex-shrink-0 items-center gap-1 rounded-full bg-foreground px-2 py-1 text-xs font-bold text-background"
        >
          <Star className="h-3 w-3 fill-accent text-accent" />
          {review.rating}
          <span className="font-normal opacity-60">/5</span>
        </span>
      </figcaption>
      {/* Clamped by height rather than line-clamp so unfolding can animate */}
      <blockquote
        className={cn(
          "mt-3 font-serif text-sm italic leading-snug text-foreground",
          floating &&
            "max-h-[2.6em] overflow-hidden transition-[max-height] duration-500 ease-out [mask-image:linear-gradient(to_bottom,black_45%,transparent)] group-hover/review:max-h-64 group-hover/review:[mask-image:none] group-focus-visible/review:max-h-64 group-focus-visible/review:[mask-image:none]",
        )}
      >
        “{localize(review.comment)}”
      </blockquote>
    </figure>
  );
};
