import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accent } from "@/components/customs/accent-text";
import { usePublicContent } from "@/hooks/usePublicContent";
import { openContactTab } from "@/utils/contactTab";
import { scrollToSection } from "@/utils/scrollToSection";
import { Services } from "@/pages/Services";
import { Projects } from "@/pages/Projects";
import { Process } from "@/pages/Process";
import { Contact } from "@/pages/Contact";
import NotFound from "@/pages/ErrorPage";

// Written server side (server/src/content/landings.ts), which also uses it
// for the meta tags, the crawler snapshot and the sitemap
type LandingContent = {
  slug: string;
  trade: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  titleStart: string;
  titleHighlight: string;
  intro: string;
  pains: { title: string; text: string }[];
  features: string[];
  faqs: { q: string; a: string }[];
  area: string;
  structuredData: object;
  others: { slug: string; trade: string }[];
};

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
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

  // Keeps the page's height while loading so the footer doesn't jump up
  if (isLoading) return <section className="min-h-screen" aria-busy="true" />;
  if (!page) return <NotFound />;

  return (
    <>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(page.structuredData)}</script>
      </Helmet>

      <section id="home-section" className="relative pt-32 pb-20 sm:pb-24 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[640px] h-[640px] rounded-full pointer-events-none -z-10 opacity-60 dark:opacity-30"
          style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.25), transparent 70%)" }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-4xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow mb-5">{page.eyebrow}</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-6 text-balance">
              {page.titleStart} <Accent className="font-serif italic font-medium">{page.titleHighlight}</Accent>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">{page.intro}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" onClick={(e) => openContactTab("booking", e)} className="group">
                Réserver un appel gratuit
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={(e) => scrollToSection("services-section", e)}>
                Voir les tarifs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="mb-12">
            <p className="eyebrow mb-4">Le constat</p>
            <h2 className="text-4xl md:text-5xl max-w-2xl">
              Ce qui vous <span className="font-serif italic font-medium">freine</span> aujourd'hui
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {page.pains.map((pain, i) => (
              <motion.article
                key={pain.title}
                {...reveal}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <span className="font-serif italic text-3xl text-accent-foreground">0{i + 1}</span>
                <h3 className="text-xl font-display font-bold mt-3 mb-3">{pain.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pain.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div {...reveal}>
            <p className="eyebrow mb-4">Votre site</p>
            <h2 className="text-4xl md:text-5xl mb-6">
              Ce qu'il <span className="font-serif italic font-medium">contient</span>
            </h2>
            <p className="flex items-start gap-2 text-muted-foreground max-w-sm leading-relaxed">
              <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
              {page.area}
            </p>
          </motion.div>
          <motion.ul {...reveal} className="grid gap-4 sm:grid-cols-2">
            {page.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 rounded-xl border border-border p-4 text-sm leading-relaxed">
                <Check className="h-4 w-4 mt-0.5 text-accent-foreground flex-shrink-0" />
                {feature}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      <Services />
      <Projects />
      <Process />

      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div {...reveal} className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl mb-4">
              Vos <span className="font-serif italic font-medium">questions</span>
            </h2>
            <a
              href="#contact-section"
              onClick={(e) => openContactTab("message", e)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 hover:text-accent-foreground transition-colors"
            >
              Posez-moi la vôtre
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
          {/* Always open: few questions, and every answer is worth reading */}
          <dl className="divide-y divide-border border-y border-border">
            {page.faqs.map(({ q, a }) => (
              <div key={q} className="py-6">
                <dt className="text-lg font-display font-bold mb-2">{q}</dt>
                <dd className="text-muted-foreground leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Contact />

      {page.others.length > 0 && (
        <section className="pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow mb-4">Vous êtes plutôt…</p>
            <div className="flex flex-wrap gap-3">
              {page.others.map((other) => (
                <Link
                  key={other.slug}
                  to={`/${other.slug}`}
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
                >
                  Site internet pour {other.trade.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
