import { SkillCard, SkillCardProps } from "@/components/SkillCard";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const techSlugs = ["typescript", "react", "flutter", "nodedotjs", "nextdotjs", "docker", "git", "tailwindcss"];
export const databaseSlugs = ["postgresql", "mysql", "mongodb", "sqlite", "mariadb", "neo4j", "firebase"];
export const softwareSlugs = [
  "vercel",
  "figma",
  "androidstudio",
  "vscodium",
  "intellijidea",
  "postman",
  "notion",
  "github",
  "gitlab",
  "redmine",
];
export const skillsBodies = {
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

function generateSkillData(slug: string, t: any): SkillCardProps {
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
    iconUrl: `https://cdn.simpleicons.org/${slug}/${slug}`,
    name,
    body: t(`skills.bodies.${slug}`),
  };
}

export const Skills = () => {
  const { t } = useTranslation();
  return (
    <section className="min-h-screen flex items-center justify-center p-4" id="skills-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center sm:mb-24 mb-12"
        >
          {t("skills.title1")} <span className="text-primary">{t("skills.title2")}</span>
        </motion.h2>
        <div className="hidden sm:block">
          <SkillsMarquee />
        </div>
        <div className="block sm:hidden">
          <div className="grid grid-cols-1 w-full sm:grid-cols-3 md:grid-cols-4 gap-4">
            {techSlugs.map((slug) => {
              const skill = generateSkillData(slug, t);
              return <SkillCard key={slug} {...skill} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
