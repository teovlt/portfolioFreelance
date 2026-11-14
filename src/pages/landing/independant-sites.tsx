import { type ReactNode } from "react";
import { ArrowRight, Award, CalendarDays, Check, ChevronLeft, ChevronRight, Clock, Quote, Star, Video } from "lucide-react";
import { cn } from "@/lib/utils";

// The site of a made-up career coach in Grenoble, drawn at desktop size
// (1024 × 640) and scaled down by ScaledFrame. Plum, sand and terracotta,
// whatever the page theme, like a screenshot of a real client's site

const brand = { name: "Camille Roux", job: "Coach en reconversion" };

// A flat portrait, faceless, standing in for a photo of the person
export const Portrait = ({
  shirt = "#3d3550",
  hair = "#6b3f2a",
  skin = "#e8b994",
  bg = "#e9dccd",
  short = false,
  className,
}: {
  shirt?: string;
  hair?: string;
  skin?: string;
  bg?: string;
  short?: boolean;
  className?: string;
}) => (
  <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className={cn("block h-full w-full", className)}>
    <rect width="200" height="200" fill={bg} />
    {!short && <path d="M58 92 C52 40 148 40 142 92 L150 150 H50 Z" fill={hair} />}
    <path d="M30 210 C34 160 64 142 100 142 C136 142 166 160 170 210 Z" fill={shirt} />
    <path d="M86 122 H114 V146 C108 152 92 152 86 146 Z" fill={skin} />
    <ellipse cx="100" cy="94" rx="32" ry="38" fill={skin} />
    {short ? (
      <path d="M66 88 C62 52 138 50 134 88 C126 70 110 64 100 66 C88 64 74 70 66 88 Z" fill={hair} />
    ) : (
      <path d="M66 92 C60 50 140 46 134 92 C128 70 110 60 92 64 C80 68 72 78 66 92 Z" fill={hair} />
    )}
    <ellipse cx="88" cy="98" rx="3" ry="3.6" fill="#3a2a22" />
    <ellipse cx="112" cy="98" rx="3" ry="3.6" fill="#3a2a22" />
    <path d="M90 113 Q100 121 110 113" stroke="#a5604a" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M90 154 L100 168 L110 154" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" fill="none" />
  </svg>
);

// ---------------------------------------------------------------------------

const Header = ({ active }: { active?: string }) => (
  <div className="flex h-[68px] items-center justify-between px-12">
    <span className="font-display text-[22px] font-light">
      {brand.name}
      <span className="text-[#c9826b]">.</span>
    </span>
    <nav className="flex gap-8 text-[14px] text-[#6b6475]">
      {["À propos", "Prestations", "Témoignages"].map((l) => (
        <span key={l} className={cn(l === active && "text-[#3d3550] font-semibold")}>
          {l}
        </span>
      ))}
    </nav>
    <span className="rounded-full bg-[#3d3550] px-5 py-2.5 text-[13px] font-semibold text-white">Prendre rendez-vous</span>
  </div>
);

const Page = ({ active, children }: { active?: string; children: ReactNode }) => (
  <div className="h-full bg-[#f6f1ea] font-sans text-[#2a2533]">
    <Header active={active} />
    {children}
  </div>
);

const Title = ({ eyebrow, children, center }: { eyebrow: string; children: ReactNode; center?: boolean }) => (
  <div className={cn("mb-7", center && "text-center")}>
    <p className="mb-1 font-display text-[16px] italic text-[#c9826b]">{eyebrow}</p>
    <p className="font-display text-[36px] font-light leading-tight">{children}</p>
  </div>
);

