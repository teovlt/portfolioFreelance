import { useTranslation } from "react-i18next";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useState } from "react";
import { getFullNamesOfLocales, listOfLocales } from "@/lib/i18n";
import { Button } from "../ui/button";

export const LanguageChanger = () => {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const locales = listOfLocales;

  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = (locale: string) => {
    const newLanguage = locale;
    localStorage.setItem("i18nextLng", newLanguage);
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="sm">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {locales.map((locale) => (
          <DropdownMenuItem
            textValue={locale}
            key={locale}
            onClick={() => handleChangeLanguage(locale)}
            className={`flex  ${locale === currentLanguage ? "bg-gray-200" : ""}`}
          >
            <img src={`../../assets/flags/${locale}.svg`} className="w-6 h-6" alt={`${locale} flag`} />
            {getFullNamesOfLocales(locale)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
