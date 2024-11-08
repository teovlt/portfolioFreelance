import { Link } from "react-router-dom";
import { ThemeChanger } from "./ThemeChanger";
import { LanguageChanger } from "./LanguageChanger";
import { useTranslation } from "react-i18next";
import { Separator } from "../ui/separator";
import { CircleX, Cross, CrossIcon, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

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
        className={cn(
          "fixed top-0 left-0 w-full h-screen overflow-hidden7 dark:bg-black bg-white text-primary transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-full" : "translate-x-0",
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
