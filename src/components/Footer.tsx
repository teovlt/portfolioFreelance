"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { scrollToSection } from "@/utils/scrollToSection";

export function Footer() {
  const navItems = [
    { label: "Home", sectionId: "home-section" },
    { label: "About", sectionId: "about-section" },
    { label: "Experiences", sectionId: "experiences-section" },
    { label: "Services", sectionId: "services-section" },
    { label: "Skills", sectionId: "skills-section" },
    { label: "Projects", sectionId: "projects-section" },
    { label: "Contact", sectionId: "contact-section" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 py-12 flex items-center justify-center">
      <div className="container space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex-col text-center md:text-left px-4">
            <Link to="/" className="font-bold text-xl">
              <span className="text-primary">Dev</span>Portfolio
            </Link>
            <p className="text-muted-foreground mt-2 text-sm">Fullstack developer crafting beautiful and functional web experiences.</p>
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
            <p className="text-sm text-muted-foreground">© {currentYear} Téo Villet. All rights reserved.</p>
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
