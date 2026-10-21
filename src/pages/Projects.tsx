"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Accent } from "@/components/customs/accent-text";
import { useProjects } from "@/hooks/useProjects";
import { ProjectStatus } from "@/types/project";

// Status badge colors
const statusColors: Record<ProjectStatus, string> = {
  [ProjectStatus.STARTED]: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  [ProjectStatus.ONGOING]: "bg-primary/15 text-primary border-primary/30",
  [ProjectStatus.DONE]: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
};

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
  const { projects } = useProjects();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-20" id="projects-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
          {projects.map((project, index) => (
            <motion.div key={project._id} variants={item}>
              <Link
                to={`/projects/${project.slug}`}
                className="group flex items-center gap-5 py-6 border-t border-border last:border-b hover:bg-muted/40 transition-colors px-2 -mx-2 rounded-lg"
              >
                <span className="font-serif text-xl text-border w-9 flex-shrink-0 select-none">{String(index + 1).padStart(2, "0")}</span>
                <div className="flex-1 min-w-[200px]">
                  <h3 className="text-xl sm:text-2xl font-display font-bold transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1.5 line-clamp-1">{project.stack.join(", ")}</p>
                </div>
                <Badge className={`${statusColors[project.status]} text-xs font-medium flex-shrink-0 hidden sm:inline-flex`}>
                  {t(`projects.status.${project.status}`)}
                </Badge>

                <div
                  className="relative w-20 h-14 flex-shrink-0 hidden sm:block"
                  onMouseEnter={() => setHoveredId(project._id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="w-20 h-14 rounded-lg overflow-hidden border border-border shadow-md">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <AnimatePresence>
                    {hoveredId === project._id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute bottom-full right-0 mb-3 w-64 h-44 rounded-xl overflow-hidden border border-border shadow-2xl z-30 pointer-events-none origin-bottom-right"
                      >
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <span className="w-9 h-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
