import { type ReactNode } from "react";
import { BedDouble, CalendarDays, Check, Flame, Mountain, Snowflake, Trees, Users, Waves, ShoppingBasket } from "lucide-react";
import { cn } from "@/lib/utils";

// The site of a made-up gîte in the Vercors, drawn at desktop size
// (1024 × 640) and scaled down by ScaledFrame. Cream, terracotta and sage,
// whatever the page theme, like a screenshot of a real client's site

const brand = { name: "Gîte Les Clarines", place: "Lans-en-Vercors" };

// ---------------------------------------------------------------------------
// Illustrations standing in for the gîte's photos

export type StayKind = "chalet" | "bedroom" | "living" | "lake" | "ski" | "hike" | "kitchen";

export const StayPhoto = ({ kind, className, wide }: { kind: StayKind; className?: string; wide?: boolean }) => {
  const common = {
    viewBox: wide ? "-220 20 840 280" : "0 0 400 300",
    preserveAspectRatio: "xMidYMid slice",
    className: cn("block h-full w-full", className),
  };

  if (kind === "chalet" || kind === "hike")
    return (
      <svg {...common}>
        <rect x="-220" width="840" height="300" fill="#cfe0e6" />
        <circle cx="320" cy="60" r="26" fill="#fbe3b0" />
        <path
          d="M-220 130 L-150 80 L-60 140 L0 150 L70 70 L120 115 L190 40 L260 110 L320 60 L400 120 L470 70 L540 120 L620 90 V300 H-220 Z"
          fill="#9fb0b8"
        />
        <path d="M170 60 L190 40 L210 60 L200 58 L190 66 Z M300 78 L320 60 L338 80 Z M455 84 L470 70 L486 86 Z" fill="#fff" />
        <path
          d="M-220 180 C-120 160 -60 190 0 190 C80 150 160 175 240 150 C310 130 360 150 400 140 C480 130 540 160 620 150 V300 H-220 Z"
          fill="#8a9e72"
        />
        <path d="M-220 225 C-100 215 -40 235 0 230 C100 205 220 225 400 200 C480 195 560 215 620 205 V300 H-220 Z" fill="#6f8a5a" />
        {[-160, -130, 470, 500].map((x) => (
          <path key={x} d={`M${x} 214 l14 -44 l14 44 z`} fill="#3f5a3a" />
        ))}
        {[30, 60, 350, 375].map((x, i) => (
          <path key={x} d={`M${x} ${215 - i * 4} l14 -44 l14 44 z`} fill="#3f5a3a" />
        ))}
        {kind === "chalet" ? (
          <g transform="translate(150 150)">
            <rect x="0" y="40" width="110" height="60" fill="#e9dfcc" />
            <path d="M-12 44 L55 0 L122 44 Z" fill="#8a4f33" />
            <rect x="14" y="58" width="18" height="18" fill="#4a5a63" />
            <rect x="78" y="58" width="18" height="18" fill="#4a5a63" />
            <rect x="46" y="64" width="18" height="36" fill="#7a4a30" />
            <rect x="80" y="10" width="10" height="22" fill="#6b625a" />
          </g>
        ) : (
          <g>
            <path d="M120 300 C150 260 180 250 210 230 C240 210 260 200 290 190" stroke="#e5d6b6" strokeWidth="8" fill="none" />
            <g transform="translate(205 200)" fill="#b5653f">
              <circle cx="0" cy="0" r="6" />
              <rect x="-5" y="6" width="10" height="20" rx="3" />
            </g>
          </g>
        )}
      </svg>
    );

  if (kind === "bedroom")
    return (
      <svg {...common}>
        <rect width="400" height="300" fill="#efe6d6" />
        <rect y="230" width="400" height="70" fill="#c9a77c" />
        <rect x="280" y="40" width="80" height="100" fill="#d6e4ea" stroke="#fff" strokeWidth="6" />
        <rect x="70" y="100" width="200" height="60" rx="6" fill="#a9734e" />
        <rect x="60" y="150" width="220" height="70" rx="6" fill="#fbf8f2" />
        <rect x="60" y="180" width="220" height="40" fill="#b5653f" />
        <rect x="85" y="132" width="60" height="26" rx="10" fill="#fff" />
        <rect x="160" y="132" width="60" height="26" rx="10" fill="#fff" />
        <rect x="296" y="180" width="40" height="44" fill="#a9734e" />
        <path d="M316 180 V150 M302 150 h28 l-6 -18 h-16 z" stroke="#6b5a45" strokeWidth="3" fill="#f3e3c4" />
      </svg>
    );

  if (kind === "living" || kind === "kitchen")
    return (
      <svg {...common}>
        <rect width="400" height="300" fill="#ece3d3" />
        <rect y="235" width="400" height="65" fill="#b58e64" />
        <path d="M0 40 H400" stroke="#8a5f3e" strokeWidth="14" />
        <path d="M120 40 V60 M280 40 V60" stroke="#8a5f3e" strokeWidth="10" />
        <rect x="250" y="80" width="120" height="155" fill="#bcb3a5" />
        <rect x="270" y="150" width="80" height="85" fill="#2e2622" />
        <path d="M290 230 C295 200 310 210 310 185 C320 205 335 200 330 230 Z" fill="#f0a24a" />
        <rect x="244" y="140" width="132" height="12" fill="#8a5f3e" />
        {kind === "living" ? (
          <g>
            <rect x="30" y="160" width="170" height="60" rx="14" fill="#7f8f6e" />
            <rect x="30" y="140" width="170" height="40" rx="12" fill="#8fa07c" />
            <rect x="50" y="146" width="40" height="30" rx="8" fill="#e9c9a0" />
            <rect x="60" y="235" width="110" height="10" fill="#6b4a33" />
          </g>
        ) : (
          <g>
            <rect x="30" y="170" width="180" height="12" fill="#6b4a33" />
            <path d="M50 182 V235 M190 182 V235" stroke="#6b4a33" strokeWidth="6" />
            <circle cx="80" cy="160" r="10" fill="#b5653f" />
            <rect x="120" y="148" width="16" height="22" fill="#fff" />
          </g>
        )}
      </svg>
    );

  if (kind === "lake")
    return (
      <svg {...common}>
        <rect width="400" height="300" fill="#d9e6ea" />
        <path d="M0 140 L90 70 L160 120 L250 60 L330 110 L400 80 V170 H0 Z" fill="#8fa4a6" />
        <rect y="160" width="400" height="140" fill="#6d9bb0" />
        <path d="M40 200 H120 M200 230 H300 M90 260 H180" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" />
        <path d="M0 165 C120 150 260 175 400 160 V175 H0 Z" fill="#7f8f6e" />
      </svg>
    );

  return (
    <svg {...common}>
      <rect width="400" height="300" fill="#cfdde8" />
      <path d="M0 160 L110 50 L190 120 L280 40 L400 140 V300 H0 Z" fill="#fff" />
      <path d="M110 50 L130 90 L100 80 Z M280 40 L300 80 L270 70 Z" fill="#c9d6de" />
      <path d="M60 300 C120 230 200 220 260 170" stroke="#c9d6de" strokeWidth="10" fill="none" />
      {[80, 120, 330, 360].map((x) => (
        <path key={x} d={`M${x} 250 l12 -36 l12 36 z`} fill="#3f5a3a" />
      ))}
      <g transform="translate(200 200)" fill="#b5653f">
        <circle r="6" />
        <path d="M-14 22 L18 8" stroke="#2b2a26" strokeWidth="3" />
      </g>
    </svg>
  );
};

