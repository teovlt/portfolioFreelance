import { GraduationCap, Briefcase, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Accent } from "@/components/customs/accent-text";

export const Experiences = () => {
  const { t } = useTranslation();

  const timelineData = [
    {
      type: "formation",
      kind: "education",
      date: "2024 — 2027",
      org: t("experiences.timeline.0.org"),
      logo: "/images/experiences/imt-nord-europe.png",
      accent: "primary",
      title: t("experiences.timeline.0.title"),
      subtitle: t("experiences.timeline.0.subtitle"),
      description: t("experiences.timeline.0.description"),
      highlights: t("experiences.timeline.0.highlights", { returnObjects: true }) as string[],
    },
    {
      type: "alternance",
      kind: "work",
      date: t("experiences.timeline.1.date"),
      org: t("experiences.timeline.1.org"),
      logo: "/images/experiences/gipsa-lab.png",
      accent: "accent",
      title: t("experiences.timeline.1.title"),
      subtitle: t("experiences.timeline.1.subtitle"),
      description: t("experiences.timeline.1.description"),
      highlights: t("experiences.timeline.1.highlights", { returnObjects: true }) as string[],
    },
    {
      type: "stage",
      kind: "work",
      date: t("experiences.timeline.2.date"),
      org: t("experiences.timeline.2.org"),
      logo: "/images/experiences/lig.png",
      accent: "primary",
      title: t("experiences.timeline.2.title"),
      subtitle: t("experiences.timeline.2.subtitle"),
      description: t("experiences.timeline.2.description"),
      highlights: t("experiences.timeline.2.highlights", { returnObjects: true }) as string[],
    },
    {
      type: "formation",
      kind: "education",
      date: "2021 — 2024",
      org: t("experiences.timeline.3.org"),
      logo: "/images/experiences/iut2-informatique.png",
      accent: "accent",
      title: t("experiences.timeline.3.title"),
      subtitle: t("experiences.timeline.3.subtitle"),
      description: t("experiences.timeline.3.description"),
      highlights: t("experiences.timeline.3.highlights", { returnObjects: true }) as string[],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section className="py-24 sm:py-32" id="experiences-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="eyebrow mb-4">{t("experiences.eyebrow")}</p>
          <h2 className="text-4xl md:text-5xl max-w-xl">
            {t("experiences.titleStart")} <Accent className="font-serif italic font-medium">{t("experiences.titleHighlight")}</Accent>
          </h2>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
          {timelineData.map((entry, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col sm:flex-row gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              {/* Organization logo tile */}
              <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white flex items-center justify-center p-2 border border-border">
                <img src={entry.logo} alt={entry.org} className="w-full h-full object-contain" />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="text-lg sm:text-xl font-display font-bold">{entry.title}</h3>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {entry.kind === "education" ? <GraduationCap className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                    {t(`experiences.types.${entry.type}`)}
                  </span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-0.5">{entry.org}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mb-4">
                  <span>{entry.subtitle}</span>
                  <span className="text-border">·</span>
                  <span className="font-semibold uppercase tracking-wider">{entry.date}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">{entry.description}</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {entry.highlights?.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check className="w-3.5 h-3.5 mt-0.5 text-accent-foreground flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
