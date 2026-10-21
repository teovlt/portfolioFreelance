"use client";

import { useState } from "react";
import { Check, ArrowUpRight, Clock, FileText, Handshake, Percent, PenTool, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { scrollToSection } from "@/utils/scrollToSection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accent } from "@/components/customs/accent-text";
import { usePackage } from "@/providers/package-provider";

function QuotePreview({ label }: { label: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden border border-background/15 bg-background shadow-xl rotate-1">
      {!failed ? (
        <img
          src="/images/services/devis-exemple.png"
          alt={label}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
          <FileText className="h-8 w-8 text-muted-foreground/40" />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      )}
    </div>
  );
}

export function Services() {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const { setSelectedPackage } = usePackage();

  const services = [
    {
      title: language === "fr" ? "Design personnalisé" : "Custom Design",
      description:
        language === "fr"
          ? "Des maquettes modernes et cohérentes avec votre image, avant de passer au développement."
          : "Modern mockups that match your brand, before moving into development.",
      price: "800€",
      duration: language === "fr" ? "1 à 2 semaines" : "1 to 2 weeks",
      badge: language === "fr" ? "Étape optionnelle" : "Optional step",
      deliverables:
        language === "fr"
          ? ["Maquettes visuelles (Figma)", "Design mobile & bureau", "Couleurs & typographies pro", "Combinable avec un forfait développement"]
          : ["Visual mockups (Figma)", "Mobile & desktop design", "Professional colors & fonts", "Can be combined with a dev package"],
      popular: false,
    },
    {
      title: language === "fr" ? "Site vitrine" : "Showcase Website",
      description:
        language === "fr"
          ? "Un site clair et rapide pour présenter votre activité ou projet."
          : "A clean and fast website to showcase your activity or project.",
      price: "1 200€",
      duration: language === "fr" ? "1 à 2 semaines" : "1 to 2 weeks",
      badge: language === "fr" ? "Plus populaire" : "Most Popular",
      deliverables:
        language === "fr"
          ? ["Mobile & bureau", "Pages rapides & optimisées", "Design moderne sur-mesure", "Hébergement & assistance 30 jours inclus"]
          : ["Mobile & desktop ready", "Fast, optimized pages", "Custom modern design", "Hosting & 30-day support included"],
      popular: true,
    },
    {
      title: language === "fr" ? "Site avec fonctionnalités" : "Website with Features",
      description:
        language === "fr"
          ? "Avis, formulaire de contact, réservation, espace personnel, et plus."
          : "Reviews, contact form, booking, personal space, and more.",
      price: "2 500€",
      duration: language === "fr" ? "2 à 5 semaines" : "2 to 5 weeks",
      deliverables:
        language === "fr"
          ? ["Espace personnel sécurisé", "Formulaires & réservation", "Connexion identifiants", "Hébergement & assistance 30 jours inclus"]
          : ["Secure personal space", "Forms & booking system", "Login system", "Hosting & 30-day support included"],
      popular: false,
    },
    {
      title: language === "fr" ? "Site complet" : "Complete Website",
      description:
        language === "fr"
          ? "Plusieurs pages, fonctionnalités personnalisées, base de données, et tout ce qu'il faut."
          : "Multiple pages, custom features, database, and everything needed.",
      price: "4 800€",
      duration: language === "fr" ? "4 à 8 semaines" : "4 to 8 weeks",
      deliverables:
        language === "fr"
          ? ["Site sur mesure multi-pages", "Fonctionnalités avancées", "Base de données & stockage", "Hébergement & assistance 60 jours inclus"]
          : ["Custom multi-page website", "Advanced features", "Database & storage", "Hosting & 60-day support included"],
      popular: false,
    },
  ];

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
          <p className="eyebrow mb-4">{language === "fr" ? "Ce que je fais" : "What I do"}</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl">
              {language === "fr" ? (
                <>
                  Packages <Accent className="font-serif italic font-medium">professionnels</Accent>
                </>
              ) : (
                <>
                  <Accent className="font-serif italic font-medium">Professional</Accent> Packages
                </>
              )}
            </h2>
            <p className="text-muted-foreground max-w-xs">
              {language === "fr"
                ? "Choisissez le package qui correspond à vos besoins — prix transparents, à chaque fois."
                : "Choose the package that fits your needs — transparent pricing, every time."}
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col rounded-2xl border p-7 ${
                service.popular ? "border-accent bg-accent/5 lg:-translate-y-3 shadow-lg shadow-accent/10" : "border-border bg-card"
              }`}
            >
              {service.badge && (
                <span
                  className={`self-start mb-4 rounded-full text-[10px] font-semibold uppercase tracking-wider px-3 py-1 ${
                    service.popular
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {service.badge}
                </span>
              )}

              <h3 className="text-lg font-display font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{service.description}</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs text-muted-foreground">{language === "fr" ? "À partir de" : "Starting from"}</span>
                </div>
                <div className="font-serif text-4xl font-semibold">{service.price}</div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                  <Clock className="h-3 w-3" />
                  {service.duration}
                </div>
              </div>

              <ul className="space-y-2.5 mb-8">
                {service.deliverables.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-3.5 w-3.5 mt-0.5 text-accent-foreground flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              <Button
                variant={service.popular ? "default" : "outline"}
                className="w-full mt-auto"
                onClick={(e) => {
                  setSelectedPackage(service.title);
                  scrollToSection("contact-section", e);
                }}
              >
                {language === "fr" ? "Choisir ce forfait" : "Choose this plan"}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Handshake className="h-4 w-4 text-accent-foreground flex-shrink-0" />
            {language === "fr" ? "Accompagnement du début à la fin" : "Support from start to finish"}
          </div>
          <div className="flex items-center gap-2">
            <Percent className="h-4 w-4 text-accent-foreground flex-shrink-0" />
            {language === "fr" ? "Prix ouverts à la négociation" : "Prices open to negotiation"}
          </div>
          <div className="flex items-center gap-2">
            <PenTool className="h-4 w-4 text-accent-foreground flex-shrink-0" />
            {language === "fr" ? "Maquettes avant développement si besoin" : "Mockups before development if needed"}
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-accent-foreground flex-shrink-0" />
            {language === "fr" ? "Création de site ou refonte d'un site existant" : "New builds or redesigns of existing sites"}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div variants={itemVariants} className="mt-16 relative rounded-3xl overflow-hidden bg-foreground text-background grain">
          <div className="relative grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center px-8 sm:px-14 py-16">
            <div>
              <span className="inline-flex items-center rounded-full bg-background/10 border border-background/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-5">
                {language === "fr" ? "100% gratuit" : "100% free"}
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-bold max-w-xl mb-4">
                {language === "fr" ? "Besoin d'un devis personnalisé ?" : "Need a custom quote?"}
              </h3>
              <p className="text-background/70 max-w-md mb-8">
                {language === "fr"
                  ? "Je vous envoie un devis clair et détaillé sous 24h — gratuit et sans engagement, pour que vous sachiez exactement ce que vous payez avant de commencer."
                  : "I'll send you a clear, detailed quote within 24h — free of charge and with no commitment, so you know exactly what you're paying for before we start."}
              </p>
              <button
                onClick={(e) => {
                  setSelectedPackage(language === "fr" ? "Devis personnalisé" : "Custom quote");
                  scrollToSection("contact-section", e);
                }}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-background text-foreground font-semibold text-sm hover:bg-background/90 transition-colors"
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
