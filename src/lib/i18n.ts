import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as en from "../locales/en.json";
import * as fr from "../locales/fr.json";

i18n
  .use(initReactI18next)
  .init({ resources: { en: { translation: en }, fr: { translation: fr } }, lng: localStorage.getItem("i18nextLng") || "fr" });

// Screen readers pick their voice from <html lang>: without this, English
// text would be read with French pronunciation
const syncHtmlLang = (lng: string) => document.documentElement.setAttribute("lang", lng === "en" ? "en" : "fr-FR");
syncHtmlLang(i18n.language);
i18n.on("languageChanged", syncHtmlLang);

export const listOfLocales = ["en", "fr"];

export const getFullNamesOfLocales = (locale: string) => {
  switch (locale) {
    case "en":
      return "English";
    case "fr":
      return "Français";
    default:
      return "";
  }
};
