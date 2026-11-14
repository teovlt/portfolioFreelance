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
import { Breadcrumb, Container, CtaButtons, MockupSection, Reassurances, ScaledFrame, iconAt, reveal, type TradeProps } from "./shared";
import { NewHome, OldSite, Scene, artisanScreens } from "./artisan-sites";

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
              ["Travaux", "Escalier et portes en chêne"],
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
            {(["stairs", "door", "window"] as const).map((kind) => (
              <div key={kind} className="aspect-square overflow-hidden border border-border">
                <Scene kind={kind} />
              </div>
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

// Drag to compare: the site many craftsmen still have, and the same
// business redone, both drawn at desktop size
const differences = [
  "Le numéro et le bouton devis toujours visibles",
  "De vraies photos de chantiers, pas une image cassée",
  "Lisible sur téléphone, là où vos clients vous cherchent",
  "Avis Google, garanties et communes mis en avant",
];

const BeforeAfter = () => {
  const [split, setSplit] = useState(50);
  return (
    <section className="py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
        <motion.div {...reveal}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Avant / après</p>
          <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">Votre site, refait à neuf</h2>
          <p className="text-muted-foreground leading-relaxed max-w-md mb-8">
            À gauche, le site qu'on croise encore chez beaucoup d'artisans. À droite, la même menuiserie, refaite comme je le ferais. Faites
            glisser le curseur.
          </p>
          <ul className="space-y-3">
            {differences.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm font-semibold">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 bg-accent" />
                {d}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div {...reveal} className="border-2 border-foreground bg-card shadow-[8px_8px_0_0_hsl(var(--foreground))]">
          <div className="flex items-center gap-3 border-b-2 border-foreground px-3 py-2">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
            </span>
            <span className="flex-1 truncate bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">martin-menuiserie.fr</span>
          </div>
          <div className="relative select-none overflow-hidden">
            <div aria-hidden="true">
              <ScaledFrame>
                <NewHome />
              </ScaledFrame>
            </div>
            <div aria-hidden="true" className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
              <ScaledFrame>
                <OldSite />
              </ScaledFrame>
            </div>
            <span className="absolute left-3 bottom-3 bg-foreground text-background px-2 py-1 font-mono text-xs uppercase pointer-events-none">
              Avant
            </span>
            <span className="absolute right-3 bottom-3 bg-accent text-accent-foreground px-2 py-1 font-mono text-xs uppercase pointer-events-none">
              Après
            </span>
            <div className="absolute inset-y-0 w-1 bg-accent pointer-events-none" style={{ left: `calc(${split}% - 2px)` }}>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-accent border-2 border-foreground font-bold text-accent-foreground">
                ⇆
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={split}
              onChange={(e) => setSplit(Number(e.target.value))}
              aria-label="Comparer l'ancien et le nouveau site"
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
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
      screens={artisanScreens}
      headingClassName="font-sans font-black uppercase tracking-tight"
      eyebrow="Le site de l'artisan"
      title={<>Du premier coup d'œil au devis</>}
    />
  </>
);
