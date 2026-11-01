import { useState } from "react";
import { Helmet } from "react-helmet";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { openContactTab } from "@/utils/contactTab";
import { usePackagePricing } from "@/hooks/usePackagePricing";
import { useLocalize, usePublicContent } from "@/hooks/usePublicContent";
import type { Faq as FaqItem } from "@/types/content";

type Item = { q: string; a: string };

export const Faq = () => {
  const { t } = useTranslation();
  const localize = useLocalize();
  const { prices, durations } = usePackagePricing();
  const { data: faqs } = usePublicContent<FaqItem[]>("/faqs", []);

  // Answers can quote {{tarifs}} / {{delais}}, filled in from the packages
  const items: Item[] = faqs.map((f) => ({
    q: localize(f.question),
    a: localize(f.answer)
      .replace(/{{\s*tarifs\s*}}/g, prices || t("faq.pricesFallback"))
      .replace(/{{\s*delais\s*}}/g, durations || t("faq.durationsFallback")),
  }));
  const [open, setOpen] = useState<number | null>(0);

  // Lets Google show the questions as rich results under the site
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };

  // Nothing to show until questions exist in the admin
  if (items.length === 0) return null;

  return (
    <section className="py-24 sm:py-32" id="faq-section">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <p className="eyebrow mb-4">{t("faq.eyebrow")}</p>
          <h2 className="text-4xl md:text-5xl mb-4">
            {t("faq.titleStart")} <span className="font-serif italic font-medium">{t("faq.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-sm mb-6">{t("faq.description")}</p>
          <a
            href="#contact-section"
            onClick={(e) => openContactTab("message", e)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 hover:text-accent-foreground transition-colors"
          >
            {t("faq.ask")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        <ul className="border-t border-border">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-border">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                >
                  <span className="text-base sm:text-lg font-display font-bold">{item.q}</span>
                  <span
                    className={`w-8 h-8 flex-shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "rotate-45 bg-accent border-accent text-accent-foreground" : "border-border group-hover:border-foreground"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-14 text-muted-foreground leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
