import { Link } from "react-router-dom";
import { ThemeChanger } from "./ThemeChanger";
import { LanguageChanger } from "./LanguageChanger";
import { useTranslation } from "react-i18next";
import { Separator } from "../ui/separator";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

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

  return (
    <>
      {/* Display only on screens larger than 'sm' */}
      <div className="hidden sm:flex items-center justify-between p-4 text-primary px-8 select-none">
        <div className="font-extrabold text-3xl">
          <Link to="/">VILLET</Link>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-4">
            <Link to="/about">{t("navbar.about")}</Link>
            <Link to="/services">{t("navbar.services")}</Link>
            <Link to="/projects">{t("navbar.projects")}</Link>
            <Link to="/contact">{t("navbar.contact")}</Link>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex gap-4 items-center justify-between">
            <LanguageChanger />
            <ThemeChanger />
          </div>
        </div>
      </div>

      {/* Mobile Navbar with Hamburger Menu */}
      <div className="flex sm:hidden justify-between items-center p-4">
        <div className="font-extrabold text-3xl">
          <Link to="/">VILLET</Link>
        </div>
        <Menu onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" />
      </div>

      {/* Hamburger Menu Dropdown */}
      <div
        ref={menuRef}
        className={cn(
          "fixed top-0 right-0 w-4/5 h-screen overflow-hidden dark:bg-black bg-white text-primary transition-transform duration-300 ease-in-out z-20",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <X onClick={() => setIsOpen(!isOpen)} className="m-4 cursor-pointer" />

        <div className="flex flex-col items-center gap-4">
          <Link to="/about" onClick={() => setIsOpen(false)}>
            {t("navbar.about")}
          </Link>
          <Link to="/services" onClick={() => setIsOpen(false)}>
            {t("navbar.services")}
          </Link>
          <Link to="/projects" onClick={() => setIsOpen(false)}>
            {t("navbar.projects")}
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            {t("navbar.contact")}
          </Link>
          <div className="flex gap-4 mt-4">
            <LanguageChanger />
            <ThemeChanger />
          </div>
        </div>
      </div>
    </>
  );
};
