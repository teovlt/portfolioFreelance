"use client";

import { useState } from "react";
import { Check, ArrowUpRight, Clock, FileText, Handshake, KeyRound, PenTool, RefreshCw, Repeat } from "lucide-react";
import { useTranslation } from "react-i18next";
import { scrollToSection } from "@/utils/scrollToSection";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePackage } from "@/providers/package-provider";
import { useLocalize, usePublicContent } from "@/hooks/usePublicContent";
import type { Package } from "@/types/content";

function QuotePreview({ label }: { label: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="hidden sm:block absolute right-8 top-12 w-56 lg:w-64 rotate-3 rounded-xl overflow-hidden border border-background/15 bg-background shadow-2xl transition-transform duration-300 group-hover:rotate-1 group-hover:-translate-y-1">
      {!failed ? (
        <img src="/images/services/devis-exemple.png" alt={label} onError={() => setFailed(true)} className="w-full h-auto" />
      ) : (
        <div className="aspect-square flex flex-col items-center justify-center gap-3 p-6 text-center">
          <FileText className="h-8 w-8 text-muted-foreground/40" />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      )}
    </div>
  );
}

function PackageCard({ service, variants }: { service: Package; variants: Variants }) {
  const { i18n } = useTranslation();
  const fr = i18n.language === "fr";
  const localize = useLocalize();
  const { setSelectedPackage } = usePackage();
  // Only used when the package offers both; otherwise the pricing mode decides
  const [monthly, setMonthly] = useState(false);
  const isMonthly = service.pricing === "subscription" || (service.pricing === "both" && monthly);

  return (
    // Own reveal rather than the section's: cards mount after the fetch, and a
    // late child of an already-revealed parent would stay hidden
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`flex flex-col rounded-2xl border p-7 ${
        service.popular ? "border-accent bg-accent/5 lg:-translate-y-3 shadow-lg shadow-accent/10" : "border-border bg-card"
      }`}
    >
      {localize(service.badge) && (
        <span
          className={`self-start mb-4 rounded-full text-[10px] font-semibold uppercase tracking-wider px-3 py-1 ${
            service.popular ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground border border-border"
          }`}
        >
          {localize(service.badge)}
        </span>
      )}

      <h3 className="text-lg font-display font-bold mb-2">{localize(service.title)}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{localize(service.description)}</p>

      <div className="mb-6">
        {service.pricing === "both" && (
          <div className="mb-3 inline-grid grid-cols-2 gap-0.5 rounded-full border border-border p-0.5 text-xs font-medium">
            {([false, true] as const).map((option) => (
              <button
                key={String(option)}
                type="button"
                onClick={() => setMonthly(option)}
                className={`rounded-full px-3 py-1 transition-colors ${
                  monthly === option ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {option ? (fr ? "Mensuel" : "Monthly") : fr ? "En une fois" : "One-time"}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs text-muted-foreground">{fr ? "À partir de" : "Starting from"}</span>
        </div>
        {isMonthly ? (
          <div className="font-serif text-4xl font-semibold">
            {service.monthlyPrice}
            <span className="font-sans text-base font-normal text-muted-foreground">{fr ? "/mois" : "/month"}</span>
          </div>
        ) : (
          <div className="font-serif text-4xl font-semibold">{service.price}</div>
        )}
        {/* Kept in the layout (just hidden) in one-time mode, so switching to
            monthly doesn't grow the card and push the whole grid row down */}
        {service.pricing !== "oneTime" && localize(service.commitment) && (
          <div className={`flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5 ${isMonthly ? "" : "invisible"}`}>
            <Repeat className="h-3 w-3" />
            {localize(service.commitment)}
          </div>
        )}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
          <Clock className="h-3 w-3" />
          {localize(service.duration)}
        </div>
      </div>

      <ul className="space-y-2.5 mb-8">
        {service.deliverables.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Check className="h-3.5 w-3.5 mt-0.5 text-accent-foreground flex-shrink-0" />
            {localize(point)}
          </li>
        ))}
      </ul>

      <Button
        variant={service.popular ? "default" : "outline"}
        className="w-full mt-auto"
        onClick={(e) => {
          const title = localize(service.title);
          setSelectedPackage(isMonthly ? `${title} (${fr ? "abonnement" : "subscription"})` : title);
          scrollToSection("contact-section", e);
        }}
      >
        {fr ? "Choisir ce forfait" : "Choose this plan"}
      </Button>
    </motion.div>
  );
}

export function Services() {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const { setSelectedPackage } = usePackage();
  const { data: services } = usePublicContent<Package[]>("/packages", []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.section
      className="py-24 sm:py-32"
      id="services-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="mb-16">
          <p className="eyebrow mb-4">{language === "fr" ? "Tarifs" : "Pricing"}</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl">
              {language === "fr" ? (
                <>
                  Des tarifs <span className="font-serif italic font-medium">clairs</span>
                </>
              ) : (
                <>
                  <span className="font-serif italic font-medium">Clear</span> pricing
                </>
              )}
            </h2>
            <p className="text-muted-foreground max-w-xs">
              {language === "fr"
                ? "Un prix de départ par formule, ajusté à votre projet dans le devis. Pas de surprise à la facture."
                : "A starting price for each plan, fine-tuned to your project in the quote. No surprises on the invoice."}
            </p>
          </div>
        </motion.div>

        <div
          className={`grid sm:grid-cols-2 gap-5 items-stretch ${
            services.length === 3 ? "lg:grid-cols-3" : services.length === 2 ? "max-w-4xl mx-auto" : "lg:grid-cols-4"
          }`}
        >
          {services.map((service) => (
            <PackageCard key={service._id} service={service} variants={itemVariants} />
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Handshake className="h-4 w-4 text-accent-foreground flex-shrink-0" />
            {language === "fr" ? "Un seul interlocuteur, du devis à la mise en ligne" : "One point of contact, from quote to launch"}
          </div>
          <div className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-accent-foreground flex-shrink-0" />
            {language === "fr" ? "Le site et son code vous appartiennent" : "You own the site and its code"}
          </div>
          <div className="flex items-center gap-2">
            <PenTool className="h-4 w-4 text-accent-foreground flex-shrink-0" />
            {language === "fr" ? "Maquette validée avant le développement" : "Mockup approved before development"}
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-accent-foreground flex-shrink-0" />
            {language === "fr" ? "Création ou refonte de site" : "New sites or redesigns"}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          className="group mt-14 max-w-4xl mx-auto relative rounded-3xl overflow-hidden bg-foreground text-background grain"
        >
          <div className="relative px-7 sm:px-10 py-9 sm:pr-72 lg:pr-80 sm:min-h-[15rem]">
            <div>
              <span className="inline-flex items-center rounded-full bg-background/10 border border-background/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider mb-4">
                {language === "fr" ? "100% gratuit" : "100% free"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold mb-2">
                {language === "fr" ? "Besoin d'un devis personnalisé ?" : "Need a custom quote?"}
              </h3>
              <p className="text-sm text-background/70 max-w-sm mb-6">
                {language === "fr"
                  ? "Je vous envoie un devis détaillé sous 24 h, gratuit et sans engagement. Vous savez exactement ce que vous payez avant de commencer."
                  : "I'll send you a detailed quote within 24 hours, free and with no commitment. You know exactly what you're paying for before we start."}
              </p>
              <button
                onClick={(e) => {
                  setSelectedPackage(language === "fr" ? "Devis personnalisé" : "Custom quote");
                  scrollToSection("contact-section", e);
                }}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-background text-foreground font-semibold text-sm hover:bg-background/90 transition-colors"
              >
                {language === "fr" ? "Demander un devis gratuit" : "Request a free quote"}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <QuotePreview label={language === "fr" ? "Exemple de devis" : "Example quote"} />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
