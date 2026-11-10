import { useEffect, type ComponentType } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { usePublicContent } from "@/hooks/usePublicContent";
import { Services } from "@/pages/Services";
import { Projects } from "@/pages/Projects";
import { Process } from "@/pages/Process";
import { Contact } from "@/pages/Contact";
import NotFound from "@/pages/ErrorPage";
import { FaqSection, OthersSection, ReviewsSection, type LandingContent, type Theme, type TradeProps } from "@/pages/landing/shared";
import { Restaurant } from "@/pages/landing/restaurant";
import { Gite } from "@/pages/landing/gite";
import { Artisan } from "@/pages/landing/artisan";
import { Commerce } from "@/pages/landing/commerce";
import { Independant } from "@/pages/landing/independant";

// Each trade has its own page top (hero, problems, features, site mock-up),
// laid out like the sites a specialist of that trade would make, and its own
// colors (.trade-* in index.css). The rest (pricing, projects, process, FAQ,
// contact) is shared.
const trades: Record<Theme, ComponentType<TradeProps>> = {
  restaurant: Restaurant,
  gite: Gite,
  artisan: Artisan,
  commerce: Commerce,
  independant: Independant,
};

// Only paths shaped like the trade pages reach the API; anything else is a
// plain not-found page. Keyed by slug: going from one trade page to another
// starts over instead of showing the previous page until the next one loads
export const Landing = () => {
  const { landingSlug = "" } = useParams();
  return landingSlug.startsWith("site-internet-") ? <LandingPage key={landingSlug} slug={landingSlug} /> : <NotFound />;
};

const LandingPage = ({ slug }: { slug: string }) => {
  const { data: page, isLoading } = usePublicContent<LandingContent | null>(`/landings/${slug}`, null);
  const theme = page?.theme && page.theme in trades ? page.theme : undefined;

  useEffect(() => {
    if (!theme) return;
    const className = `trade-${theme}`;
    document.documentElement.classList.add(className);
    return () => document.documentElement.classList.remove(className);
  }, [theme]);

  // Keeps the page's height while loading so the footer doesn't jump up
  if (isLoading) return <section className="min-h-screen" aria-busy="true" />;
  if (!page) return <NotFound />;

  // The API's answer is cached for an hour: one from before themes existed,
  // or with a theme this front doesn't know, gets the freelancer layout in
  // the site's own colors
  const Trade = trades[theme ?? "independant"];

  return (
    <>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(page.structuredData)}</script>
      </Helmet>

      <Trade page={page} />
      <ReviewsSection />
      <Services />
      <Projects />
      <Process />
      <FaqSection faqs={page.faqs} />
      <Contact />
      <OthersSection others={page.others} />
    </>
  );
};
