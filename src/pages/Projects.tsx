import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Briefcase, FlaskConical, Sparkles, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProjects } from "@/hooks/useProjects";
import { cn } from "@/lib/utils";
import { ProjectCategory, ProjectStatus, type Project } from "@/types/project";
import { projectCategory, projectCategoryOrder, sortProjects } from "@/utils/projects";

type Filter = "all" | ProjectCategory;

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

// Each kind of project gets its own colour and icon, so a visitor tells a
// real client site from a demo or a side project at a glance
const kinds: Record<ProjectCategory, { icon: LucideIcon; badge: string; dot: string }> = {
  // Taken from the site's palette (theme tokens), so trade pages recolour
  // them along with the rest of the page
  [ProjectCategory.CLIENT]: { icon: Briefcase, badge: "bg-primary text-primary-foreground", dot: "bg-primary" },
  [ProjectCategory.DEMO]: { icon: FlaskConical, badge: "bg-accent text-accent-foreground", dot: "bg-accent" },
  [ProjectCategory.PERSONAL]: { icon: Sparkles, badge: "bg-foreground text-background", dot: "bg-foreground" },
};

const KindBadge = ({ project, size = "lg" }: { project: Project; size?: "sm" | "lg" }) => {
  const { t } = useTranslation();
  const category = projectCategory(project);
  const { icon: Icon, badge } = kinds[category];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-[0.12em] shadow-sm",
        size === "lg" ? "px-3.5 py-1.5 text-xs sm:text-sm" : "px-3 py-1 text-[11px]",
        badge,
      )}
    >
      <Icon className={size === "lg" ? "size-4" : "size-3.5"} />
      {t(`projects.kind.${category}`)}
    </span>
  );
};

// Scrolling through the tall wrapper moves a 0→1 progress while the stage
// stays pinned to the screen
const useRail = (count: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.5 });
  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setActive(Math.min(count - 1, Math.max(0, Math.round(v * (count - 1))))));
  return { ref, progress, active };
};

// Horizontal offset of the track: first card centred at 0, last one at 1
const useTrackX = (progress: MotionValue<number>, count: number) => {
  const track = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ from: 0, to: 0 });
  useEffect(() => {
    const measure = () => {
      const el = track.current;
      const card = el?.firstElementChild as HTMLElement | null;
      if (!el || !card) return;
      const vw = document.documentElement.clientWidth;
      setBounds({ from: vw / 2 - card.offsetWidth / 2, to: vw / 2 - (el.scrollWidth - card.offsetWidth / 2) });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [count]);
  return { track, x: useTransform(progress, [0, 1], [bounds.from, bounds.to]) };
};

// Words slide up from behind a mask, one after the other
const RevealText = ({ text }: { text: string }) => (
  <span className="inline-flex flex-wrap gap-x-[0.25em]">
    {text.split(" ").map((word, i) => (
      <span key={i} className="overflow-hidden pb-[0.08em]">
        <motion.span
          className="inline-block"
          initial={{ y: "110%", rotate: 4 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.05 + i * 0.05 }}
        >
          {word}
        </motion.span>
      </span>
    ))}
  </span>
);

// Number that rolls vertically when it changes
const Rolling = ({ value, className }: { value: string; className?: string }) => (
  <span className={cn("relative inline-flex overflow-hidden", className)}>
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.5, ease }}
        className="inline-block"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  </span>
);

