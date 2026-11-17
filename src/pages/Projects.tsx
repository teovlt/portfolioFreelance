import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProjects } from "@/hooks/useProjects";
import { cn } from "@/lib/utils";
import { ProjectCategory, ProjectStatus, type Project } from "@/types/project";
import { projectCategory, projectCategoryOrder, sortProjects } from "@/utils/projects";

type Filter = "all" | ProjectCategory;

// Client work and demos get a big tile, personal products a small one
const isFeatured = (project: Project) => projectCategory(project) !== ProjectCategory.PERSONAL;

// Big tiles take 2×2 cells, small ones 1×1. Laid out big, small, small, big…
// the dense grid packs them into a checkerboard instead of all the big tiles
// first and a block of small ones at the end.
const interleave = (projects: Project[]) => {
  const big = projects.filter(isFeatured);
  const small = projects.filter((project) => !isFeatured(project));
  const out: Project[] = [];
  while (big.length || small.length) {
    if (big.length) out.push(big.shift()!);
    out.push(...small.splice(0, 2));
  }
  return out;
};

// "Demo" and "in progress" markers set on the screenshot; "done" is the
// default state of a portfolio piece, so it isn't flagged
const Pills = ({ project }: { project: Project }) => {
  const { t } = useTranslation();
  const isDemo = projectCategory(project) === ProjectCategory.DEMO;
  const showStatus = project.status !== ProjectStatus.DONE;
  if (!isDemo && !showStatus) return null;
  const pill =
    "inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur";
  return (
    <div className="absolute left-3 top-3 flex flex-wrap gap-2 sm:left-4 sm:top-4">
      {isDemo && <span className={pill}>{t("projects.demoBadge")}</span>}
      {showStatus && (
        <span className={pill}>
          <span className="size-1.5 animate-pulse rounded-full bg-current" />
          {t(`projects.status.${project.status}`)}
        </span>
      )}
    </div>
  );
};

const Tile = ({ project }: { project: Project }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "fr";
  const big = isFeatured(project);
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group relative block size-full overflow-hidden rounded-2xl border border-border bg-muted sm:rounded-3xl"
    >
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
      <Pills project={project} />
      <div className={cn("absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 text-white", big ? "p-5 sm:p-7" : "p-3 sm:p-5")}>
        <div className="min-w-0">
          <h3 className={cn("font-display font-bold leading-tight", big ? "text-2xl sm:text-3xl" : "text-sm sm:text-lg")}>
            {project.title}
          </h3>
          {big ? (
            <p className="mt-1.5 line-clamp-2 max-w-md text-sm text-white/75">{project.tagline[lang]}</p>
          ) : (
            // Small tiles only reveal their tagline on hover, on large screens
            <p className="mt-1 hidden max-h-0 overflow-hidden text-sm text-white/75 opacity-0 transition-all duration-300 group-hover:max-h-12 group-hover:opacity-100 lg:line-clamp-2">
              {project.tagline[lang]}
            </p>
          )}
        </div>
        <span
          className={cn(
            "flex flex-shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-white group-hover:text-black",
            big ? "size-11" : "size-8 max-sm:hidden",
          )}
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
};

export const Projects = () => {
  const { t } = useTranslation();
  const { projects } = useProjects();
  const [filter, setFilter] = useState<Filter>("all");

  const sorted = sortProjects(projects);
  const filters = [
    { value: "all" as Filter, label: t("projects.filterAll"), count: sorted.length },
    ...projectCategoryOrder.map((category) => ({
      value: category as Filter,
      label: t(`projects.categories.${category}.title`),
      count: sorted.filter((project) => projectCategory(project) === category).length,
    })),
  ].filter((entry) => entry.count > 0);
  const visible = interleave(filter === "all" ? sorted : sorted.filter((project) => projectCategory(project) === filter));

  return (
    <section className="py-20" id="projects-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="eyebrow mb-4">{t("projects.eyebrow")}</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl">
              {t("projects.title")} <span className="font-serif italic font-medium">{t("projects.highlight")}</span>
            </h2>
            <p className="text-muted-foreground max-w-xs">{t("projects.description")}</p>
          </div>
        </motion.div>

        <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {filters.map(({ value, label, count }) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={cn(
                "flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                filter === value ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/40",
              )}
            >
              {label}
              <span className={cn("text-xs", filter === value ? "text-background/60" : "text-muted-foreground")}>{count}</span>
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-flow-dense auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:auto-rows-[220px] lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={isFeatured(project) ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}
              >
                <Tile project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
