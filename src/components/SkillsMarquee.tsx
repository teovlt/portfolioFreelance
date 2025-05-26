import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";
import { databaseSlugs, skillsBodies, softwareSlugs, techSlugs } from "@/pages/Skills";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt={name} src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function SkillsMarquee() {
  const { t } = useTranslation();
  const techReviews = generateReviews(techSlugs, t);
  const osReviews = generateReviews(databaseSlugs, t);
  const softwareReviews = generateReviews(softwareSlugs, t);

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:100s]">
        {techReviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      <Marquee reverse pauseOnHover className="[--duration:100s]">
        {osReviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:100s]">
        {softwareReviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
    </div>
  );
}

function generateReviews(slugs: string[], t: any) {
  return slugs.map((slug) => {
    const name = slug
      .split("dot")
      .map((part) =>
        part
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      )
      .join(".");

    return {
      name,
      username: `@${slug}`,
      body: t(`skills.bodies.${slug}`),
      img: `https://cdn.simpleicons.org/${slug}/${slug}`,
    };
  });
}
