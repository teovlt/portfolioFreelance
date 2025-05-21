import { Link } from "react-router-dom";
import { ThemeChanger } from "./ThemeChanger";
import { LanguageChanger } from "./LanguageChanger";
import { useTranslation } from "react-i18next";
import { Separator } from "../ui/separator";
import { Briefcase, Download, FileText, House, Info, Mail, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { scrollToSection } from "@/utils/scrollToSection";

export const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home-section");
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  // Navigation items array
  const navItems = [
    { id: "home-section", label: t("navbar.home"), icon: <House className="w-4 h-4" /> },
    { id: "about-section", label: t("navbar.about"), icon: <Info className="w-4 h-4" /> },
    { id: "services-section", label: t("navbar.services"), icon: <Briefcase className="w-4 h-4" /> },
    { id: "projects-section", label: t("navbar.projects"), icon: <FileText className="w-4 h-4" /> },
    { id: "contact-section", label: t("navbar.contact"), icon: <Mail className="w-4 h-4" /> },
  ];

  // Handle clicks outside of the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

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
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-200 ${
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Display only on screens larger than 'sm' */}
          <div className="hidden md:flex items-center justify-between select-none">
            <div className="font-extrabold text-3xl">
              <Link to="/" onClick={(e) => scrollToSection("home-section", e)}>
                VILLET
              </Link>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex gap-8 font-light">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`#${item.id}`}
                    onClick={(e) => scrollToSection(item.id, e)}
                    className={activeSection === item.id ? "text-primary" : "hover:text-primary"}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex gap-4 items-center justify-between">
                <LanguageChanger />
                <ThemeChanger />
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex gap-4 items-center justify-between">
                <Button asChild>
                  <a href="/documents/Portfolio.pdf" target="_blank" rel="noopener noreferrer" download className="w-full">
                    Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navbar with Hamburger Menu */}
          <div className="flex md:hidden justify-between items-center p-4">
            <div className="font-extrabold text-3xl">
              <Link to="/">VILLET</Link>
            </div>
            <Menu onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" />
          </div>
        </div>

        {/* Hamburger Menu Dropdown */}
        <div
          ref={menuRef}
          className={cn(
            "fixed top-0 right-0 w-4/5 h-screen overflow-hidden bg-background transition-transform duration-300 ease-in-out z-20",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex justify-end">
            <X onClick={() => setIsOpen(!isOpen)} className="m-4 cursor-pointer" />
          </div>

          <div className="flex flex-col gap-4 p-8 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={`#${item.id}`}
                onClick={(e) => scrollToSection(item.id, e)}
                className={`flex gap-4 items-center justify-start ${activeSection === item.id ? "text-primary" : "hover:text-primary"}`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <Separator />
            <div className="flex gap-4 justify-center items-center">
              <LanguageChanger />
              <ThemeChanger />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
