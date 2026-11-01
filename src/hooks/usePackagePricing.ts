import { useTranslation } from "react-i18next";
import { useLocalize, usePublicContent } from "@/hooks/usePublicContent";
import type { Package } from "@/types/content";

// Prices and durations quoted in the hero and FAQ, read from the packages so
// they follow whatever is set in the admin instead of being written in the copy
export const usePackagePricing = () => {
  const { i18n } = useTranslation();
  const fr = i18n.language !== "en";
  const localize = useLocalize();
  const { data: packages } = usePublicContent<Package[]>("/packages", []);

  const priceOf = (p: Package) => (p.pricing === "subscription" ? `${p.monthlyPrice}${fr ? "/mois" : "/month"}` : p.price);
  const withPrice = packages.filter((p) => priceOf(p));

  // The package highlighted on the pricing cards, else the first one
  const featured = withPrice.find((p) => p.popular) ?? withPrice[0];

  return {
    featured: featured && { title: localize(featured.title), price: priceOf(featured), duration: localize(featured.duration) },
    // "Site vitrine : dès 1 400€. Site complet : dès 5 500€."
    prices: withPrice.map((p) => `${localize(p.title)} : ${fr ? "dès" : "from"} ${priceOf(p)}.`).join(" "),
    durations: packages
      .filter((p) => localize(p.duration))
      .map((p) => `${localize(p.title)} : ${localize(p.duration)}.`)
      .join(" "),
  };
};
