import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { openContactTab } from "@/utils/contactTab";
import { usePackagePricing } from "@/hooks/usePackagePricing";

type Trade = { slug: string; link: string; text: string };

// Long-form text aimed at "création de sites web Grenoble": who it's for, what
// a site includes, how it goes, where, and roughly what it costs. Each trade
// page is linked with its full search phrase as the anchor. The same French
// text is in the crawler snapshot (server/src/utils/snapshot.ts, homeSnapshot):
// keep both in sync.
export const LocalSeo = () => {
  const { t } = useTranslation();
  const { featured } = usePackagePricing();
  const trades = t("localSeo.trades", { returnObjects: true }) as Trade[];
  const included = t("localSeo.included", { returnObjects: true }) as string[];
  const steps = t("localSeo.steps", { returnObjects: true }) as string[];

  const reveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <section className="py-24 sm:py-32" id="local-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div {...reveal} className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow mb-4">{t("localSeo.eyebrow")}</p>
          <h2 className="text-4xl md:text-5xl mb-6">
            {t("localSeo.titleStart")} <span className="font-serif italic font-medium">{t("localSeo.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-md">{t("localSeo.intro")}</p>
        </motion.div>

        <motion.div {...reveal} className="space-y-12 max-w-2xl text-muted-foreground leading-relaxed">
          <div>
            <h3 className="text-xl text-foreground mb-3">{t("localSeo.whoTitle")}</h3>
            <p className="mb-4">{t("localSeo.whoIntro")}</p>
            <ul className="space-y-3">
              {trades.map((trade) => (
                <li key={trade.slug} className="border-l-2 border-accent pl-4">
                  <Link
                    to={`/${trade.slug}`}
                    className="font-semibold text-foreground underline underline-offset-4 hover:text-accent-foreground transition-colors"
                  >
                    {trade.link.charAt(0).toUpperCase() + trade.link.slice(1)}
                  </Link>
                  {t("localSeo.colon")}
                  {trade.text}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl text-foreground mb-3">{t("localSeo.includedTitle")}</h3>
            <ul className="list-disc pl-5 space-y-2 marker:text-accent">
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl text-foreground mb-3">{t("localSeo.stepsTitle")}</h3>
            <ol className="list-decimal pl-5 space-y-2 marker:font-semibold marker:text-foreground">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-xl text-foreground mb-3">{t("localSeo.areaTitle")}</h3>
            <p>{t("localSeo.area")}</p>
          </div>

          <div>
            <h3 className="text-xl text-foreground mb-3">{t("localSeo.freelanceTitle")}</h3>
            <p>{t("localSeo.freelance")}</p>
          </div>

          <div>
            <h3 className="text-xl text-foreground mb-3">{t("localSeo.priceTitle")}</h3>
            <p>
              {featured ? t("localSeo.priceFeatured", { ...featured, interpolation: { escapeValue: false } }) : t("localSeo.priceFallback")}{" "}
              {t("localSeo.priceShowcase")} {t("localSeo.priceMore")}
            </p>
            <a
              href="#contact-section"
              onClick={(e) => openContactTab("booking", e)}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline underline-offset-4 hover:text-accent-foreground transition-colors"
            >
              {t("localSeo.cta")}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