// ---------------------------------------------------------------------------

const nav = ["Le gîte", "Tarifs", "La région"];

const Header = ({ active, overlay }: { active?: string; overlay?: boolean }) => (
  <div
    className={cn(
      "flex h-[66px] items-center justify-between px-10",
      overlay ? "absolute inset-x-0 top-0 z-10 text-white" : "border-b border-[#e6dccb] bg-[#f8f3ea]",
    )}
  >
    <span className="leading-tight">
      <span className="block font-display text-[21px] font-medium">{brand.name}</span>
      <span className={cn("block text-[10px] uppercase tracking-[0.3em]", overlay ? "opacity-80" : "text-[#8a8170]")}>
        {brand.place} · Vercors
      </span>
    </span>
    <nav className="flex gap-8 text-[14px]">
      {nav.map((l) => (
        <span key={l} className={cn(l === active && "font-semibold text-[#b5653f]")}>
          {l}
        </span>
      ))}
    </nav>
    <span
      className={cn("rounded-full px-5 py-2.5 text-[13px] font-semibold", overlay ? "bg-white text-[#2b2a26]" : "bg-[#b5653f] text-white")}
    >
      Réserver
    </span>
  </div>
);

const Page = ({ active, children }: { active?: string; children: ReactNode }) => (
  <div className="h-full bg-[#f8f3ea] font-sans text-[#2b2a26]">
    <Header active={active} />
    {children}
  </div>
);

