import { motion } from "framer-motion";
import { ArrowRight, FileText, PenTool, PhoneCall, Rocket, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/utils/scrollToSection";

type Step = { title: string; duration: string; text: string };

const icons: LucideIcon[] = [PhoneCall, FileText, PenTool, Rocket];

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
          className="mb-16 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="eyebrow mb-4">{t("process.eyebrow")}</p>
            <h2 className="text-4xl md:text-5xl">
              {t("process.titleStart")} <span className="font-serif italic font-medium">{t("process.titleHighlight")}</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs">{t("process.description")}</p>
        </motion.div>

        <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Thread linking the steps on wide screens */}
          <div className="hidden lg:block absolute top-11 left-[12.5%] right-[12.5%] border-t border-dashed border-border" aria-hidden="true" />

          {steps.map((step, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative flex flex-col rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="relative z-10 w-11 h-11 rounded-xl bg-accent text-accent-foreground flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-4xl text-border select-none">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-lg font-display font-bold mb-1">{step.title}</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{step.duration}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
              </motion.li>
            );
          })}
        </ol>

        <div className="mt-10 flex justify-center">
          <Button size="lg" className="group" onClick={(e) => scrollToSection("contact-section", e)}>
            {t("process.cta")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
