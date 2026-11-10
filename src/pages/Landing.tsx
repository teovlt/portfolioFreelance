import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight, MapPin, MessageSquare, Rocket, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accent } from "@/components/customs/accent-text";
import { HeroSocialProof } from "@/components/customs/hero-social-proof";
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
  pages: { name: string; path: string; text: string }[];
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

// The same promises as the home page, repeated where the visitor decides
const reassurances = [
  { icon: MessageSquare, text: "Devis gratuit sous 24 h" },
  { icon: Rocket, text: "En ligne en 2 semaines" },
  { icon: UserRound, text: "Un seul interlocuteur" },
];

// A browser frame whose tabs are the pages of a typical site for the trade:
// shows what the client gets, page by page, rather than listing it
const SiteMockup = ({ pages }: { pages: LandingContent["pages"] }) => {
  const [active, setActive] = useState(0);
  const page = pages[active];
  if (!page) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
      <div role="tablist" aria-label="Pages du site" className="flex lg:flex-col gap-2 overflow-x-auto [scrollbar-width:none] -mx-4 px-4 lg:mx-0 lg:px-0 pb-1">
        {pages.map((p, i) => (
          <button
            key={p.name}
            role="tab"
            id={`site-tab-${i}`}
            aria-selected={i === active}
            aria-controls="site-panel"
            onClick={() => setActive(i)}
            className={`group flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold whitespace-nowrap transition-colors ${
              i === active ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"
            }`}
          >
            <span className="flex items-center gap-3">
              <span className={`font-serif italic ${i === active ? "opacity-70" : "text-muted-foreground"}`}>0{i + 1}</span>
              {p.name}
            </span>
            <ChevronRight className={`hidden lg:block h-4 w-4 transition-transform ${i === active ? "translate-x-0.5" : "opacity-40"}`} />
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-muted/50">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
          </span>
          <span className="flex-1 min-w-0 truncate rounded-md bg-background border border-border px-3 py-1 text-xs text-muted-foreground font-mono">
            votre-site.fr/{page.path}
          </span>
        </div>
        <div id="site-panel" role="tabpanel" aria-labelledby={`site-tab-${active}`} className="p-6 sm:p-10 min-h-[18rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={page.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <p className="eyebrow mb-3">{page.name}</p>
              <p className="text-xl sm:text-2xl font-display font-bold leading-snug mb-8 max-w-lg text-balance">{page.text}</p>
              {/* Wireframe of the page: suggests a layout without pretending to be a real site */}
              <div aria-hidden="true" className="grid grid-cols-3 gap-3">
                <div className="col-span-3 sm:col-span-2 h-24 rounded-lg bg-accent/40" />
                <div className="hidden sm:block h-24 rounded-lg bg-muted" />
                <div className="h-3 rounded-full bg-muted col-span-2" />
                <div className="h-3 rounded-full bg-muted" />
                <div className="h-3 rounded-full bg-muted" />
                <div className="h-3 rounded-full bg-muted col-span-2" />
                <div className="h-9 w-32 rounded-full bg-foreground/80 mt-2" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:grid xl:grid-cols-[1.15fr_0.85fr] xl:gap-12 xl:items-center">
          <motion.div className="max-w-4xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
              <Link to="/" className="hover:text-foreground transition-colors">
                Accueil
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span aria-current="page">Sites internet pour {page.trade.toLowerCase()}</span>
            </nav>
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
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-8 pt-6 border-t border-border text-sm text-muted-foreground">
              {reassurances.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-foreground" />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
          <HeroSocialProof />
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

      {page.pages.length > 0 && (
        <section className="py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...reveal} className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow mb-4">Un site type</p>
                <h2 className="text-4xl md:text-5xl max-w-2xl">
                  Page par <span className="font-serif italic font-medium">page</span>
                </h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Un point de départ : on l'adapte ensemble à votre activité.
              </p>
            </motion.div>
            <motion.div {...reveal}>
              <SiteMockup pages={page.pages} />
            </motion.div>
          </div>
        </section>
      )}

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