const Title = ({ eyebrow, children, center }: { eyebrow: string; children: ReactNode; center?: boolean }) => (
  <div className={cn("mb-6", center && "text-center")}>
    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#7f8f6e]">{eyebrow}</p>
    <p className="font-display text-[32px] font-medium leading-tight">{children}</p>
  </div>
);

export const StayHome = () => (
  <div className="relative h-full bg-[#f8f3ea] font-sans text-[#2b2a26]">
    <div className="relative h-[430px] overflow-hidden">
      <StayPhoto kind="chalet" wide />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/25" />
      <Header overlay />
      <div className="absolute inset-x-0 top-[120px] text-center text-white">
        <p className="mb-3 text-[12px] uppercase tracking-[0.35em]">Ferme rénovée · 8 voyageurs</p>
        <p className="font-display text-[60px] font-medium leading-none [text-shadow:0_2px_20px_rgba(0,0,0,0.25)]">
          Au calme, face au Vercors
        </p>
      </div>
    </div>
    <div className="relative mx-auto -mt-[46px] grid w-[860px] grid-cols-[1fr_1fr_1fr_auto] items-end gap-3 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-20px_rgba(60,40,20,0.4)]">
      {[
        ["Arrivée", "Sam. 19 déc."],
        ["Départ", "Sam. 26 déc."],
        ["Voyageurs", "6 adultes, 2 enfants"],
      ].map(([l, v]) => (
        <div key={l} className="rounded-xl bg-[#f3ece0] px-4 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a8170]">{l}</p>
          <p className="text-[14px] font-semibold">{v}</p>
        </div>
      ))}
      <span className="rounded-xl bg-[#b5653f] px-6 py-4 text-[13px] font-semibold uppercase tracking-wider text-white">
        Disponibilités
      </span>
    </div>
    <div className="mx-auto mt-8 flex w-[760px] justify-between text-center text-[13px]">
      {[
        [Users, "8 voyageurs"],
        [BedDouble, "4 chambres"],
        [Trees, "Jardin de 2 000 m²"],
        [Flame, "Poêle à bois"],
        [Snowflake, "Pistes à 10 min"],
      ].map(([Icon, label]) => {
        const I = Icon as typeof Users;
        return (
          <span key={String(label)} className="flex flex-col items-center gap-2">
            <I className="h-6 w-6 text-[#b5653f]" />
            {String(label)}
          </span>
        );
      })}
    </div>
  </div>
);

const equipment = [
  "Linge de lit et serviettes fournis",
  "Cuisine équipée, lave-vaisselle",
  "Wifi fibre",
  "Poêle à bois, bois fourni",
  "Local à skis chauffé",
  "Lit bébé et chaise haute",
  "Parking pour 3 voitures",
  "Animaux acceptés",
];

