"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Accent } from "@/components/customs/accent-text";

// Project status enum
enum ProjectStatus {
  STARTED = "started",
  ONGOING = "ongoing",
  DONE = "done",
}

// Status badge colors
const statusColors: Record<ProjectStatus, string> = {
  [ProjectStatus.STARTED]: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
  [ProjectStatus.ONGOING]: "bg-accent/20 text-accent-foreground border-accent/40",
  [ProjectStatus.DONE]: "bg-secondary text-secondary-foreground border-transparent",
};

const projects = [
  {
    id: "project1",
    title: "Achanfut",
    image: "/images/projects/ahcanfut.png",
    tags: ["NextJS", "Prisma", "MongoDB", "Stripe", "TailwindCSS"],
    status: ProjectStatus.DONE,
    caseStudy: "achanfut",
  },
  {
    id: "project2",
    title: "MERN Boilerplate",
    image: "/images/projects/mern-boilerplate.png",
    tags: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    status: ProjectStatus.DONE,
    caseStudy: "mern-boilerplate",
  },
  {
    id: "project4",
    title: "Paperlive",
    image: "/images/projects/paperlive.png",
    tags: ["React", "Node.js", "Express", "MongoDB", "Styled Components"],
    status: ProjectStatus.DONE,
    caseStudy: "paperlive",
  },
  {
    id: "project5",
    title: "Insight-hub",
    image: "/images/projects/insight-hub.png",
    tags: ["Firebase", "MongoDB", "Express", "React", "Node.js"],
    status: ProjectStatus.ONGOING,
    caseStudy: "insight-hub",
  },
  {
    id: "project6",
    title: "Lets-go lego",
    image: "/images/projects/lets-go-lego.png",
    tags: ["MongoDB", "Express", "React", "Node.js", "Styled Components"],
    status: ProjectStatus.DONE,
    caseStudy: "lets-go-lego",
  },
  {
    id: "project7",
    title: "Ciel avenue",
    image: "/images/projects/cielavenue.png",
    tags: ["React", "AI chatbot", "Roles management", "TailwindCSS"],
    status: ProjectStatus.ONGOING,
    caseStudy: "ciel-avenue",
  },
  {
    id: "project8",
    title: "Couverto",
    image: "/images/projects/couverto.png",
    tags: ["Socket.io", "TailwindCSS", "MongoDB", "Express", "React", "Node.js"],
    status: ProjectStatus.ONGOING,
    caseStudy: "couverto",
  },
  {
    id: "project9",
    title: "Job trackr",
    image: "/images/projects/job-tracker.png",
    tags: ["React", "TailwindCSS", "Framer Motion", "Node.js", "MongoDB", "Express"],
    status: ProjectStatus.DONE,
    caseStudy: "job-tracker",
  },
  {
    id: "project3",
    title: "Portfolio",
    image: "/images/projects/portfolio.png",
    tags: ["React", "TailwindCSS", "Framer Motion"],
    status: ProjectStatus.DONE,
    caseStudy: "portfolio",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export const Projects = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4" id="projects-section">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <p className="eyebrow mb-4">{t("projects.eyebrow")}</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl">
              {t("projects.title")} <Accent className="font-serif italic font-medium">{t("projects.highlight")}</Accent>
            </h2>
            <p className="text-muted-foreground max-w-xs">{t("projects.description")}</p>
          </div>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-10">
          {projects.map((project, index) => {
            const row = (
              <>
                <span className="font-serif text-xl text-border w-9 flex-shrink-0 select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-[200px]">
                  <h3 className="text-xl sm:text-2xl font-display font-bold transition-colors">
                    {t(`projects.items.${project.id}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1.5 line-clamp-1">
                    {project.tags.join(", ")}
                    <span className="text-foreground font-semibold"> — {t("projects.caseStudy")} →</span>
                  </p>
                </div>
                <Badge className={`${statusColors[project.status]} text-xs font-medium flex-shrink-0 hidden sm:inline-flex`}>
                  {t(`projects.status.${project.status}`)}
                </Badge>
                <div className="w-20 h-14 rounded-lg overflow-hidden border border-border flex-shrink-0 hidden md:block shadow-md">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <span className="w-9 h-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </>
            );

            const rowClass =
              "group flex items-center gap-5 py-6 border-t border-border last:border-b hover:bg-muted/40 transition-colors px-2 -mx-2 rounded-lg";

            return (
              <motion.div key={project.id} variants={item}>
                <Link to={`/projects/${project.caseStudy}`} className={rowClass}>
                  {row}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
