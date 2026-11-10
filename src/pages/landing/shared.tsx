import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronRight, MessageSquare, Rocket, UserRound, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSocialProof } from "@/components/customs/hero-social-proof";
import { openContactTab } from "@/utils/contactTab";
import { scrollToSection } from "@/utils/scrollToSection";
import { cn } from "@/lib/utils";
import { usePublicContent } from "@/hooks/usePublicContent";
import type { Review } from "@/types/content";

// Written server side (server/src/content/landings.ts), which also uses it
// for the meta tags, the crawler snapshot and the sitemap
export type Theme = "restaurant" | "gite" | "artisan" | "commerce" | "independant";

export type LandingContent = {
  slug: string;
  trade: string;
  theme: Theme;
  example?: { name: string; url: string; text: string };
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

export type TradeProps = { page: LandingContent };

export const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

// Content is written without icons; each trade picks its own, by position.
// Past the end of the list (content grew), the trade's fallback icon is used
export const iconAt = (icons: LucideIcon[], i: number, fallback: LucideIcon) => icons[i] ?? fallback;

export const Container = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)}>{children}</div>
);

export const Breadcrumb = ({ trade, className }: { trade: string; className?: string }) => (
  <nav aria-label="Fil d'Ariane" className={cn("flex items-center gap-1.5 text-xs text-muted-foreground", className)}>
    <Link to="/" className="hover:text-foreground transition-colors">
      Accueil
    </Link>
    <ChevronRight className="h-3 w-3" />
    <span aria-current="page">Sites internet pour {trade.toLowerCase()}</span>
  </nav>
);

export const CtaButtons = ({ label = "Réserver un appel gratuit", className }: { label?: string; className?: string }) => (
  <div className={cn("flex flex-wrap items-center gap-4", className)}>
    <Button size="lg" onClick={(e) => openContactTab("booking", e)} className="group">
      {label}
      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </Button>
    <Button variant="outline" size="lg" onClick={(e) => scrollToSection("services-section", e)}>
      Voir les tarifs
    </Button>
  </div>
);

// The same promises as the home page, repeated where the visitor decides
const reassurances = [
  { icon: MessageSquare, text: "Devis gratuit sous 24 h" },
  { icon: Rocket, text: "En ligne en 2 semaines" },
  { icon: UserRound, text: "Un seul interlocuteur" },
];

export const Reassurances = ({ className }: { className?: string }) => (
  <ul className={cn("flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground", className)}>
    {reassurances.map(({ icon: Icon, text }) => (
      <li key={text} className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-foreground" />
        {text}
      </li>
    ))}
  </ul>
);

export const SectionHeading = ({
  eyebrow,
  children,
  className,
  aside,
  center,
  headingClassName,
}: {
  eyebrow: string;
  headingClassName?: string;
  children: ReactNode;
  className?: string;
  aside?: ReactNode;
  center?: boolean;
}) => (
  <motion.div
    {...reveal}
    className={cn("mb-12 flex flex-wrap gap-6", center ? "flex-col items-center text-center" : "items-end justify-between", className)}
  >
    <div className={cn(center && "flex flex-col items-center")}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className={cn("text-4xl md:text-5xl max-w-2xl text-balance", headingClassName)}>{children}</h2>
    </div>
    {aside}
  </motion.div>
);