export const StayHouse = () => (
  <Page active="Le gîte">
    <div className="grid grid-cols-[1.25fr_0.75fr] gap-9 px-10 pt-8">
      <div>
        <Title eyebrow="Le gîte">170 m² pour se retrouver</Title>
        <div className="grid h-[400px] grid-cols-3 grid-rows-2 gap-2.5">
          <div className="col-span-2 row-span-2 overflow-hidden rounded-xl">
            <StayPhoto kind="living" />
          </div>
          <div className="overflow-hidden rounded-xl">
            <StayPhoto kind="bedroom" />
          </div>
          <div className="relative overflow-hidden rounded-xl">
            <StayPhoto kind="kitchen" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-[14px] font-semibold text-white">
              + 24 photos
            </span>
          </div>
        </div>
      </div>
      <div className="pt-[76px]">
        <p className="mb-4 text-[15px] leading-relaxed text-[#5e584c]">
          Quatre chambres dont une au rez-de-chaussée, deux salles d'eau, une grande pièce à vivre ouverte sur le jardin et la vue.
        </p>
        <ul className="space-y-2.5 text-[14px]">
          {equipment.map((e) => (
            <li key={e} className="flex items-center gap-2.5">
              <Check className="h-4 w-4 text-[#7f8f6e]" />
              {e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Page>
);

// December 2026 starts on a Tuesday; booked nights are struck through
const booked = [4, 5, 6, 11, 12, 13, 26, 27, 28, 29, 30, 31];

export const StayRates = () => (
  <Page active="Tarifs">
    <div className="grid grid-cols-[1fr_1fr] gap-10 px-10 pt-8">
      <div>
        <Title eyebrow="Disponibilités">Choisissez vos dates</Title>
        <div className="rounded-xl border border-[#e6dccb] bg-white p-5">
          <p className="mb-3 flex items-center justify-between text-[15px] font-semibold">
            Décembre 2026 <CalendarDays className="h-4 w-4 text-[#8a8170]" />
          </p>
          <div className="grid grid-cols-7 gap-1.5 text-center text-[13px]">
            {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
              <span key={i} className="pb-1 text-[11px] text-[#8a8170]">
                {d}
              </span>
            ))}
            <span />
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
              const isBooked = booked.includes(d);
              const isPicked = d >= 19 && d <= 25;
              return (
                <span
                  key={d}
                  className={cn(
                    "rounded-md py-2",
                    isBooked && "bg-[#f1ebe1] text-[#bcb2a2] line-through",
                    isPicked && "bg-[#b5653f] font-semibold text-white",
                    (d === 19 || d === 25) && "ring-2 ring-[#7a3f25]",
                  )}
                >
                  {d}
                </span>
              );
            })}
          </div>
          <p className="mt-4 flex gap-5 text-[12px] text-[#8a8170]">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-[#b5653f]" /> Votre séjour
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-[#f1ebe1]" /> Déjà réservé
            </span>
          </p>
        </div>
      </div>
      <div className="pt-[76px]">
        <table className="mb-5 w-full overflow-hidden rounded-xl bg-white text-[14px]">
          <thead>
            <tr className="bg-[#7f8f6e] text-left text-white">
              <th className="px-4 py-3 font-semibold">Saison</th>
              <th className="px-4 py-3 text-right font-semibold">Nuit</th>
              <th className="px-4 py-3 text-right font-semibold">Semaine</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Basse saison", "150 €", "900 €"],
              ["Vacances scolaires", "190 €", "1 150 €"],
              ["Fêtes de fin d'année", "220 €", "1 390 €"],
              ["Été", "180 €", "1 090 €"],
            ].map(([s, n, w]) => (
              <tr key={s} className="border-b border-[#efe7da]">
                <td className="px-4 py-3">{s}</td>
                <td className="px-4 py-3 text-right font-semibold">{n}</td>
                <td className="px-4 py-3 text-right">{w}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[13px] leading-relaxed text-[#5e584c]">
          Minimum 2 nuits, 7 nuits pendant les vacances. Ménage de fin de séjour inclus. Taxe de séjour : 1 € par adulte et par nuit.
        </p>
      </div>
    </div>
  </Page>
);

const ideas: { kind: StayKind; icon: typeof Mountain; name: string; info: string }[] = [
  { kind: "hike", icon: Mountain, name: "Randonnées", info: "Départ à pied depuis le gîte" },
  { kind: "ski", icon: Snowflake, name: "Ski alpin et nordique", info: "Lans-en-Vercors · 10 min" },
  { kind: "lake", icon: Waves, name: "Lac de Monteynard", info: "Baignade et passerelles · 45 min" },
  { kind: "kitchen", icon: ShoppingBasket, name: "Marché du dimanche", info: "Fromages et bleu du Vercors · 5 min" },
];

export const StayRegion = () => (
  <Page active="La région">
    <div className="px-10 pt-8">
      <Title eyebrow="La région" center>
        Que faire autour du gîte ?
      </Title>
      <div className="grid grid-cols-4 gap-5">
        {ideas.map(({ kind, icon: Icon, name, info }) => (
          <div key={name}>
            <div className="mb-3 h-[250px] overflow-hidden rounded-2xl">
              <StayPhoto kind={kind} />
            </div>
            <p className="mb-1 flex items-center gap-2 font-display text-[18px] font-medium">
              <Icon className="h-4 w-4 text-[#b5653f]" />
              {name}
            </p>
            <p className="text-[13px] text-[#8a8170]">{info}</p>
          </div>
        ))}
      </div>
    </div>
  </Page>
);

export const StayBooking = () => (
  <Page>
    <div className="grid grid-cols-[1.2fr_0.8fr] gap-8 px-10 pt-8">
      <div className="rounded-2xl border border-[#e6dccb] bg-white p-7">
        <Title eyebrow="Réservation">Demande de réservation</Title>
        <div className="mb-4 grid grid-cols-3 gap-3 text-[14px]">
          {[
            ["Arrivée", "19/12/2026"],
            ["Départ", "26/12/2026"],
            ["Voyageurs", "8"],
          ].map(([l, v]) => (
            <div key={l}>
              <p className="mb-1.5 text-[12px] font-semibold">{l}</p>
              <p className="rounded-lg border border-[#e0d6c4] px-3 py-2.5">{v}</p>
            </div>
          ))}
        </div>
        <div className="mb-4 grid grid-cols-2 gap-3 text-[14px]">
          {[
            ["Nom", "Famille Morel"],
            ["E-mail", "morel@exemple.fr"],
          ].map(([l, v]) => (
            <div key={l}>
              <p className="mb-1.5 text-[12px] font-semibold">{l}</p>
              <p className="rounded-lg border border-[#e0d6c4] px-3 py-2.5">{v}</p>
            </div>
          ))}
        </div>
        <p className="mb-1.5 text-[12px] font-semibold">Message</p>
        <p className="mb-5 h-[76px] rounded-lg border border-[#e0d6c4] px-3 py-2.5 text-[14px] text-[#5e584c]">
          Bonjour, nous venons pour Noël avec nos deux enfants. Est-il possible d'arriver vers 18 h ?
        </p>
        <span className="block rounded-full bg-[#b5653f] py-3 text-center text-[14px] font-semibold text-white">Envoyer ma demande</span>
      </div>
      <div className="rounded-2xl bg-[#efe7da] p-6">
        <div className="mb-4 h-[130px] overflow-hidden rounded-xl">
          <StayPhoto kind="chalet" />
        </div>
        <p className="mb-4 font-display text-[20px] font-medium">Votre séjour</p>
        <div className="space-y-2 text-[14px]">
          {[
            ["7 nuits × 220 €", "1 540 €"],
            ["Ménage", "Inclus"],
            ["Taxe de séjour", "42 €"],
            ["Frais de service", "0 €"],
          ].map(([l, v]) => (
            <p key={l} className="flex justify-between">
              <span className="text-[#5e584c]">{l}</span>
              <span>{v}</span>
            </p>
          ))}
          <p className="flex justify-between border-t border-[#d9cdb9] pt-3 text-[16px] font-semibold">
            <span>Total</span>
            <span>1 582 €</span>
          </p>
        </div>
        <p className="mt-4 rounded-lg bg-[#7f8f6e] px-3 py-2 text-center text-[12px] font-semibold text-white">
          Réservation en direct, sans commission
        </p>
      </div>
    </div>
  </Page>
);

// Same order as the trade's pages in server/src/content/landings.ts
export const giteScreens = [
  <StayHome key="home" />,
  <StayHouse key="house" />,
  <StayRates key="rates" />,
  <StayRegion key="region" />,
  <StayBooking key="book" />,
];
