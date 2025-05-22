import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";

const techSlugs = ["typescript", "react", "flutter", "firebase", "nodedotjs", "nextdotjs", "docker", "git", "tailwindcss"];

const databaseSlugs = ["postgresql", "mysql", "mongodb", "sqlite", "mariadb", "neo4j", "firebase"];

const softwareSlugs = ["vercel", "figma", "androidstudio", "vscodium", "intellijidea", "postman", "notion", "github", "gitlab", "redmine"];

// Génère des objets "review" à partir d’un tableau de slugs
const generateReviews = (slugs) =>
  slugs.map((slug) => ({
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    username: `@${slug}`,
    body: "This language/tool is amazing. I love working with it!",
    img: `https://cdn.simpleicons.org/${slug}/${slug}`,
  }));

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
  const techReviews = generateReviews(techSlugs);
  const osReviews = generateReviews(databaseSlugs);
  const softwareReviews = generateReviews(softwareSlugs);

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <h2 className="text-3xl font-semibold text-center text-gray-800 tracking-tight mb-4">Languages & frameworks</h2>
      <Marquee pauseOnHover className="[--duration:150s]">
        {techReviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      <h2 className="text-3xl font-semibold text-center text-gray-800 tracking-tight mb-4">Databases</h2>
      <Marquee reverse pauseOnHover className="[--duration:150s]">
        {osReviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      <h2 className="text-3xl font-semibold text-gray-800 tracking-tight mb-4">Logiciels & IDE</h2>
      <Marquee reverse pauseOnHover className="[--duration:150s]">
        {softwareReviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
    </div>
  );
}
