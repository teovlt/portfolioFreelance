"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
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
    { label: t("footer.nav.projects"), sectionId: "projects-section" },
    { label: t("footer.nav.services"), sectionId: "services-section" },
    { label: t("footer.nav.reviews"), sectionId: "reviews-section" },
    { label: t("footer.nav.contact"), sectionId: "contact-section" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 py-4 md:py-12 flex items-center justify-center">
      <div className="container space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex-col text-center md:text-left px-4">
            <Link to="/" className="font-bold text-xl">
              <span className="text-primary">{t("footer.brand.primary")} </span>
              {t("footer.brand.secondary")}
            </Link>
            <p className="text-muted-foreground mt-2 text-sm">{t("footer.tagline")}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild aria-label="GitHub">
              <Link to="https://github.com/teovlt" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label="LinkedIn">
              <Link to="https://www.linkedin.com/in/teo-villet/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label="Email">
              <Link to="mailto:teo.villet2@gmail.com">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 sm:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Téo Villet. {t("footer.rights")}
            </p>
          </div>
          <nav className="hidden sm:flex gap-6">
            {navItems.map(({ label, sectionId }) => (
              <Link
                key={sectionId}
                to={`#${sectionId}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => scrollToSection(sectionId, e)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
