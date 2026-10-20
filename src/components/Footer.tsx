"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { scrollToSection } from "@/utils/scrollToSection";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  const navItems = [
    { label: t("footer.nav.home"), sectionId: "home-section" },
    { label: t("footer.nav.about"), sectionId: "about-section" },
    { label: t("footer.nav.experiences"), sectionId: "experiences-section" },
    { label: t("footer.nav.services"), sectionId: "services-section" },
    { label: t("footer.nav.projects"), sectionId: "projects-section" },
    { label: t("footer.nav.contact"), sectionId: "contact-section" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-foreground text-background overflow-hidden grain">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <p className="eyebrow text-background/50 mb-5">{t("footer.brand.eyebrow")}</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight max-w-xl">
              {t("footer.brand.titleStart")}{" "}
              <span className="font-serif italic font-medium text-accent">{t("footer.brand.titleHighlight")}</span>
            </h2>
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-background text-foreground hover:bg-background/90 flex-shrink-0 w-fit"
            onClick={(e) => scrollToSection("contact-section", e)}
          >
            <a href="#contact-section" onClick={(e) => scrollToSection("contact-section", e)}>
              {t("footer.cta")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <Link
          to="mailto:teo.villet2@gmail.com"
          className="inline-block font-serif italic text-2xl sm:text-3xl text-background/90 border-b border-background/30 hover:border-background transition-colors"
        >
          teo.villet2@gmail.com
        </Link>

        <Separator className="bg-background/15" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-background/50 order-3 md:order-1">
            © {currentYear} Téo Villet. {t("footer.rights")}
          </p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 order-1 md:order-2 text-sm">
            {navItems.map(({ label, sectionId }) => (
              <Link
                key={sectionId}
                to={`#${sectionId}`}
                className="text-background/60 hover:text-background transition-colors"
                onClick={(e) => scrollToSection(sectionId, e)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1 order-2 md:order-3">
            <Button variant="ghost" size="icon" asChild aria-label="GitHub" className="text-background hover:bg-background/10 hover:text-background">
              <Link to="https://github.com/teovlt" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              aria-label="LinkedIn"
              className="text-background hover:bg-background/10 hover:text-background"
            >
              <Link to="https://www.linkedin.com/in/teo-villet/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label="Email" className="text-background hover:bg-background/10 hover:text-background">
              <Link to="mailto:teo.villet2@gmail.com">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
