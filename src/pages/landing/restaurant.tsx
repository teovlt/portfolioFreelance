import { motion } from "framer-motion";
import {
  CalendarCheck,
  Camera,
  Clock,
  FileX,
  Gauge,
  PartyPopper,
  PhoneMissed,
  Search,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Accent } from "@/components/customs/accent-text";
import { Breadcrumb, Container, CtaButtons, MockupSection, Reassurances, SectionHeading, iconAt, reveal, type TradeProps } from "./shared";

// A bistro's site: a centered, menu-like layout. The hero shows the evening's
// slate, the features read like a menu, the problems like a service going wrong

const painIcons: LucideIcon[] = [FileX, PhoneMissed, Store];
const featureIcons: LucideIcon[] = [UtensilsCrossed, CalendarCheck, Clock, Camera, PartyPopper, Gauge, Search];

// Made-up dishes, local to Grenoble, to show what a menu page looks like
const slate = [
  {
    course: "Entrées",
    dishes: [
      ["Ravioles du Royans", "9 €"],
      ["Velouté de saison", "7 €"],
    ],
  },
  {
    course: "Plats",
    dishes: [
      ["Truite du Vercors", "21 €"],
      ["Suprême, gratin dauphinois", "19 €"],
    ],
  },
  {
    course: "Desserts",
    dishes: [
      ["Tarte aux noix de Grenoble", "8 €"],
      ["Fromage blanc au miel", "6 €"],
    ],
  },
];
const slots = ["19:00", "19:30", "20:00", "20:30", "21:00"];

const Hero = ({ page }: TradeProps) => (
  <section id="landing-hero" className="relative pt-32 pb-16 sm:pb-24 overflow-hidden">
    <Container className="flex flex-col items-center text-center">
      <motion.div
        className="max-w-4xl flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Breadcrumb trade={page.trade} className="mb-8" />
        <p className="flex items-center gap-3 mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          <span className="h-px w-8 bg-primary" />
          {page.eyebrow}
          <span className="h-px w-8 bg-primary" />
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-medium italic leading-[1.05] tracking-tight mb-6 text-balance">
          {page.titleStart} <Accent className="not-italic font-bold">{page.titleHighlight}</Accent>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">{page.intro}</p>
        <CtaButtons label="Réserver un appel gratuit" className="justify-center" />
        <Reassurances className="justify-center mt-8" />
      </motion.div>

      {/* The evening's slate and the table booking: what the restaurant's own site shows */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative mt-16 w-full max-w-5xl"
      >
        <div className="rounded-[calc(var(--radius)+0.5rem)] bg-ink text-ink-foreground grain relative overflow-hidden p-8 pb-16 sm:p-12 sm:pb-16 text-left shadow-xl">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10 pb-6 border-b border-dashed border-ink-foreground/25">
            <p className="font-serif italic text-3xl sm:text-4xl">La carte de ce soir</p>
            <p className="text-xs uppercase tracking-[0.3em] text-ink-foreground/50">Exemple</p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {slate.map(({ course, dishes }) => (
              <div key={course}>
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-5">{course}</p>
                <ul className="space-y-4">
                  {dishes.map(([dish, price]) => (
                    <li key={dish} className="flex items-baseline gap-2 text-sm sm:text-base">
                      <span className="font-serif">{dish}</span>
                      <span className="flex-1 border-b border-dotted border-ink-foreground/30 translate-y-[-4px]" />
                      <span className="font-semibold">{price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="relative -mt-8 mx-auto w-fit max-w-[calc(100%-2rem)] rounded-full border border-border bg-card px-3 py-2 shadow-lg flex items-center gap-2 overflow-x-auto [scrollbar-width:none]">
          <span className="flex items-center gap-2 px-3 text-sm font-semibold whitespace-nowrap">
            <CalendarCheck className="h-4 w-4 text-primary" />
            Ce soir, 2 couverts
          </span>
          {slots.map((slot, i) => (
            <span
              key={slot}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold whitespace-nowrap ${i === 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              {slot}
            </span>
          ))}
        </div>
      </motion.div>
    </Container>
  </section>
);

// Three things that go wrong during service, one row each, icon first
const Pains = ({ page }: TradeProps) => (
  <section className="py-20 sm:py-24">
    <Container className="max-w-5xl">
      <SectionHeading eyebrow="Pendant le service" center>
        Ce qui vous fait <span className="font-serif italic font-medium">perdre des tables</span>
      </SectionHeading>
      <div className="divide-y divide-border border-y border-border">
        {page.pains.map((pain, i) => {
          const Icon = iconAt(painIcons, i, UtensilsCrossed);
          return (
            <motion.article key={pain.title} {...reveal} className="grid gap-4 py-8 sm:grid-cols-[auto_1fr_1.4fr] sm:items-start sm:gap-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-2xl font-serif italic font-medium">{pain.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{pain.text}</p>
            </motion.article>
          );
        })}
      </div>
    </Container>
  </section>
);

// The features as a printed menu: dotted leaders running to each icon
const Features = ({ page }: TradeProps) => (
  <section className="py-20 sm:py-24">
    <Container className="max-w-4xl">
      <motion.div {...reveal} className="rounded-[calc(var(--radius)+0.5rem)] border-2 border-foreground/80 bg-card p-8 sm:p-14">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">Votre site</p>
          <h2 className="text-4xl md:text-5xl font-serif italic font-medium">Au menu</h2>
          <span className="mx-auto mt-6 block h-px w-16 bg-primary" />
        </div>
        <ul className="space-y-5">
          {page.features.map((feature, i) => {
            const Icon = iconAt(featureIcons, i, UtensilsCrossed);
            return (
              <li key={feature} className="flex items-baseline gap-3">
                <span className="font-serif text-lg">{feature}</span>
                <span className="hidden sm:block flex-1 border-b border-dotted border-foreground/30 translate-y-[-4px]" />
                <Icon className="h-4 w-4 flex-shrink-0 text-primary translate-y-0.5" />
              </li>
            );
          })}
        </ul>
        <p className="mt-12 pt-6 border-t border-dashed border-border text-center text-sm text-muted-foreground">{page.area}</p>
      </motion.div>
    </Container>
  </section>
);

const Wireframe = () => (
  <div className="grid gap-3 sm:grid-cols-2">
    {[0, 1].map((col) => (
      <div key={col} className="space-y-3">
        <div className="h-3 w-16 rounded-full bg-primary/60" />
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center gap-2">
            <div className="h-3 w-28 rounded-full bg-muted" />
            <div className="flex-1 border-b border-dotted border-border" />
            <div className="h-3 w-8 rounded-full bg-accent/60" />
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const Restaurant = ({ page }: TradeProps) => (
  <>
    <Hero page={page} />
    <Pains page={page} />
    <Features page={page} />
    <MockupSection
      pages={page.pages}
      domain="le-petit-bistrot.fr"
      icon={UtensilsCrossed}
      wireframe={<Wireframe />}
      headingClassName="font-serif font-medium"
      eyebrow="Le site du restaurant"
      title={
        <>
          De la carte <span className="font-serif italic font-medium">à la réservation</span>
        </>
      }
    />
  </>
);