// A browser frame whose tabs are the pages of a typical site for the trade:
// shows what the client gets, page by page, rather than listing it
export const SiteMockup = ({
  pages,
  domain,
  icon: Icon,
  wireframe,
}: {
  pages: LandingContent["pages"];
  domain: string;
  icon: LucideIcon;
  // The trade's own sketch of a page, so the mock-up looks like its sites
  wireframe?: ReactNode;
}) => {
  const [active, setActive] = useState(0);
  const page = pages[active];
  if (!page) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
      <div
        role="tablist"
        aria-label="Pages du site"
        className="flex lg:flex-col gap-2 overflow-x-auto [scrollbar-width:none] -mx-4 px-4 lg:mx-0 lg:px-0 pb-1"
      >
        {pages.map((p, i) => (
          <button
            key={p.name}
            role="tab"
            id={`site-tab-${i}`}
            aria-selected={i === active}
            aria-controls="site-panel"
            onClick={() => setActive(i)}
            className={cn(
              "group flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm font-semibold whitespace-nowrap transition-colors",
              i === active ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted",
            )}
          >
            <span className="flex items-center gap-3">
              <span className={cn("font-serif italic", i === active ? "opacity-70" : "text-muted-foreground")}>0{i + 1}</span>
              {p.name}
            </span>
            <ChevronRight className={cn("hidden lg:block h-4 w-4 transition-transform", i === active ? "translate-x-0.5" : "opacity-40")} />
          </button>
        ))}
      </div>

      <div className="rounded-[calc(var(--radius)+0.5rem)] border border-border bg-card shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-muted/50">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
          </span>
          <span className="flex flex-1 min-w-0 items-center gap-2 rounded-md bg-background border border-border px-3 py-1 text-xs text-muted-foreground font-mono">
            <Icon className="h-3 w-3 flex-shrink-0 text-primary" />
            <span className="truncate">
              {domain}/{page.path}
            </span>
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
              {/* Sketch of the page: suggests a layout without pretending to be a real site */}
              <div aria-hidden="true">{wireframe ?? <DefaultWireframe />}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const DefaultWireframe = () => (
  <div className="grid grid-cols-3 gap-3">
    <div className="col-span-3 sm:col-span-2 h-24 rounded-lg bg-accent/40" />
    <div className="hidden sm:block h-24 rounded-lg bg-muted" />
    <div className="h-3 rounded-full bg-muted col-span-2" />
    <div className="h-3 rounded-full bg-muted" />
    <div className="h-9 w-32 rounded-full bg-primary mt-2" />
  </div>
);

export const MockupSection = (
  props: Parameters<typeof SiteMockup>[0] & { eyebrow?: string; title?: ReactNode; headingClassName?: string },
) =>
  props.pages.length > 0 ? (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={props.eyebrow ?? "Un site type"}
          headingClassName={props.headingClassName}
          aside={<p className="text-sm text-muted-foreground max-w-xs">Un point de départ : on l'adapte ensemble à votre activité.</p>}
        >
          {props.title ?? (
            <>
              Page par <span className="font-serif italic font-medium">page</span>
            </>
          )}
        </SectionHeading>
        <motion.div {...reveal}>
          <SiteMockup {...props} />
        </motion.div>
      </Container>
    </section>
  ) : null;

export const ExampleCard = ({ example }: { example: NonNullable<LandingContent["example"]> }) => (
  <motion.a
    {...reveal}
    href={example.url}
    target="_blank"
    rel="noopener"
    className="group relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center overflow-hidden rounded-[calc(var(--radius)+0.5rem)] bg-primary text-primary-foreground p-8 sm:p-12"
  >
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70 mb-4">Un exemple en ligne</p>
      <h2 className="text-3xl md:text-4xl mb-4">{example.name}</h2>
      <p className="max-w-2xl opacity-85 leading-relaxed">{example.text}</p>
    </div>
    <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground text-primary px-6 py-3 text-sm font-semibold w-fit">
      Voir le site
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </span>
  </motion.a>
);

// Reviews from the home page, given room of their own since the trade
// heroes show the trade's sites instead. Hidden while there are none
export const ReviewsSection = () => {
  const { data: reviews } = usePublicContent<Review[]>("/reviews", []);
  if (reviews.length === 0) return null;
  return (
    <section className="py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <motion.div {...reveal}>
          <p className="eyebrow mb-4">Avis clients</p>
          <h2 className="text-4xl md:text-5xl">
            Ils m'ont fait <span className="font-serif italic font-medium">confiance</span>
          </h2>
        </motion.div>
        <div className="max-w-xl">
          <HeroSocialProof />
        </div>
      </Container>
    </section>
  );
};

export const FaqSection = ({ faqs }: { faqs: LandingContent["faqs"] }) => (
  <section className="py-24 sm:py-32">
    <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
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
        {faqs.map(({ q, a }) => (
          <div key={q} className="py-6">
            <dt className="text-lg font-display font-bold mb-2">{q}</dt>
            <dd className="text-muted-foreground leading-relaxed">{a}</dd>
          </div>
        ))}
      </dl>
    </Container>
  </section>
);

export const OthersSection = ({ others }: { others: LandingContent["others"] }) =>
  others.length > 0 ? (
    <section className="pb-24">
      <Container>
        <p className="eyebrow mb-4">Vous êtes plutôt…</p>
        <div className="flex flex-wrap gap-3">
          {others.map((other) => (
            <Link
              key={other.slug}
              to={`/${other.slug}`}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
            >
              Site internet pour {other.trade.toLowerCase()}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  ) : null;
