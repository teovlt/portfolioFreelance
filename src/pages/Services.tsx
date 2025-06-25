"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Server, Layers, ArrowRight, CheckCircle, Clock, Users, Paintbrush } from "lucide-react";
import { useTranslation } from "react-i18next";
import { scrollToSection } from "@/utils/scrollToSection";

export function Services() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      icon: Paintbrush,
      title: language === "fr" ? "Design personnalisé" : "Custom Design",
      description:
        language === "fr"
          ? "Création de maquettes modernes et cohérentes avec ton image. Idéal avant de passer au développement."
          : "Modern mockups that match your brand. Perfect before starting development.",
      price: language === "fr" ? "À partir de 400€" : "Starting from €400",
      duration: language === "fr" ? "1 à 2 semaines" : "1 to 2 weeks",
      deliverables: [
        language === "fr" ? "Maquettes visuelles (ex : Figma)" : "Visual mockups (e.g. Figma)",
        language === "fr" ? "Design mobile et ordinateur" : "Mobile & desktop design",
        language === "fr" ? "Couleurs & typographies pro" : "Professional colors & fonts",
        language === "fr" ? "Conseils personnalisés" : "Personalized advice",
      ],
      popular: false,
      projects: 5,
    },
    {
      icon: Code,
      title: language === "fr" ? "Site vitrine" : "Showcase Website",
      description:
        language === "fr"
          ? "Un site clair et rapide pour présenter ton activité ou projet (ex : restaurant, portfolio, artisan)"
          : "A clean and fast website to showcase your activity or project (e.g. restaurant, portfolio, craftsman)",
      price: language === "fr" ? "À partir de 600€" : "Starting from €600",
      duration: language === "fr" ? "1 à 2 semaines" : "1 to 2 weeks",
      deliverables: [
        language === "fr" ? "Site visible sur ordi & mobile" : "Mobile & desktop ready",
        language === "fr" ? "Pages rapides à charger" : "Fast loading pages",
        language === "fr" ? "Design moderne" : "Modern design",
        language === "fr" ? "Assistance 30 jours" : "30-day support",
      ],
      popular: true,
      projects: 12,
    },
    {
      icon: Server,
      title: language === "fr" ? "Site avec fonctionnalités" : "Website with Features",
      description:
        language === "fr"
          ? "Ajout de fonctionnalités : espace membre, formulaire de contact, réservation..."
          : "Add features like member area, contact form, booking...",
      price: language === "fr" ? "À partir de 1200€" : "Starting from €1200",
      duration: language === "fr" ? "2 à 5 semaines" : "2 to 5 weeks",
      deliverables: [
        language === "fr" ? "Espace personnel sécurisé" : "Secure personal space",
        language === "fr" ? "Formulaires simples à utiliser" : "Easy-to-use forms",
        language === "fr" ? "Connexion avec identifiants" : "Login system",
        language === "fr" ? "Hébergement en ligne inclus" : "Online hosting included",
      ],
      popular: false,
      projects: 6,
    },
    {
      icon: Layers,
      title: language === "fr" ? "Site complet" : "Complete Website",
      description:
        language === "fr"
          ? "Création d’un site avec plusieurs pages, fonctionnalités personnalisées, base de données, et tout ce qu’il faut"
          : "A complete website with multiple pages, custom features, database, and everything needed",
      price: language === "fr" ? "À partir de 2500€" : "Starting from €2500",
      duration: language === "fr" ? "4 à 8 semaines" : "4 to 8 weeks",
      deliverables: [
        language === "fr" ? "Site sur mesure" : "Custom website",
        language === "fr" ? "Fonctionnalités avancées" : "Advanced features",
        language === "fr" ? "Stockage des données" : "Data storage",
        language === "fr" ? "Assistance 60 jours" : "60-day support",
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
            {language === "fr" ? (
              <>
                Packages<span className="text-primary"> Professionnels</span>
              </>
            ) : (
              <>
                <span className="text-primary">Professional</span> Packages
              </>
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "fr"
              ? "Choisissez le package qui correspond à vos besoins avec des prix transparents"
              : "Choose the package that fits your needs with transparent pricing"}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 max-w-8xl mx-auto">
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
