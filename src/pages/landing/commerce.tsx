import { motion } from "framer-motion";
import {
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

const products = [
  { name: "Nouveautés", tone: "bg-accent/70", sticker: true },
  { name: "Coups de cœur", tone: "bg-primary/20" },
  { name: "Idées cadeaux", tone: "bg-muted" },
  { name: "Le local", tone: "bg-accent/35" },
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
            {products.map(({ name, tone, sticker }) => (
              <div key={name} className={cn("relative aspect-[4/3] rounded-[var(--radius)] p-3 flex items-end", tone)}>
                <span className="text-sm font-semibold">{name}</span>
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

const Wireframe = () => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
    {["bg-accent/60", "bg-muted", "bg-primary/20", "bg-muted"].map((c, i) => (
      <div key={i} className="space-y-2">
        <div className={`aspect-square rounded-[var(--radius)] ${c}`} />
        <div className="h-2.5 w-3/4 rounded-full bg-muted" />
      </div>
    ))}
  </div>
);

export const Commerce = ({ page }: TradeProps) => (
  <>
    <Hero page={page} />
    <Features page={page} />
    <Pains page={page} />
    <MockupSection
      pages={page.pages}
      domain="la-boutique-du-coin.fr"
      icon={Store}
      wireframe={<Wireframe />}
      headingClassName="font-extrabold"
      eyebrow="Le site de la boutique"
      title={<>Une vitrine ouverte 24 h/24</>}
    />
  </>
);
