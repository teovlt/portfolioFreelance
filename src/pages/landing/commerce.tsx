import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  Clock,
  EyeOff,
  MapPin,
  PackageCheck,
  Search,
  Share2,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  type LucideIcon,
} from "lucide-react";
import { Accent } from "@/components/customs/accent-text";
import { cn } from "@/lib/utils";
import { Breadcrumb, Container, CtaButtons, MockupSection, Reassurances, iconAt, reveal, type TradeProps } from "./shared";
import { Product, commerceScreens, type ProductKind } from "./commerce-sites";

// A local shop's site: round, cheerful, a shopfront with its striped awning
// in the hero, problems on price tags, features on shelves of uneven sizes

const painIcons: LucideIcon[] = [EyeOff, Clock, Smartphone];
const featureIcons: LucideIcon[] = [ShoppingBag, CalendarClock, MapPin, PackageCheck, Share2, Smartphone, Search];

// Stripes in the page's colors, scalloped at the bottom like a shop awning
const Awning = () => (
  <div aria-hidden="true" className="relative h-14">
    <div
      className="absolute inset-0"
      style={{ backgroundImage: "repeating-linear-gradient(90deg, hsl(var(--primary)) 0 36px, hsl(var(--card)) 36px 72px)" }}
    />
    <div
      className="absolute inset-x-0 -bottom-3 h-6"
      style={{
        backgroundImage: "radial-gradient(circle at 18px 0, hsl(var(--primary)) 17px, transparent 18px)",
        backgroundSize: "36px 24px",
      }}
    />
  </div>
);

const products: { name: string; kind: ProductKind; sticker?: boolean }[] = [
  { name: "Nouveautés", kind: "cheese", sticker: true },
  { name: "Coups de cœur", kind: "honey" },
  { name: "Idées cadeaux", kind: "chocolate" },
  { name: "Le local", kind: "wine" },
];