const Card = ({ project, index, count, progress }: { project: Project; index: number; count: number; progress: MotionValue<number> }) => {
  const reduce = useReducedMotion();
  // 0 when this card is centred, ±1 one card away
  const d = useTransform(progress, (v) => v * (count - 1) - index);
  const rotateY = useTransform(d, [-1, 0, 1], reduce ? [0, 0, 0] : [35, 0, -35]);
  const scale = useTransform(d, [-1, 0, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(d, [-2, 0, 2], [0.25, 1, 0.25]);
  // Stays sharp until a card is well on its way out, and only softens lightly
  const blur = useTransform(d, [-2, -0.6, 0.6, 2], reduce ? [0, 0, 0, 0] : [3, 0, 0, 3]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  // Small sideways drift; the image is only scaled enough to hide its edges
  const imgX = useTransform(d, [-1, 1], reduce ? ["0%", "0%"] : ["3%", "-3%"]);

  return (
    <motion.div style={{ rotateY, scale, opacity, filter }} className="w-[78vw] flex-shrink-0 sm:w-[54vw] lg:w-[42vw]">
      <Link
        to={`/projects/${project.slug}`}
        className="group relative block aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-muted shadow-2xl"
      >
        <motion.img
          style={{ x: imgX, scale: 1.07 }}
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-top"
        />
        <span className="absolute right-4 top-4 flex size-11 scale-75 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </Link>
    </motion.div>
  );
};

const Rail = ({ projects }: { projects: Project[] }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "fr";
  const { ref, progress, active } = useRail(projects.length);
  const { track, x } = useTrackX(progress, projects.length);
  const project = projects[active];
  const category = projectCategory(project);

  // The rail is driven by the page scroll, so moving to a project means
  // scrolling to the matching point of the tall wrapper
  const goTo = (index: number) => {
    const el = ref.current;
    if (!el || index < 0 || index >= projects.length) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const length = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (length * index) / Math.max(projects.length - 1, 1), behavior: "smooth" });
  };

  return (
    <div ref={ref} style={{ height: `${Math.max(projects.length, 2) * 75}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20" style={{ perspective: 1600 }}>
        <motion.div ref={track} style={{ x }} className="flex w-max items-center gap-[5vw]">
          {projects.map((p, i) => (
            <Card key={p._id} project={p} index={i} count={projects.length} progress={progress} />
          ))}
        </motion.div>

        <div className="container mx-auto mt-8 grid gap-5 px-4 sm:px-6 md:grid-cols-[auto_1fr_auto] md:items-start lg:px-8">
          <Rolling value={pad(active + 1)} className="hidden font-display text-5xl font-bold leading-none text-muted-foreground/40 md:inline-flex" />

          <div key={project._id} className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5"
            >
              <KindBadge project={project} />
              {project.status !== ProjectStatus.DONE && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <span className="size-1.5 animate-pulse rounded-full bg-current" />
                  {t(`projects.status.${project.status}`)}
                </span>
              )}
              <span className="hidden text-sm text-muted-foreground sm:inline">{t(`projects.categories.${category}.description`)}</span>
            </motion.div>
            <h3 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              <Link to={`/projects/${project.slug}`} className="hover:underline hover:decoration-2 hover:underline-offset-4">
                <RevealText text={project.title} />
              </Link>
            </h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 line-clamp-2 max-w-xl text-muted-foreground"
            >
              {project.tagline[lang]}
            </motion.p>
          </div>

          <dl key={`${project._id}-meta`} className="hidden gap-x-8 gap-y-3 text-sm sm:grid sm:grid-cols-[auto_1fr] md:w-[24rem]">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease }}>
              <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("projects.meta.year")}</dt>
              <dd className="mt-0.5 whitespace-nowrap font-medium">{project.timeline[lang]}</dd>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, ease }}>
              <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("projects.meta.role")}</dt>
              <dd className="mt-0.5 font-medium">{project.role[lang]}</dd>
            </motion.div>
            <div className="col-span-2">
              <dt className="mb-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("projects.meta.stack")}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {project.stack.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.04 }}
                    className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-foreground/80"
                  >
                    {s}
                  </motion.span>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <div className="container mx-auto mt-8 flex items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* One segment per project, tinted with its kind's colour; each one jumps to its project */}
          <div className="flex flex-1 items-center gap-1.5">
            {projects.map((p, i) => (
              <button
                key={p._id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={p.title}
                aria-current={i === active}
                className="group flex-1 py-2"
              >
                <span className="block h-1 overflow-hidden rounded-full bg-border transition-colors group-hover:bg-muted-foreground/40">
                  <motion.span
                    className={cn("block h-full origin-left", kinds[projectCategory(p)].dot)}
                    animate={{ scaleX: i <= active ? 1 : 0 }}
                    transition={{ duration: 0.5, ease }}
                  />
                </span>
              </button>
            ))}
          </div>
          {/* For visitors who'd rather click than scroll sideways */}
          <div className="flex gap-2">
            {[
              { to: active - 1, icon: ArrowLeft, label: t("projects.previous") },
              { to: active + 1, icon: ArrowRight, label: t("projects.next") },
            ].map(({ to, icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                onClick={() => goTo(to)}
                disabled={to < 0 || to >= projects.length}
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-foreground hover:text-foreground active:scale-90 disabled:pointer-events-none disabled:opacity-30"
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  const { t } = useTranslation();
  const { projects } = useProjects();
  const [filter, setFilter] = useState<Filter>("all");
  const railStart = useRef<HTMLDivElement>(null);

  const sorted = sortProjects(projects);
  const filters = [
    { value: "all" as Filter, label: t("projects.filterAll"), count: sorted.length },
    ...projectCategoryOrder.map((category) => ({
      value: category as Filter,
      label: t(`projects.categories.${category}.title`),
      count: sorted.filter((project) => projectCategory(project) === category).length,
    })),
  ].filter((entry) => entry.count > 0);
  const visible = filter === "all" ? sorted : sorted.filter((project) => projectCategory(project) === filter);

  const pick = (value: Filter) => {
    setFilter(value);
    // A new list starts back on its first project
    const top = railStart.current?.getBoundingClientRect().top;
    if (top !== undefined && top < 0) window.scrollBy({ top, behavior: "instant" });
  };

  return (
    <section className="pt-20" id="projects-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="eyebrow mb-4">{t("projects.eyebrow")}</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl">
              {t("projects.title")} <span className="font-serif italic font-medium">{t("projects.highlight")}</span>
            </h2>
            <p className="text-muted-foreground max-w-xs">{t("projects.description")}</p>
          </div>
        </motion.div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {filters.map(({ value, label, count }) => {
            const Icon = value === "all" ? null : kinds[value].icon;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={filter === value}
                onClick={() => pick(value)}
                className={cn(
                  "flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  filter === value ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/40",
                )}
              >
                {Icon && <Icon className="size-4" />}
                {label}
                <span className={cn("text-xs", filter === value ? "text-background/60" : "text-muted-foreground")}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div ref={railStart} />
      {visible.length > 0 && <Rail key={filter} projects={visible} />}
    </section>
  );
};
