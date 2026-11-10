import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  FileText,
  Hammer,
  ImageOff,
  Images,
  Layers,
  MapPinned,
  MessageSquareWarning,
  Phone,
  Search,
  Send,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumb, Container, CtaButtons, MockupSection, Reassurances, iconAt, reveal, type TradeProps } from "./shared";

// A tradesperson's site: squared, sturdy, work-site stripes, heavy capitals.
// The hero holds the quote request the craftsman receives, the problems read
// like an inspection report, and a before/after slider shows the work

const painIcons: LucideIcon[] = [UsersRound, ImageOff, MessageSquareWarning];
const featureIcons: LucideIcon[] = [Images, Layers, MapPinned, FileText, Phone, Award, Search];

const stripes = {
  backgroundImage: "repeating-linear-gradient(-45deg, hsl(var(--accent)) 0 14px, hsl(var(--foreground)) 14px 28px)",
};

const Hero = ({ page }: TradeProps) => (
  <section id="landing-hero" className="relative pt-32 pb-20 sm:pb-24 overflow-hidden">
    <Container className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Breadcrumb trade={page.trade} className="mb-8" />
        <p className="inline-flex items-center gap-2 mb-6 border-2 border-foreground px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
          <Hammer className="h-3.5 w-3.5" />
          {page.eyebrow}
        </p>
        <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.95] tracking-tight mb-6 text-balance">
          {page.titleStart}{" "}
          <span className="relative inline bg-accent px-2 box-decoration-clone text-accent-foreground">{page.titleHighlight}</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">{page.intro}</p>
        <CtaButtons label="Demander mon devis gratuit" />
        <Reassurances className="mt-8 pt-6 border-t-2 border-foreground/10" />
      </motion.div>

      {/* The quote request as it lands in the craftsman's inbox */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="relative border-2 border-foreground bg-card shadow-[8px_8px_0_0_hsl(var(--foreground))]"
      >
        <div className="h-3" style={stripes} />
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <p className="font-black uppercase tracking-tight text-lg">Demande de devis</p>
            <span className="font-mono text-xs text-muted-foreground">#0142</span>
          </div>
          <dl className="space-y-4 text-sm">
            {[
              ["Travaux", "Rénovation salle de bain"],
              ["Commune", "Meylan (38240)"],
              ["Délai souhaité", "Sous 1 mois"],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-3 border-b border-dashed border-border pb-3">
                <dt className="font-mono text-xs uppercase text-muted-foreground pt-0.5">{label}</dt>
                <dd className="font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="font-mono text-xs uppercase text-muted-foreground mt-5 mb-3">Photos jointes</p>
          <div className="grid grid-cols-3 gap-2">
            {["bg-muted", "bg-accent/50", "bg-primary/25"].map((c) => (
              <div key={c} className={`aspect-square ${c}`} />
            ))}
          </div>
          <span className="mt-6 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 text-sm font-bold uppercase tracking-wider">
            <Send className="h-4 w-4" />
            Envoyer ma demande
          </span>
        </div>
      </motion.div>
    </Container>
  </section>
);

// An inspection report: numbered findings, monospace references
const Pains = ({ page }: TradeProps) => (
  <section className="py-20 sm:py-24 bg-ink text-ink-foreground">
    <Container>
      <motion.div {...reveal} className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">État des lieux</p>
          <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tight">Ce qui coince</h2>
        </div>
      </motion.div>
      <ol className="border-t-2 border-ink-foreground/20">
        {page.pains.map((pain, i) => {
          const Icon = iconAt(painIcons, i, Hammer);
          return (
            <motion.li
              key={pain.title}
              {...reveal}
              className="grid gap-4 border-b-2 border-ink-foreground/20 py-8 md:grid-cols-[6rem_auto_1fr_1.3fr] md:items-start md:gap-8"
            >
              <span className="font-mono text-4xl font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <Icon className="h-7 w-7 text-ink-foreground/60" />
              <h3 className="font-sans text-xl font-black uppercase tracking-tight">{pain.title}</h3>
              <p className="text-ink-foreground/70 leading-relaxed">{pain.text}</p>
            </motion.li>
          );
        })}
      </ol>
    </Container>
  </section>
);

// Drag to compare: the same room before and after, as flat shapes
const BeforeAfter = () => {
  const [split, setSplit] = useState(50);
  return (
    <section className="py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <motion.div {...reveal}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Galerie de réalisations</p>
          <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">Avant / après</h2>
          <p className="text-muted-foreground leading-relaxed max-w-md">
            Vos chantiers, classés par type de travaux, avec un curseur avant/après comme celui-ci. Faites-le glisser.
          </p>
        </motion.div>
        <motion.div {...reveal} className="relative aspect-[4/3] border-2 border-foreground overflow-hidden select-none">
          {/* After: clean tiling and fittings */}
          <div className="absolute inset-0 bg-card">
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[repeating-linear-gradient(90deg,hsl(var(--primary)/0.15)_0_40px,hsl(var(--primary)/0.25)_40px_80px)]" />
            <div className="absolute left-[12%] bottom-1/3 h-1/3 w-[30%] bg-primary/80" />
            <div className="absolute right-[14%] top-[18%] h-[28%] w-[22%] border-4 border-accent bg-accent/20" />
            <span className="absolute right-3 top-3 bg-primary text-primary-foreground px-2 py-1 font-mono text-xs uppercase">Après</span>
          </div>
          {/* Before: tired walls, uneven floor */}
          <div className="absolute inset-0 bg-muted" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[repeating-linear-gradient(45deg,hsl(var(--muted-foreground)/0.2)_0_12px,transparent_12px_24px)]" />
            <div className="absolute left-[12%] bottom-1/3 h-1/4 w-[30%] bg-muted-foreground/30" />
            <span className="absolute left-3 top-3 bg-foreground text-background px-2 py-1 font-mono text-xs uppercase">Avant</span>
          </div>
          <div className="absolute inset-y-0 w-1 bg-accent pointer-events-none" style={{ left: `calc(${split}% - 2px)` }}>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-accent border-2 border-foreground" />
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={split}
            onChange={(e) => setSplit(Number(e.target.value))}
            aria-label="Comparer avant et après"
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </motion.div>
      </Container>
    </section>
  );
};

// The toolbox: square tiles, one tool each
const Features = ({ page }: TradeProps) => (
  <section className="py-20 sm:py-24">
    <Container>
      <motion.div {...reveal} className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Votre site</p>
          <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tight">La caisse à outils</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed lg:max-w-md lg:justify-self-end">{page.area}</p>
      </motion.div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l-2 border-t-2 border-foreground">
        {page.features.map((feature, i) => {
          const Icon = iconAt(featureIcons, i, Hammer);
          return (
            <li key={feature} className="group border-b-2 border-r-2 border-foreground bg-card p-6 transition-colors hover:bg-accent">
              <div className="flex items-center justify-between mb-8">
                <Icon className="h-7 w-7" />
                <span className="font-mono text-xs text-muted-foreground group-hover:text-accent-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="font-semibold leading-snug">{feature}</p>
            </li>
          );
        })}
      </ul>
    </Container>
  </section>
);

const Wireframe = () => (
  <div className="grid gap-4 sm:grid-cols-[1.2fr_1fr]">
    <div className="grid grid-cols-2 gap-2">
      <div className="aspect-square bg-muted" />
      <div className="aspect-square bg-accent/50" />
    </div>
    <div className="space-y-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-8 border-2 border-border" />
      ))}
      <div className="h-9 bg-primary" />
    </div>
  </div>
);

export const Artisan = ({ page }: TradeProps) => (
  <>
    <Hero page={page} />
    <Pains page={page} />
    <BeforeAfter />
    <Features page={page} />
    <MockupSection
      pages={page.pages}
      domain="martin-menuiserie.fr"
      icon={Hammer}
      wireframe={<Wireframe />}
      headingClassName="font-sans font-black uppercase tracking-tight"
      eyebrow="Le site de l'artisan"
      title={<>Du premier coup d'œil au devis</>}
    />
  </>
);
