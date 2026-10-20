import { Link } from "react-router-dom";
import { ThemeChanger } from "./ThemeChanger";
import { LanguageChanger } from "./LanguageChanger";
import { useTranslation } from "react-i18next";
import { Separator } from "./ui/separator";
import { Briefcase, FileText, House, Info, Mail, Menu, Palette, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { scrollToSection } from "@/utils/scrollToSection";

export const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home-section");
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  const navItems = [
    { id: "home-section", label: t("navbar.home"), icon: <House className="w-4 h-4" /> },
    { id: "about-section", label: t("navbar.about"), icon: <Info className="w-4 h-4" /> },
    { id: "experiences-section", label: t("navbar.experiences"), icon: <Briefcase className="w-4 h-4" /> },
    { id: "services-section", label: t("navbar.services"), icon: <Palette className="w-4 h-4" /> },
    { id: "projects-section", label: t("navbar.projects"), icon: <FileText className="w-4 h-4" /> },
    { id: "contact-section", label: t("navbar.contact"), icon: <Mail className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.id);
      let currentSection = "home-section";

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 w-full z-50 transition-all duration-200 py-4 sm:py-5">
        <div className="container mx-auto px-4">
          {/* Desktop */}
          <div
            className={cn(
              "hidden lg:flex items-center justify-between select-none rounded-full pl-5 pr-2 py-2 transition-all duration-200 border",
              isScrolled ? "bg-card/90 backdrop-blur-md shadow-sm border-border" : "bg-card border-transparent",
            )}
          >
            <Link
              to="/"
              onClick={(e) => scrollToSection("home-section", e)}
              className="flex items-center gap-2 font-display font-bold text-base tracking-tight"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">TV</span>
              Téo Villet
            </Link>
            <div className="flex gap-5 items-center">
              <div className="flex gap-6 text-sm font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`#${item.id}`}
                    onClick={(e) => scrollToSection(item.id, e)}
                    className={cn(
                      "relative py-1 transition-colors",
                      activeSection === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    {activeSection === item.id && <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-accent rounded-full" />}
                  </Link>
                ))}
              </div>
              <Separator orientation="vertical" className="h-5" />
              <div className="flex gap-1.5 items-center">
                <LanguageChanger />
                <ThemeChanger />
              </div>
              <Button size="sm" className="rounded-full" onClick={(e) => scrollToSection("contact-section", e)}>
                {t("navbar.contactCta")}
              </Button>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden justify-between items-center p-2 rounded-full bg-card border border-border shadow-sm px-5">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg tracking-tight">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">TV</span>
              Téo Villet
            </Link>
            <Menu onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" />
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={menuRef}
          className={cn(
            "fixed top-0 right-0 w-4/5 h-screen overflow-hidden bg-background border-l border-border transition-transform duration-300 ease-in-out z-20",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex justify-end">
            <X onClick={() => setIsOpen(!isOpen)} className="m-4 cursor-pointer" />
          </div>

          <div className="flex flex-col gap-8 p-8 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={`#${item.id}`}
                onClick={(e) => {
                  scrollToSection(item.id, e), setIsOpen(false);
                }}
                className={cn(
                  "flex gap-4 items-center justify-start font-medium",
                  activeSection === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <Separator />
            <div className="flex gap-8 justify-center items-center">
              <LanguageChanger />
              <ThemeChanger />
            </div>
            <Separator />
            <div className="flex justify-center items-center">
              <Button
                className="w-full"
                onClick={(e) => {
                  scrollToSection("contact-section", e);
                  setIsOpen(false);
                }}
              >
                {t("navbar.contactCta")}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
