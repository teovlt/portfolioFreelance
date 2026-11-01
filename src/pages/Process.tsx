import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { openContactTab } from "@/utils/contactTab";

type Step = { title: string; duration: string; text: string };

export const Process = () => {
  const { t } = useTranslation();
  const steps = t("process.steps", { returnObjects: true }) as Step[];

  return (
    <section className="py-24 sm:py-32" id="process-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="eyebrow mb-4">{t("process.eyebrow")}</p>
            <h2 className="text-4xl md:text-5xl">
              {t("process.titleStart")} <span className="font-serif italic font-medium">{t("process.titleHighlight")}</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs">{t("process.description")}</p>
        </motion.div>

        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border-t border-foreground pt-5"
            >
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <span className="font-serif text-2xl">{i + 1}.</span>
                <span className="text-xs text-muted-foreground">{step.duration}</span>
              </div>
              <h3 className="text-lg font-display font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
            </motion.li>
          ))}
        </ol>

        <a
          href="#contact-section"
          onClick={(e) => openContactTab("booking", e)}
          className="mt-12 inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 hover:text-accent-foreground transition-colors"
        >
          {t("process.cta")}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
};