const Hero = ({ page }: TradeProps) => (
  <section id="landing-hero" className="relative pt-32 pb-20 sm:pb-24 overflow-hidden">
    <Container className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Breadcrumb trade={page.trade} className="mb-8" />
        <p className="inline-flex items-center gap-2 mb-6 rounded-full bg-accent/50 px-4 py-1.5 text-sm font-semibold text-accent-foreground">
          <Store className="h-4 w-4" />
          {page.eyebrow}
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold leading-[1.02] tracking-tight mb-6 text-balance">
          {page.titleStart} <Accent className="font-serif italic font-medium">{page.titleHighlight}</Accent>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">{page.intro}</p>
        <CtaButtons />
        <Reassurances className="mt-8" />
      </motion.div>

      {/* The shop's own homepage: open sign, hours, shelves */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 30, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="overflow-hidden rounded-[calc(var(--radius)+0.5rem)] border border-border bg-card shadow-xl"
      >
        <Awning />
        <div className="p-6 sm:p-8 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <p className="font-serif italic text-2xl">La boutique du coin</p>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Ouvert · jusqu'à 19 h
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.map(({ name, kind, sticker }) => (
              <div key={name} className="relative aspect-[4/3] rounded-[var(--radius)]">
                <div className="absolute inset-0 overflow-hidden rounded-[var(--radius)]">
                  <Product kind={kind} />
                </div>
                <span className="absolute left-2 bottom-2 rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold">{name}</span>
                {sticker && (
                  <span className="absolute -top-2 -right-2 rotate-12 rounded-full bg-primary text-primary-foreground px-2.5 py-1 text-[10px] font-bold uppercase">
                    Arrivage
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Container>
  </section>
);

// Each problem hangs on a price tag, slightly askew
const tilts = ["-rotate-2", "rotate-1", "-rotate-1"];

const Pains = ({ page }: TradeProps) => (
  <section className="py-20 sm:py-24 bg-accent/25">
    <Container>
      <motion.div {...reveal} className="text-center mb-14">
        <p className="eyebrow mb-4">Le constat</p>
        <h2 className="text-4xl md:text-5xl font-display font-extrabold">
          Ce qui laisse votre porte <span className="font-serif italic font-medium">fermée</span>
        </h2>
      </motion.div>
      <div className="grid gap-8 md:grid-cols-3">
        {page.pains.map((pain, i) => {
          const Icon = iconAt(painIcons, i, Store);
          return (
            <motion.article
              key={pain.title}
              {...reveal}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn("relative rounded-[var(--radius)] rounded-tl-[3rem] bg-card p-7 pt-12 shadow-md", tilts[i % tilts.length])}
            >
              {/* The tag's hole */}
              <span aria-hidden="true" className="absolute left-6 top-6 h-4 w-4 rounded-full border-2 border-border bg-accent/25" />
              <Icon className="absolute right-6 top-6 h-6 w-6 text-primary" />
              <h3 className="text-xl font-display font-extrabold mb-3">{pain.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pain.text}</p>
            </motion.article>
          );
        })}
      </div>
    </Container>
  </section>
);

// Shelves: a bento grid where the first item takes two cells, so the seven
// features fill two full rows of four
const wide = [0];

const Features = ({ page }: TradeProps) => (
  <section className="py-20 sm:py-24">
    <Container>
      <motion.div {...reveal} className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="eyebrow mb-4">Votre site</p>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold">
            Tous les <span className="font-serif italic font-medium">rayons</span>
          </h2>
        </div>
        <p className="text-muted-foreground leading-relaxed lg:max-w-md lg:justify-self-end">{page.area}</p>
      </motion.div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {page.features.map((feature, i) => {
          const Icon = iconAt(featureIcons, i, Sparkles);
          const isWide = wide.includes(i);
          return (
            <motion.li
              key={feature}
              {...reveal}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              className={cn(
                "flex flex-col justify-between gap-8 rounded-[calc(var(--radius)+0.25rem)] p-6",
                isWide ? "lg:col-span-2 bg-primary text-primary-foreground" : "bg-card border border-border",
              )}
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full",
                  isWide ? "bg-primary-foreground/15" : "bg-accent/50 text-accent-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <p className={cn("font-semibold leading-snug", isWide && "text-xl font-display")}>{feature}</p>
            </motion.li>
          );
        })}
      </ul>
    </Container>
  </section>
);

// The demo shop, browsable screen by screen. It is a fictional business, and
// the banner says so up front: an example of the work, not a client reference
const demoScreens = [
  {
    name: "Accueil",
    path: "",
    src: "/images/projects/col-et-cadre.webp",
    text: "Ouvert ou fermé en direct, le téléphone en haut et les deux raisons de venir.",
  },
  {
    name: "Rayons",
    path: "#occasions",
    src: "/images/projects/col-et-cadre-categories.webp",
    text: "Vélos, skis, trottinettes : le stock suit les saisons.",
  },
  {
    name: "Boutique",
    path: "boutique",
    src: "/images/projects/col-et-cadre-boutique.webp",
    text: "Chaque article avec son prix, sa taille et son état, filtrable et trié.",
  },
  {
    name: "Atelier",
    path: "atelier",
    src: "/images/projects/col-et-cadre-atelier.webp",
    text: "Comment se passe une réparation, étape par étape.",
  },
  {
    name: "Tarifs",
    path: "atelier#tarifs",
    src: "/images/projects/col-et-cadre-tarifs.webp",
    text: "Les prix de l'atelier affichés, sans surprise au comptoir.",
  },
];

const DemoShowcase = ({ example }: { example: NonNullable<TradeProps["page"]["example"]> }) => {
  const [active, setActive] = useState(0);
  const screen = demoScreens[active];
  const host = example.url.replace(/^https?:\/\/(www\.)?/, "");

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <motion.div
          {...reveal}
          className="grid gap-10 overflow-hidden rounded-[calc(var(--radius)+1rem)] border border-ink-foreground/10 bg-ink p-6 text-ink-foreground sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14 lg:p-14"
        >
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-ink-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              {example.demo ? "Exemple de démonstration" : "Un exemple en ligne"}
            </p>
            <h2 className="mb-4 text-4xl font-display font-extrabold md:text-5xl">
              {example.name}
              {example.demo && (
                <span className="mt-2 block font-serif text-2xl font-medium italic opacity-70 md:text-3xl">
                  un commerce imaginé, un vrai site
                </span>
              )}
            </h2>
            <p className="mb-8 leading-relaxed text-ink-foreground/75">{example.text}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={example.url}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-2 rounded-full bg-ink-foreground px-6 py-3 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
              >
                {example.demo ? "Visiter la démo" : "Voir le site"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              {example.caseStudy && (
                <Link
                  to={example.caseStudy}
                  className="group inline-flex items-center gap-2 rounded-full border border-ink-foreground/25 px-6 py-3 text-sm font-semibold transition-colors hover:bg-ink-foreground/10"
                >
                  Comment je l'ai conçu
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <div className="overflow-hidden rounded-[var(--radius)] bg-card text-foreground shadow-2xl ring-1 ring-ink-foreground/10">
              <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-3 py-2">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                </span>
                <span className="min-w-0 flex-1 truncate rounded-md border border-border bg-background px-3 py-1 font-mono text-xs text-muted-foreground">
                  {host.replace(/\/$/, "")}/{screen.path}
                </span>
              </div>
              <div className="relative aspect-[16/10] bg-muted">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={screen.src}
                    src={screen.src}
                    alt={`${example.name}, page ${screen.name.toLowerCase()}`}
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </AnimatePresence>
              </div>
            </div>
            <div role="tablist" aria-label={`Pages de ${example.name}`} className="mt-4 flex flex-wrap gap-2">
              {demoScreens.map((s, i) => (
                <button
                  key={s.name}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    i === active ? "bg-accent text-accent-foreground" : "bg-ink-foreground/10 hover:bg-ink-foreground/20",
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>
            <p className="mt-3 min-h-[2.5rem] text-sm text-ink-foreground/65">{screen.text}</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export const Commerce = ({ page }: TradeProps) => (
  <>
    <Hero page={page} />
    <Features page={page} />
    <Pains page={page} />
    {page.example && <DemoShowcase example={page.example} />}
    <MockupSection
      pages={page.pages}
      domain="la-boutique-du-coin.fr"
      icon={Store}
      screens={commerceScreens}
      headingClassName="font-extrabold"
      eyebrow="Le site de la boutique"
      title={<>Une vitrine ouverte 24 h/24</>}
    />
  </>
);
