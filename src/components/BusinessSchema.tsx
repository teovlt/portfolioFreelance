import { Helmet } from "react-helmet-async";
import { usePublicContent } from "@/hooks/usePublicContent";
import type { ContactInfo, Package } from "@/types/content";

const BUSINESS_ID = "https://www.teovillet.fr/#business";

// "1 400€", "à partir de 950 €" -> 1400, 950. Null when there's no number
const toAmount = (price: string) => {
  const digits = price.replace(/[^\d]/g, "");
  return digits ? Number(digits) : null;
};

// Completes the business described in index.html (same @id, so Google merges
// the two) with what's edited in the admin: phone, email and the plans with
// their starting price. Kept out of index.html so it never goes stale.
export const BusinessSchema = () => {
  const { data: info } = usePublicContent<ContactInfo | null>("/contact", null);
  const { data: packages } = usePublicContent<Package[]>("/packages", []);

  const offers = packages
    .map((p) => ({ name: p.title.fr || p.title.en, description: p.description.fr || p.description.en, amount: toAmount(p.price) }))
    .filter((p) => p.name && p.amount)
    .map(({ name, description, amount }) => ({
      "@type": "Offer",
      priceCurrency: "EUR",
      price: amount,
      priceSpecification: { "@type": "PriceSpecification", minPrice: amount, priceCurrency: "EUR" },
      itemOffered: { "@type": "Service", name, description },
    }));

  if (!info && offers.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    ...(info?.phone && { telephone: info.phone }),
    ...(info?.email && { email: info.email }),
    ...(offers.length > 0 && { makesOffer: offers }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};
