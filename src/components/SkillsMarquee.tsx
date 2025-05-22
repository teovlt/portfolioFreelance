import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";

const techSlugs = ["typescript", "react", "flutter", "nodedotjs", "nextdotjs", "docker", "git", "tailwindcss"];
const databaseSlugs = ["postgresql", "mysql", "mongodb", "sqlite", "mariadb", "neo4j", "firebase"];
const softwareSlugs = ["vercel", "figma", "androidstudio", "vscodium", "intellijidea", "postman", "notion", "github", "gitlab", "redmine"];

const bodies = {
  typescript: "The type system keeps my brain sane.",
  react: "Love the component-based mindset.",
  flutter: "Write once, run anywhere. It's magic.",
  nodedotjs: "JavaScript everywhere. Node is powerful.",
  nextdotjs: "Fullstack React never felt so good.",
  docker: "Because it works on my machine™.",
  git: "Version control or time travel?",
  tailwindcss: "Utility-first and fast. Never going back.",

  postgresql: "Robust, reliable, and relational. My go-to DB.",
  firebase: "Backend without pain. Sometimes.",
  mysql: "Classic. Been around forever.",
  mongodb: "JSON all the way. Feels natural.",
  sqlite: "Lightweight and handy for small stuff.",
  mariadb: "A drop-in replacement with some cool extras.",
  neo4j: "I don't even know what this is.",

  vercel: "Deploy in seconds. Just magic.",
  figma: "Designing never felt this collaborative.",
  androidstudio: "Heavy, but it gets the job done.",
  vscodium: "Open source VS Code? Yes please.",
  intellijidea: "Ultimate power for Java devs.",
  postman: "API testing made (too) easy.",
  notion: "Docs, tasks, life planner — all in one.",
  github: "Home of all my bugs.",
  gitlab: "GitHub but more DevOps-y.",
  redmine: "Still surviving in some enterprise corners.",
};

// Génère des reviews avec des messages personnalisés
const generateReviews = (slugs) =>
  slugs.map((slug) => ({
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    username: `@${slug}`,
    body: bodies[slug] || "I'm experimenting with it.",
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
      {/* <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Logiciels & IDE
      </h2> */}

      <Marquee pauseOnHover className="[--duration:150s]">
        {techReviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      {/* <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8 pb-2 border-b-2 border-gray-300 w-fit mx-auto">Databases</h2> */}
      <Marquee reverse pauseOnHover className="[--duration:150s]">
        {osReviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      {/* 
      <h2 className="text-xl font-semibold text-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full w-fit mx-auto shadow-sm mb-6">
        Logiciels & IDE
      </h2> */}
      <Marquee pauseOnHover className="[--duration:150s]">
        {softwareReviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
    </div>
  );
}