export const CoachHome = () => (
  <Page>
    <div className="grid grid-cols-[1.15fr_0.85fr] gap-12 px-12 pt-10">
      <div className="pt-6">
        <p className="mb-5 font-display text-[18px] italic text-[#c9826b]">{brand.job} · Grenoble et en visio</p>
        <p className="mb-6 font-display text-[54px] font-light leading-[1.05]">
          Retrouver un travail qui <em className="text-[#3d3550]">vous ressemble</em>.
        </p>
        <p className="mb-8 max-w-[440px] text-[16px] leading-relaxed text-[#6b6475]">
          J'accompagne les salariés qui veulent changer de voie : bilan de compétences, projet de reconversion, prise de décision.
        </p>
        <div className="mb-9 flex items-center gap-4">
          <span className="flex items-center gap-2 rounded-full bg-[#3d3550] px-6 py-3.5 text-[14px] font-semibold text-white">
            Réserver un appel découverte <ArrowRight className="h-4 w-4" />
          </span>
          <span className="text-[13px] text-[#6b6475]">30 min · offert</span>
        </div>
        <div className="flex items-center gap-3 text-[13px] text-[#6b6475]">
          <span className="flex -space-x-2">
            {["#c9826b", "#7f8f6e", "#8a7aa6"].map((c) => (
              <span key={c} className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-[#f6f1ea]">
                <Portrait shirt={c} bg="#efe4d6" short={c === "#7f8f6e"} />
              </span>
            ))}
          </span>
          <span>
            <b className="text-[#2a2533]">120 personnes accompagnées</b> depuis 2019
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="h-[460px] overflow-hidden rounded-t-full">
          <Portrait />
        </div>
        <div className="absolute -left-10 bottom-10 rounded-2xl bg-white p-4 shadow-xl">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#a19aab]">Prochain créneau</p>
          <p className="flex items-center gap-2 text-[15px] font-semibold">
            <CalendarDays className="h-4 w-4 text-[#c9826b]" /> Mercredi, 10:30
          </p>
        </div>
      </div>
    </div>
  </Page>
);

const path = [
  ["2010", "Dix ans aux ressources humaines", "Recrutement puis gestion des carrières dans l'industrie, à Grenoble."],
  ["2018", "Certification de coach", "Coach professionnelle certifiée RNCP, formée à l'accompagnement de transitions."],
  ["2019", "Installation à mon compte", "Cabinet à Grenoble, séances en présentiel ou en visio."],
  ["2022", "Centre de bilans agréé", "Bilans de compétences finançables par le CPF."],
];

export const CoachAbout = () => (
  <Page active="À propos">
    <div className="grid grid-cols-[0.7fr_1.3fr] gap-12 px-12 pt-8">
      <div>
        <div className="mb-4 h-[300px] overflow-hidden rounded-[32px]">
          <Portrait bg="#dcd2e4" />
        </div>
        <p className="font-display text-[19px] italic leading-snug text-[#3d3550]">
          « J'ai moi-même changé de métier à 35 ans. Je sais ce que ça remue. »
        </p>
      </div>
      <div>
        <Title eyebrow="À propos">Mon parcours</Title>
        <ol className="relative ml-2 border-l border-[#d9cfc2]">
          {path.map(([year, title, text]) => (
            <li key={year} className="relative mb-6 pl-8">
              <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#c9826b] bg-[#f6f1ea]" />
              <p className="text-[12px] font-semibold text-[#c9826b]">{year}</p>
              <p className="font-display text-[19px]">{title}</p>
              <p className="text-[14px] text-[#6b6475]">{text}</p>
            </li>
          ))}
        </ol>
        <p className="flex items-center gap-2 text-[13px] text-[#6b6475]">
          <Award className="h-4 w-4 text-[#3d3550]" /> Certifiée RNCP · Qualiopi · Membre de l'EMCC
        </p>
      </div>
    </div>
  </Page>
);

const offers = [
  {
    name: "Séance découverte",
    time: "1 h 30",
    price: "120 €",
    items: ["Faire le point", "Clarifier la question", "Repartir avec un plan"],
  },
  {
    name: "Bilan de compétences",
    time: "24 h sur 3 mois",
    price: "1 490 €",
    items: ["Entretiens individuels", "Tests et enquêtes métiers", "Synthèse écrite"],
    tag: "Finançable CPF",
  },
  {
    name: "Coaching reconversion",
    time: "6 séances",
    price: "690 €",
    items: ["Projet validé sur le terrain", "Réseau et candidatures", "Suivi entre les séances"],
  },
];

export const CoachOffers = () => (
  <Page active="Prestations">
    <div className="px-12 pt-6">
      <Title eyebrow="Prestations" center>
        Trois façons de travailler ensemble
      </Title>
      <div className="grid grid-cols-3 gap-6">
        {offers.map((o, i) => (
          <div key={o.name} className={cn("relative rounded-[28px] p-7", i === 1 ? "bg-[#3d3550] text-white" : "bg-white")}>
            {o.tag && (
              <span className="absolute -top-3 right-6 rounded-full bg-[#c9826b] px-3 py-1 text-[11px] font-semibold text-white">
                {o.tag}
              </span>
            )}
            <p className="mb-1 font-display text-[22px]">{o.name}</p>
            <p className={cn("mb-5 flex items-center gap-1.5 text-[13px]", i === 1 ? "text-white/70" : "text-[#6b6475]")}>
              <Clock className="h-3.5 w-3.5" /> {o.time}
            </p>
            <p className="mb-5 font-display text-[38px] font-light">{o.price}</p>
            <ul className="mb-6 space-y-2.5 text-[14px]">
              {o.items.map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <Check className={cn("h-4 w-4", i === 1 ? "text-[#e6b7a5]" : "text-[#c9826b]")} /> {it}
                </li>
              ))}
            </ul>
            <span
              className={cn(
                "block rounded-full py-3 text-center text-[13px] font-semibold",
                i === 1 ? "bg-white text-[#3d3550]" : "border border-[#d9cfc2]",
              )}
            >
              Réserver
            </span>
          </div>
        ))}
      </div>
    </div>
  </Page>
);

