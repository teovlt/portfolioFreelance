"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Server, Layers, ArrowRight, CheckCircle, Clock, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { scrollToSection } from "@/utils/scrollToSection";

export function Services() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      icon: Code,
      title: t("Frontend"),
      description: t("Interfaces utilisateur modernes et responsives avec React, Next.js et TypeScript"),
      price: language === "fr" ? "À partir de 600€" : "Starting from €600",
      duration: language === "fr" ? "1-2 semaines" : "1-2 weeks",
      deliverables: [
        language === "fr" ? "Interface responsive" : "Responsive interface",
        language === "fr" ? "Code optimisé" : "Optimized code",
        language === "fr" ? "Documentation" : "Documentation",
        language === "fr" ? "Support 30 jours" : "30-day support",
      ],
      popular: true,
      projects: 12,
    },
    {
      icon: Server,
      title: t("Backend"),
      description: t("APIs robustes et bases de données optimisées avec Node.js et technologies cloud"),
      price: language === "fr" ? "À partir de 1500€" : "Starting from €1500",
      duration: language === "fr" ? "2-5 semaines" : "2-5 weeks",
      deliverables: [
        language === "fr" ? "API sécurisée" : "Secure API",
        language === "fr" ? "Base de données" : "Database setup",
        language === "fr" ? "Tests automatisés" : "Automated tests",
        language === "fr" ? "Déploiement cloud" : "Cloud deployment",
      ],
      popular: false,
      projects: 6,
    },
    {
      icon: Layers,
      title: t("Fullstack"),
      description: t("Applications web complètes de A à Z, du concept au déploiement"),
      price: language === "fr" ? "À partir de 3000€" : "Starting from €3000",
      duration: language === "fr" ? "4-8 semaines" : "4-8 weeks",
      deliverables: [
        language === "fr" ? "Application complète" : "Complete application",
        language === "fr" ? "Architecture scalable" : "Scalable architecture",
        language === "fr" ? "CI/CD pipeline" : "CI/CD pipeline",
        language === "fr" ? "Support 60 jours" : "60-day support",
      ],
      popular: false,
      projects: 9,
    },
  ];

  return (
    <section
      className="min-h-screen flex items-center justify-center py-20 p-4 bg-gradient-to-br dark:from-muted/30 dark:to-muted/50 from-muted/80 to-muted/90"
      id="services-section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold items-center justify-center text-center mb-4">
            Packages<span className="text-primary"> Professionnels</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choisissez le package qui correspond à vos besoins avec des prix transparents
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`relative transition-all duration-300 ${
                service.popular
                  ? "border-2 border-blue-500 shadow-xl scale-105"
                  : "border hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg"
              } ${hoveredService === index ? "transform scale-105" : ""}`}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {service.popular && (
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {language === "fr" ? "Plus Populaire" : "Most Popular"}
                  </div>
                </div>
              )}

              <CardContent className="p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      service.popular ? "bg-blue-500 text-white" : "bg-blue-100 dark:bg-blue-900 text-blue-600"
                    }`}
                  >
                    <service.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                  <div className="text-3xl font-bold text-blue-600 mb-1">{service.price}</div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {service.duration}
                  </div>
                </div>

                {/* Deliverables */}
                <div className="space-y-3 mb-8">
                  {service.deliverables.map((deliverable, deliverableIndex) => (
                    <div key={deliverableIndex} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{deliverable}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    service.popular
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
                  }`}
                  onClick={(e) => scrollToSection("contact-section", e)}
                >
                  {language === "fr" ? "Choisir ce package" : "Choose this package"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {/* Stats */}
                <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>
                      {service.projects}+ {language === "fr" ? "projets" : "projects"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CheckCircle className="h-3 w-3" />
                    <span>100% {language === "fr" ? "satisfait" : "satisfied"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">{language === "fr" ? "Besoin d'un devis personnalisé ?" : "Need a custom quote?"}</h3>
            <p className="text-muted-foreground mb-6">
              {language === "fr"
                ? "Chaque projet est unique. Discutons de vos besoins spécifiques pour un devis sur mesure."
                : "Every project is unique. Let's discuss your specific needs for a tailored quote."}
            </p>
            <Button
              size="lg"
              onClick={(e) => scrollToSection("contact-section", e)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {language === "fr" ? "Demander un devis" : "Request a quote"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
