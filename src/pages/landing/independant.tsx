import { motion } from "framer-motion";
import {
  Briefcase,
  CalendarCheck,
  ListChecks,
  MessageCircle,
  PenLine,
  Quote,
  Search,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumb, Container, CtaButtons, MockupSection, Reassurances, iconAt, reveal, type TradeProps } from "./shared";

// A freelancer's site: editorial and personal, light serif headings, lots of
// air. The hero is a profile with open slots, the problems are what a
// prospect thinks, the features are the path from discovery to booking

const featureIcons: LucideIcon[] = [UserRound, ListChecks, CalendarCheck, Quote, PenLine, Search];

const slots = [
  ["Mar.", "14:00"],
  ["Mer.", "10:30"],
  ["Jeu.", "18:00"],
];

const Hero = ({ page }: TradeProps) => (
  <section id="landing-hero" className="relative pt-32 pb-20 sm:pb-28 overflow-hidden">
    <Container className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Breadcrumb trade={page.trade} className="mb-10" />
        <p className="font-serif italic text-xl text-primary mb-6">{page.eyebrow}</p>
        <h1 className="text-5xl sm:text-6xl lg:text-[5.25rem] font-serif font-light leading-[1.02] tracking-tight mb-8 text-balance">
          {page.titleStart} <em className="font-normal text-primary">{page.titleHighlight}</em>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">{page.intro}</p>
        <CtaButtons />
        <Reassurances className="mt-10" />
      </motion.div>

      {/* A profile card with bookable slots: the first contact in one minute */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="rounded-[calc(var(--radius)+1rem)] bg-card border border-border p-7 shadow-lg"
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary/60 text-primary-foreground">
            <UserRound className="h-7 w-7" />
          </span>
          <div>
            <p className="font-serif text-xl">Votre nom</p>
            <p className="text-sm text-muted-foreground">Coach · Grenoble</p>
          </div>
        </div>
        <p className="font-serif italic text-lg leading-snug text-muted-foreground border-l-2 border-accent pl-4 mb-7">
          « J'accompagne celles et ceux qui veulent changer de cap, à leur rythme. »
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">Prochains créneaux</p>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {slots.map(([day, time], i) => (
            <span
              key={day}
              className={`rounded-[var(--radius)] border px-2 py-2.5 text-center text-sm ${i === 1 ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
            >
              <span className="block text-xs opacity-70">{day}</span>
              <span className="font-semibold">{time}</span>
            </span>
          ))}
        </div>
        <span className="block rounded-full bg-foreground text-background py-3 text-center text-sm font-semibold">Prendre rendez-vous</span>
      </motion.div>
    </Container>
  </section>
);

// What a prospect thinks (the problem, in a bubble) and what the site answers
const Pains = ({ page }: TradeProps) => (
  <section className="py-20 sm:py-28 bg-muted/50">
    <Container className="max-w-4xl">
      <motion.div {...reveal} className="mb-14">
        <p className="font-serif italic text-xl text-primary mb-3">Le constat</p>
        <h2 className="text-4xl md:text-5xl font-serif font-light">Ce que pensent vos futurs clients</h2>
      </motion.div>
      <div className="space-y-10">
        {page.pains.map((pain, i) => (
          <motion.div key={pain.title} {...reveal} className="space-y-3">
            <div className="flex items-end gap-3 max-w-xl">
              <MessageCircle className="h-5 w-5 flex-shrink-0 text-muted-foreground mb-2" />
              <p className="rounded-[1.5rem] rounded-bl-sm bg-card border border-border px-5 py-3.5 font-serif text-xl">{pain.title}</p>
            </div>
            <div className={`flex ${i % 2 === 0 ? "justify-end" : "justify-end sm:pr-16"}`}>
              <p className="max-w-xl rounded-[1.5rem] rounded-br-sm bg-primary text-primary-foreground px-5 py-3.5 leading-relaxed">
                {pain.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);

// The path from a stranger to a booked session, one step per feature
const Features = ({ page }: TradeProps) => (
  <section className="py-20 sm:py-28">
    <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
      <motion.div {...reveal} className="lg:sticky lg:top-32 lg:self-start">
        <p className="font-serif italic text-xl text-primary mb-3">Votre site</p>
        <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Du premier clic au premier rendez-vous</h2>
        <p className="text-muted-foreground leading-relaxed max-w-sm">{page.area}</p>
      </motion.div>
      <ol className="relative border-l border-border ml-5">
        {page.features.map((feature, i) => {
          const Icon = iconAt(featureIcons, i, Sparkles);
          return (
            <motion.li key={feature} {...reveal} transition={{ duration: 0.4, delay: i * 0.05 }} className="relative pl-12 pb-10 last:pb-0">
              <span className="absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-1 pt-1">Étape {i + 1}</p>
              <p className="font-serif text-xl leading-snug">{feature}</p>
            </motion.li>
          );
        })}
      </ol>
    </Container>
  </section>
);

const Wireframe = () => (
  <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
    <div className="h-20 w-20 rounded-full bg-accent/60" />
    <div className="space-y-2.5">
      <div className="h-3 w-3/4 rounded-full bg-muted" />
      <div className="h-3 w-1/2 rounded-full bg-muted" />
      <div className="flex gap-2 pt-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-8 w-16 rounded-[var(--radius)] ${i === 1 ? "bg-primary" : "border border-border"}`} />
        ))}
      </div>
    </div>
  </div>
);

export const Independant = ({ page }: TradeProps) => (
  <>
    <Hero page={page} />
    <Pains page={page} />
    <Features page={page} />
    <MockupSection
      pages={page.pages}
      domain="votre-nom.fr"
      icon={Briefcase}
      wireframe={<Wireframe />}
      headingClassName="font-serif font-light"
      eyebrow="Votre site"
      title={<>Une présentation qui vous ressemble</>}
    />
  </>
);
