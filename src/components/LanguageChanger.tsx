import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { useState } from "react";
import { FlagFR, FlagGB } from "./Flags";
import { toast } from "sonner";

export const LanguageChanger = () => {
  const {
    i18n: { changeLanguage, language },
    t,
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "fr" ? "en" : "fr";
    localStorage.setItem("i18nextLng", newLanguage);
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
    toast.success(t("navbar.languageChanged"));
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleChangeLanguage}
      aria-label={currentLanguage === "fr" ? "Switch to English" : "Passer en français"}
    >
      <FlagFR
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
          currentLanguage === "fr" ? "rotate-0 scale-100" : "rotate-90 scale-0"
        }`}
      />
      <FlagGB
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
          currentLanguage === "en" ? "rotate-0 scale-100" : "rotate-90 scale-0"
        }`}
      />
    </Button>
  );
};
