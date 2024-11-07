import { Link } from "react-router-dom";
import { ThemeChanger } from "./ThemeChanger";
import { LanguageChanger } from "./LanguageChanger";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between p-4 text-primary px-8 select-none">
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
        |
        <div className="flex gap-4 items-center justify-between">
          <LanguageChanger />
          <ThemeChanger />
        </div>
      </div>
    </div>
  );
};
