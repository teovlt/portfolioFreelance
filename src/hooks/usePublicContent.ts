import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiRequest } from "@/lib/api";
import type { LocalizedText } from "@/types/project";

// Several sections read the same resource (contact info and socials show up in
// the hero, navbar, contact section and footer), so each path is fetched once
// per page load and shared.
const cache = new Map<string, Promise<unknown>>();

const load = <T>(path: string) => {
  if (!cache.has(path)) {
    const request = apiRequest<T>(path).catch((err) => {
      // Let a later mount retry instead of caching the failure
      cache.delete(path);
      throw err;
    });
    cache.set(path, request);
  }
  return cache.get(path) as Promise<T>;
};

export const usePublicContent = <T>(path: string, fallback: T) => {
  const [data, setData] = useState<T>(fallback);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    load<T>(path)
      .then((result) => active && setData(result ?? fallback))
      .catch(() => {})
      .finally(() => active && setIsLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return { data, isLoading };
};

// Picks the current language, falling back to the other one when it's empty
// (e.g. a review a visitor only wrote in French)
export const useLocalize = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "fr";
  return (text?: Partial<LocalizedText> | null) => (text ? text[lang] || text[lang === "fr" ? "en" : "fr"] || "" : "");
};
