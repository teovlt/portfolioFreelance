import { motion } from "framer-motion";
import {
  BedDouble,
  CalendarCheck,
  CalendarX,
  Camera,
  House,
  ImageOff,
  KeyRound,
  Languages,
  Mountain,
  Percent,
  Search,
  Star,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumb, Container, CtaButtons, ExampleCard, MockupSection, Reassurances, iconAt, reveal, type TradeProps } from "./shared";

// After the gîte sites I make (manoir-champagne): a calm, roomy page on
// cream, a landscape with the booking bar sitting on its edge, and the
// essentials of the stay laid out as centered icons

const painIcons: LucideIcon[] = [Percent, CalendarX, ImageOff];
const featureIcons: LucideIcon[] = [Camera, CalendarCheck, KeyRound, Tag, Mountain, Languages, Star, Search];

// Layered ridges in the page's colors, standing in for the gîte's photo
const Landscape = () => (
  <svg viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
    <rect width="1200" height="420" fill="hsl(var(--muted))" />
    <circle cx="930" cy="120" r="56" fill="hsl(var(--primary) / 0.35)" />
    <path d="M0 260 L160 150 L290 230 L430 110 L600 240 L760 130 L900 220 L1060 120 L1200 200 V420 H0 Z" fill="hsl(var(--accent) / 0.45)" />
    <path d="M0 310 L140 230 L300 300 L470 200 L640 300 L820 210 L990 290 L1200 230 V420 H0 Z" fill="hsl(var(--accent) / 0.75)" />
    <path d="M0 360 C200 320 380 350 600 330 C820 310 1000 350 1200 320 V420 H0 Z" fill="hsl(var(--accent-foreground) / 0.55)" />
    {/* The gîte itself, small on the hillside */}
    <g transform="translate(760 290)" fill="hsl(var(--card))">
      <rect x="0" y="18" width="60" height="34" />
      <path d="M-6 20 L30 -6 L66 20 Z" fill="hsl(var(--primary))" />
      <rect x="24" y="32" width="12" height="20" fill="hsl(var(--primary) / 0.6)" />
    </g>
  </svg>
);

const Hero = ({ page }: TradeProps) => (
  <section id="landing-hero" className="relative pt-32 pb-16 sm:pb-20">
    <Container>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
        <Breadcrumb trade={page.trade} className="mb-8" />
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-5">{page.eyebrow}</p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-medium leading-[1.05] tracking-tight mb-6 text-balance">
          {page.titleStart} <span className="text-primary">{page.titleHighlight}</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">{page.intro}</p>
        <CtaButtons />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="relative mt-14"
      >
        <div className="relative h-64 sm:h-80 lg:h-[26rem] overflow-hidden rounded-[calc(var(--radius)+0.75rem)]">
          <Landscape />
          <span className="absolute left-5 top-5 rounded-full bg-card/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
            Vercors · Chartreuse · Belledonne
          </span>
        </div>
        {/* The bar the gîte's own site opens on, as an illustration */}
        <div
          aria-hidden="true"
          className="relative -mt-12 mx-4 sm:mx-10 rounded-[calc(var(--radius)+0.25rem)] border border-border bg-card p-4 sm:p-5 shadow-xl grid gap-3 grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
        >
          {[
            ["Arrivée", "Ven. 14 août"],
            ["Départ", "Dim. 16 août"],
            ["Voyageurs", "6 adultes"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-muted px-4 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
              <p className="text-sm font-semibold">{value}</p>
            </div>
          ))}
          <span className="col-span-2 lg:col-span-1 rounded-lg bg-primary text-primary-foreground px-6 py-3.5 text-center text-sm font-semibold uppercase tracking-wider">
            Vérifier les disponibilités
          </span>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">Aperçu : ce que vos voyageurs voient en arrivant sur votre site</p>
      </motion.div>
      <Reassurances className="justify-center mt-10" />
    </Container>
  </section>
);

// Centered, quiet: the three things a listing on a platform can't do
const Pains = ({ page }: TradeProps) => (
  <section className="py-20 sm:py-28 bg-card border-y border-border">
    <Container>
      <motion.div {...reveal} className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-4">Le constat</p>
        <h2 className="text-4xl md:text-5xl font-serif font-medium">Une annonce ne suffit pas</h2>
      </motion.div>
      <div className="grid gap-10 md:grid-cols-3 md:gap-14">
        {page.pains.map((pain, i) => {
          const Icon = iconAt(painIcons, i, House);
          return (
            <motion.article key={pain.title} {...reveal} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
              <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/35 text-accent-foreground">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="text-xl font-serif font-medium mb-3">{pain.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pain.text}</p>
            </motion.article>
          );
        })}
      </div>
    </Container>
  </section>
);

// "L'essentiel du séjour": the features as a grid of small icon tiles
const Features = ({ page }: TradeProps) => (
  <section className="py-20 sm:py-28">
    <Container>
      <motion.div {...reveal} className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end mb-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-4">Votre site</p>
          <h2 className="text-4xl md:text-5xl font-serif font-medium">L'essentiel du séjour, en un coup d'œil</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed lg:max-w-md lg:justify-self-end">{page.area}</p>
      </motion.div>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {page.features.map((feature, i) => {
          const Icon = iconAt(featureIcons, i, BedDouble);
          return (
            <motion.li
              key={feature}
              {...reveal}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              className="rounded-[calc(var(--radius)+0.25rem)] bg-muted/70 p-6"
            >
              <Icon className="h-6 w-6 text-primary mb-5" />
              <p className="font-medium leading-snug">{feature}</p>
            </motion.li>
          );
        })}
      </ul>
    </Container>
  </section>
);

const Wireframe = () => (
  <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
    <div className="h-32 rounded-lg bg-accent/45" />
    <div className="grid grid-cols-7 gap-1 content-start">
      {Array.from({ length: 21 }, (_, i) => (
        <div key={i} className={`aspect-square rounded-sm ${[3, 4, 5, 11, 12, 17].includes(i) ? "bg-primary/70" : "bg-muted"}`} />
      ))}
    </div>
  </div>
);

export const Gite = ({ page }: TradeProps) => (
  <>
    <Hero page={page} />
    <Pains page={page} />
    <Features page={page} />
    {page.example && (
      <section className="pb-20 sm:pb-24">
        <Container>
          <ExampleCard example={page.example} />
        </Container>
      </section>
    )}
    <MockupSection
      pages={page.pages}
      domain="gite-du-vercors.fr"
      icon={House}
      wireframe={<Wireframe />}
      headingClassName="font-serif font-medium"
      eyebrow="Le site du gîte"
      title={<>De la première photo à la réservation</>}
    />
  </>
);