const quotes = [
  {
    name: "Julien, 41 ans",
    from: "Ingénieur devenu ébéniste",
    text: "En trois mois, je suis passé de « je ne sais pas » à un CAP en alternance. Camille pose les bonnes questions.",
    shirt: "#7f8f6e",
    short: true,
  },
  {
    name: "Nadia, 36 ans",
    from: "Comptable, aujourd'hui formatrice",
    text: "Un accompagnement bienveillant mais exigeant. Je recommande à tous ceux qui tournent en rond.",
    shirt: "#c9826b",
    short: false,
  },
  {
    name: "Marc, 52 ans",
    from: "Cadre commercial",
    text: "J'avais peur de tout perdre. On a construit un projet réaliste, étape par étape.",
    shirt: "#8a7aa6",
    short: true,
  },
];

export const CoachReviews = () => (
  <Page active="Témoignages">
    <div className="px-12 pt-6">
      <div className="flex items-end justify-between">
        <Title eyebrow="Témoignages">Ils ont changé de cap</Title>
        <p className="mb-8 flex items-center gap-2 text-[14px]">
          <span className="flex text-[#e0a526]">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </span>
          <b>5,0</b> <span className="text-[#6b6475]">· 46 avis Google</span>
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {quotes.map((q, i) => (
          <div key={q.name} className={cn("rounded-[28px] bg-white p-7", i === 1 && "translate-y-6")}>
            <Quote className="mb-4 h-7 w-7 text-[#c9826b]" />
            <p className="mb-6 font-display text-[18px] leading-snug">{q.text}</p>
            <div className="flex items-center gap-3">
              <span className="h-11 w-11 overflow-hidden rounded-full">
                <Portrait shirt={q.shirt} short={q.short} bg="#efe4d6" />
              </span>
              <span>
                <span className="block text-[14px] font-semibold">{q.name}</span>
                <span className="block text-[12px] text-[#6b6475]">{q.from}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Page>
);

const week = [
  ["Lun.", "23", []],
  ["Mar.", "24", ["14:00", "17:30"]],
  ["Mer.", "25", ["09:00", "10:30", "16:00"]],
  ["Jeu.", "26", ["18:00"]],
  ["Ven.", "27", ["11:00", "14:00"]],
] as const;

export const CoachBooking = () => (
  <Page>
    <div className="grid grid-cols-[1.3fr_0.7fr] gap-8 px-12 pt-6">
      <div className="rounded-[28px] bg-white p-7">
        <div className="mb-5 flex items-center justify-between">
          <p className="font-display text-[26px] font-light">Choisissez un créneau</p>
          <span className="flex items-center gap-3 text-[13px] text-[#6b6475]">
            <ChevronLeft className="h-4 w-4" /> 23 – 27 novembre <ChevronRight className="h-4 w-4" />
          </span>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {week.map(([d, n, slots]) => (
            <div key={d} className="text-center">
              <p className="text-[12px] text-[#a19aab]">{d}</p>
              <p className="mb-3 font-display text-[22px]">{n}</p>
              <div className="space-y-2">
                {slots.length === 0 && <p className="py-2 text-[12px] text-[#c4bccb]">—</p>}
                {slots.map((s) => (
                  <p
                    key={s}
                    className={cn(
                      "rounded-xl py-2.5 text-[13px] font-semibold",
                      d === "Mer." && s === "10:30" ? "bg-[#3d3550] text-white" : "bg-[#f3ede5] text-[#3d3550]",
                    )}
                  >
                    {s}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[28px] bg-[#3d3550] p-7 text-white">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-12 w-12 overflow-hidden rounded-full">
            <Portrait bg="#e6b7a5" />
          </span>
          <span>
            <span className="block font-display text-[18px]">Appel découverte</span>
            <span className="block text-[12px] opacity-70">avec {brand.name}</span>
          </span>
        </div>
        <div className="mb-6 space-y-3 text-[14px]">
          <p className="flex items-center gap-2.5">
            <CalendarDays className="h-4 w-4 text-[#e6b7a5]" /> Mercredi 25 novembre
          </p>
          <p className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 text-[#e6b7a5]" /> 10:30 – 11:00
          </p>
          <p className="flex items-center gap-2.5">
            <Video className="h-4 w-4 text-[#e6b7a5]" /> En visio ou au cabinet
          </p>
        </div>
        <span className="block rounded-full bg-white py-3 text-center text-[14px] font-semibold text-[#3d3550]">
          Confirmer le rendez-vous
        </span>
        <p className="mt-3 text-center text-[12px] opacity-60">Offert et sans engagement</p>
      </div>
    </div>
  </Page>
);

// Same order as the trade's pages in server/src/content/landings.ts
export const independantScreens = [
  <CoachHome key="home" />,
  <CoachAbout key="about" />,
  <CoachOffers key="offers" />,
  <CoachReviews key="reviews" />,
  <CoachBooking key="book" />,
];
