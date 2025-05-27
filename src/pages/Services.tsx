import { motion } from "framer-motion";
import { Palette, Globe, Smartphone } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { useTranslation } from "react-i18next";

export const Services = () => {
  const { t } = useTranslation();

  return (
    <section
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br dark:from-muted/30 dark:to-muted/50 from-muted/80 to-muted/90"
      id="services-section"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold "
          >
            {t("services.titleStart")} <span className="text-primary">{t("services.titleHighlight")}</span>
          </motion.h2>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              icon={<Globe className="h-12 w-12 text-primary" />}
              title={t("services.cards.0.title")}
              description={t("services.cards.0.description")}
              points={t("services.cards.0.points", { returnObjects: true }) as string[]}
              delay={0.1}
            />
            <ServiceCard
              icon={<Smartphone className="h-12 w-12 text-primary" />}
              title={t("services.cards.1.title")}
              description={t("services.cards.1.description")}
              points={t("services.cards.1.points", { returnObjects: true }) as string[]}
              delay={0.2}
            />
            <ServiceCard
              icon={<Palette className="h-12 w-12 text-primary" />}
              title={t("services.cards.2.title")}
              description={t("services.cards.2.description")}
              points={t("services.cards.2.points", { returnObjects: true }) as string[]}
              delay={0.3}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
