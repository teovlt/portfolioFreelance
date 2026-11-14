import { useId, type ReactNode } from "react";
import { CalendarCheck, Clock, MapPin, Minus, Phone, Plus, Train, Car, Users, Wine } from "lucide-react";
import { cn } from "@/lib/utils";

// The site of a made-up Grenoble bistro, drawn at desktop size (1024 × 640)
// and scaled down by ScaledFrame. Wine, cream and mustard, whatever the page
// theme, like a screenshot of a real client's site

const brand = { name: "Le Petit Bistrot", phone: "04 76 87 21 09", address: "14 rue Champollion, Grenoble" };

// ---------------------------------------------------------------------------
// Illustrations standing in for the restaurant's photos

export type DinerKind = "room" | "dish" | "terrace" | "wine" | "dessert";

export const DinerPhoto = ({ kind, className }: { kind: DinerKind; className?: string }) => {
  const id = `d${useId().replace(/:/g, "")}`;
  const common = { viewBox: "0 0 400 300", preserveAspectRatio: "xMidYMid slice", className: cn("block h-full w-full", className) };

  if (kind === "room")
    return (
      <svg {...common}>
        <defs>
          <radialGradient id={`${id}-l`}>
            <stop offset="0" stopColor="#ffd98a" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill="#3b2320" />
        <rect y="150" width="400" height="70" fill="#5a2a27" />
        <path d="M0 150 H400" stroke="#c99a52" strokeWidth="3" />
        <rect y="220" width="400" height="80" fill="#6b4a33" />
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M${i * 44} 220 L${i * 44 - 30} 300`} stroke="#000" strokeOpacity="0.15" />
        ))}
        <rect x="150" y="40" width="100" height="70" rx="4" fill="#1e1a18" stroke="#c99a52" strokeWidth="4" />
        <path d="M165 60 H220 M165 75 H235 M165 90 H210" stroke="#f3ead8" strokeOpacity="0.7" strokeWidth="3" />
        {[70, 200, 330].map((x) => (
          <g key={x}>
            <path d={`M${x} 0 V48`} stroke="#1e1a18" strokeWidth="2" />
            <circle cx={x} cy="70" r="60" fill={`url(#${id}-l)`} />
            <path d={`M${x - 14} 58 Q${x} 40 ${x + 14} 58 Z`} fill="#c99a52" />
            <ellipse cx={x} cy={196} rx="52" ry="12" fill="#f4ede0" />
            <path d={`M${x - 46} 198 L${x - 40} 236 H${x + 40} L${x + 46} 198`} fill="#efe6d6" />
            <path d={`M${x} 236 V262`} stroke="#2a1d18" strokeWidth="5" />
            <circle cx={x - 18} cy="186" r="5" fill="#a8323e" opacity="0.85" />
            <rect x={x + 10} y="174" width="6" height="16" rx="2" fill="#2f5a3b" />
          </g>
        ))}
      </svg>
    );

  if (kind === "dish")
    return (
      <svg {...common}>
        <rect width="400" height="300" fill="#6b4a33" />
        {Array.from({ length: 8 }, (_, i) => (
          <path
            key={i}
            d={`M0 ${i * 40 + 10} C120 ${i * 40} 260 ${i * 40 + 18} 400 ${i * 40 + 6}`}
            stroke="#000"
            strokeOpacity="0.12"
            fill="none"
          />
        ))}
        <circle cx="200" cy="150" r="112" fill="#f7f3ea" />
        <circle cx="200" cy="150" r="84" fill="#fffdf8" stroke="#e8dfcf" strokeWidth="2" />
        <path d="M150 140 C170 110 240 112 258 140 C240 168 170 170 150 140 Z" fill="#e8916d" />
        <path d="M160 140 C185 128 225 128 248 140" stroke="#f6c3a8" strokeWidth="3" fill="none" />
        <circle cx="175" cy="182" r="14" fill="#e3b85c" />
        <circle cx="196" cy="190" r="12" fill="#ecc66d" />
        <circle cx="218" cy="184" r="13" fill="#e3b85c" />
        {[
          [236, 175],
          [246, 186],
          [160, 118],
          [252, 120],
        ].map(([x, y]) => (
          <ellipse key={`${x}${y}`} cx={x} cy={y} rx="8" ry="4" fill="#5d8a46" transform={`rotate(-30 ${x} ${y})`} />
        ))}
        <rect x="335" y="60" width="10" height="180" rx="5" fill="#cfcac0" />
        <rect x="55" y="60" width="10" height="180" rx="5" fill="#cfcac0" />
        <path d="M50 60 V95 M60 60 V95 M70 60 V95" stroke="#cfcac0" strokeWidth="4" />
      </svg>
    );

  if (kind === "terrace")
    return (
      <svg {...common}>
        <rect width="400" height="300" fill="#e9dcc6" />
        <rect y="0" width="400" height="200" fill="#d8c6a6" />
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={i} x={i * 70 + 10} y="20" width="40" height="60" fill="#5e4a3a" opacity="0.5" />
        ))}
        <rect x="30" y="96" width="340" height="104" fill="#5b1a24" />
        <rect x="70" y="116" width="110" height="84" fill="#2e1f1a" />
        <rect x="220" y="116" width="110" height="84" fill="#2e1f1a" />
        <path d="M80 160 H170 M230 160 H320" stroke="#ffd98a" strokeOpacity="0.5" strokeWidth="20" />
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M${20 + i * 36} 90 h36 l-6 26 h-24 z`} fill={i % 2 ? "#f4ede0" : "#7b2232"} />
        ))}
        <rect y="200" width="400" height="100" fill="#cbbba1" />
        {[90, 200, 310].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="236" rx="30" ry="7" fill="#f4ede0" />
            <path d={`M${x} 236 V270`} stroke="#2a1d18" strokeWidth="4" />
            <path
              d={`M${x - 46} 250 V280 M${x - 46} 250 H${x - 32} M${x + 46} 250 V280 M${x + 46} 250 H${x + 32}`}
              stroke="#2a1d18"
              strokeWidth="3"
            />
          </g>
        ))}
      </svg>
    );

  if (kind === "wine")
    return (
      <svg {...common}>
        <rect width="400" height="300" fill="#2e1d1a" />
        <rect y="210" width="400" height="90" fill="#6b4a33" />
        {[
          [110, "#5b1a24"],
          [160, "#c4a24e"],
        ].map(([x, c]) => (
          <g key={String(x)}>
            <path d={`M${x} 90 h50 l-4 40 a21 21 0 0 1 -42 0 z`} fill="#f4ede0" fillOpacity="0.25" stroke="#f4ede0" strokeOpacity="0.6" />
            <path d={`M${Number(x) + 3} 112 h44 l-2 18 a20 20 0 0 1 -40 0 z`} fill={String(c)} />
            <path
              d={`M${Number(x) + 25} 150 V205 M${Number(x) + 8} 208 H${Number(x) + 42}`}
              stroke="#f4ede0"
              strokeOpacity="0.6"
              strokeWidth="3"
            />
          </g>
        ))}
        <rect x="260" y="60" width="44" height="150" rx="10" fill="#1d2e22" />
        <rect x="272" y="30" width="20" height="40" fill="#1d2e22" />
        <rect x="264" y="110" width="36" height="46" fill="#f1e6cf" />
        <path d="M270 124 H294 M270 134 H290" stroke="#5b1a24" strokeWidth="3" />
      </svg>
    );

  return (
    <svg {...common}>
      <rect width="400" height="300" fill="#e7d8c0" />
      <circle cx="200" cy="160" r="110" fill="#fbf8f2" />
      <path d="M140 190 L200 100 L260 190 Z" fill="#b8763d" />
      <path d="M150 180 L200 112 L250 180" fill="#7a4a24" />
      {[
        [180, 150],
        [205, 140],
        [220, 165],
        [190, 170],
      ].map(([x, y]) => (
        <ellipse key={`${x}${y}`} cx={x} cy={y} rx="9" ry="6" fill="#d9b57a" />
      ))}
      <circle cx="270" cy="200" r="16" fill="#fff" />
      <path d="M120 230 C160 220 240 222 280 230" stroke="#5b1a24" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
};

// ---------------------------------------------------------------------------

const Header = ({ active, dark }: { active?: string; dark?: boolean }) => (
  <div
    className={cn(
      "flex h-[64px] items-center justify-between px-10",
      dark ? "absolute inset-x-0 top-0 z-10 text-white" : "border-b border-[#eadfce] bg-[#fbf6ee]",
    )}
  >
    <span className="font-display text-[22px] italic font-semibold">{brand.name}</span>
    <nav className="flex gap-8 text-[14px] font-medium">
      {["La carte", "Événements", "Accès"].map((l) => (
        <span
          key={l}
          className={cn(l === active && "underline decoration-[#d9a441] decoration-2 underline-offset-8", dark && "opacity-90")}
        >
          {l}
        </span>
      ))}
    </nav>
    <span
      className={cn("rounded-full px-5 py-2.5 text-[13px] font-semibold", dark ? "bg-[#d9a441] text-[#2a1a12]" : "bg-[#5b1a24] text-white")}
    >
      Réserver une table
    </span>
  </div>
);

const Page = ({ active, children }: { active?: string; children: ReactNode }) => (
  <div className="h-full bg-[#fbf6ee] font-sans text-[#221a17]">
    <Header active={active} />
    {children}
  </div>
);

const Title = ({ eyebrow, children }: { eyebrow: string; children: ReactNode }) => (
  <div className="mb-6">
    <p className="mb-1 text-[12px] font-semibold uppercase tracking-[0.25em] text-[#a8323e]">{eyebrow}</p>
    <p className="font-display text-[34px] italic font-semibold leading-tight">{children}</p>
  </div>
);

export const DinerHome = () => (
  <div className="relative h-full overflow-hidden font-sans text-white">
    <div className="absolute inset-0">
      <DinerPhoto kind="room" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
    <Header dark />
    <div className="relative flex h-[490px] flex-col items-center justify-center text-center">
      <p className="mb-3 text-[13px] uppercase tracking-[0.4em] text-[#f1d39a]">Cuisine de marché · depuis 2014</p>
      <p className="font-display text-[72px] italic font-semibold leading-none mb-4">{brand.name}</p>
      <p className="mb-8 max-w-[480px] text-[17px] opacity-90">
        Une carte courte qui change avec les saisons, des vins de petits domaines, au cœur de Grenoble.
      </p>
      <div className="flex gap-3">
        <span className="rounded-full bg-[#d9a441] px-7 py-3.5 text-[15px] font-semibold text-[#2a1a12]">Réserver une table</span>
        <span className="rounded-full border border-white/60 px-7 py-3.5 text-[15px] font-semibold">Voir la carte</span>
      </div>
    </div>
    <div className="absolute inset-x-0 bottom-0 flex h-[86px] items-center justify-center gap-12 bg-[#5b1a24] text-[14px]">
      <span className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#7bd88f]" />
        Ouvert ce soir · 19 h – 22 h 30
      </span>
      <span className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-[#d9a441]" />
        {brand.address}
      </span>
      <span className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-[#d9a441]" />
        {brand.phone}
      </span>
    </div>
  </div>
);

const menu = [
  ["Ravioles du Royans", "Crème de cèpes, noisettes torréfiées", "9 €", ["Gluten", "Lait"]],
  ["Velouté de courge", "Châtaignes, huile de noix", "7 €", ["Fruits à coque"]],
  ["Terrine de campagne", "Pickles maison, pain au levain", "8 €", ["Gluten"]],
  ["Œuf parfait", "Crème de Beaufort, lard croustillant", "10 €", ["Œuf", "Lait"]],
] as const;

export const DinerMenu = () => (
  <Page active="La carte">
    <div className="grid grid-cols-[1.35fr_0.65fr] gap-10 px-10 pt-8">
      <div>
        <Title eyebrow="Automne 2026">La carte</Title>
        <div className="mb-6 flex gap-6 border-b border-[#eadfce] text-[14px] font-semibold">
          {["Entrées", "Plats", "Desserts", "Vins"].map((t, i) => (
            <span key={t} className={cn("pb-3", i === 0 ? "border-b-2 border-[#5b1a24] text-[#5b1a24]" : "text-[#8a7b6e]")}>
              {t}
            </span>
          ))}
        </div>
        <ul className="space-y-5">
          {menu.map(([dish, desc, price, tags]) => (
            <li key={dish}>
              <p className="flex items-baseline gap-3">
                <span className="font-display text-[19px] font-semibold">{dish}</span>
                <span className="flex-1 -translate-y-1 border-b border-dotted border-[#cdbfa9]" />
                <span className="text-[16px] font-semibold">{price}</span>
              </p>
              <p className="mt-0.5 flex items-center gap-2 text-[13px] text-[#7a6c5f]">
                {desc}
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[#f1e7d6] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#7a5a2e]"
                  >
                    {t}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <div className="h-[220px] overflow-hidden rounded-lg">
          <DinerPhoto kind="dish" />
        </div>
        <div className="rounded-lg bg-[#5b1a24] p-5 text-white">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#f1d39a] mb-1">Le midi, en semaine</p>
          <p className="font-display text-[26px] italic font-semibold">Entrée, plat, dessert · 21 €</p>
          <p className="text-[13px] opacity-80 mt-1">Ardoise du jour, selon le marché</p>
        </div>
      </div>
    </div>
  </Page>
);

const days = Array.from({ length: 30 }, (_, i) => i + 1);

export const DinerBooking = () => (
  <Page>
    <div className="grid grid-cols-[1.25fr_0.75fr] gap-8 px-10 pt-8">
      <div className="rounded-xl border border-[#eadfce] bg-white p-7">
        <Title eyebrow="Réservation">Réserver une table</Title>
        <div className="grid grid-cols-[1fr_1fr] gap-7">
          <div>
            <p className="mb-2 text-[13px] font-semibold">Novembre 2026</p>
            <div className="grid grid-cols-7 gap-1 text-center text-[12px]">
              {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                <span key={i} className="pb-1 text-[#8a7b6e]">
                  {d}
                </span>
              ))}
              {[null, null, null, null, null, null, ...days].map((d, i) => (
                <span
                  key={i}
                  className={cn(
                    "rounded-md py-1.5",
                    d === 21 && "bg-[#5b1a24] font-semibold text-white",
                    d !== null && d < 14 && "text-[#cdbfa9]",
                    d !== null && i % 7 === 0 && "text-[#cdbfa9] line-through",
                  )}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[13px] font-semibold">Couverts</p>
            <div className="mb-5 flex items-center justify-between rounded-md border border-[#e0d4c1] px-3 py-2">
              <Minus className="h-4 w-4 text-[#8a7b6e]" />
              <span className="flex items-center gap-2 text-[15px] font-semibold">
                <Users className="h-4 w-4" />4 personnes
              </span>
              <Plus className="h-4 w-4" />
            </div>
            <p className="mb-2 text-[13px] font-semibold">Samedi 21 novembre, le soir</p>
            <div className="mb-5 grid grid-cols-3 gap-2 text-[13px] font-semibold">
              {["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"].map((s, i) => (
                <span
                  key={s}
                  className={cn(
                    "rounded-md border py-2 text-center",
                    i === 2
                      ? "border-[#5b1a24] bg-[#5b1a24] text-white"
                      : i === 3
                        ? "border-dashed border-[#e0d4c1] text-[#cdbfa9] line-through"
                        : "border-[#e0d4c1]",
                  )}
                >
                  {s}
                </span>
              ))}
            </div>
            <span className="block rounded-full bg-[#5b1a24] py-3 text-center text-[14px] font-semibold text-white">
              Confirmer pour 20:00
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-[230px] overflow-hidden rounded-xl">
          <DinerPhoto kind="room" />
        </div>
        <div className="rounded-xl bg-[#f1e7d6] p-5 text-[13px] leading-relaxed">
          <p className="mb-1 flex items-center gap-2 font-semibold">
            <CalendarCheck className="h-4 w-4 text-[#5b1a24]" />
            Confirmation par SMS
          </p>
          Plus de 8 personnes ? Appelez-nous au <b>{brand.phone}</b>, on vous prépare un menu de groupe.
        </div>
      </div>
    </div>
  </Page>
);

const events: { kind: DinerKind; date: string; name: string; text: string }[] = [
  {
    kind: "wine",
    date: "Jeu. 26 nov.",
    name: "Soirée vins nature",
    text: "Quatre vignerons de Savoie, une assiette par vin. 45 € par personne.",
  },
  {
    kind: "room",
    date: "Toute l'année",
    name: "Privatisation",
    text: "La salle jusqu'à 40 personnes, pour un anniversaire ou un repas d'équipe.",
  },
  {
    kind: "dessert",
    date: "Dès 10 personnes",
    name: "Menus de groupe",
    text: "Trois menus au choix, de 32 à 48 €, adaptables aux régimes de chacun.",
  },
];

export const DinerEvents = () => (
  <Page active="Événements">
    <div className="px-10 pt-8">
      <Title eyebrow="Au bistrot">Soirées & événements</Title>
      <div className="grid grid-cols-3 gap-6">
        {events.map((e) => (
          <div key={e.name} className="overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_-12px_rgba(60,20,20,0.25)]">
            <div className="relative h-[170px]">
              <DinerPhoto kind={e.kind} />
              <span className="absolute left-3 top-3 rounded-full bg-[#fbf6ee] px-3 py-1 text-[12px] font-semibold text-[#5b1a24]">
                {e.date}
              </span>
            </div>
            <div className="p-5">
              <p className="font-display text-[21px] italic font-semibold mb-1.5">{e.name}</p>
              <p className="text-[13px] leading-relaxed text-[#7a6c5f] mb-4">{e.text}</p>
              <span className="text-[13px] font-semibold text-[#5b1a24] underline underline-offset-4">Demander une date</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Page>
);

export const DinerAccess = () => (
  <Page active="Accès">
    <div className="grid grid-cols-[0.85fr_1.15fr] gap-10 px-10 pt-8">
      <div>
        <Title eyebrow="Nous trouver">Accès & horaires</Title>
        <p className="mb-5 flex items-start gap-3 text-[15px]">
          <MapPin className="mt-0.5 h-5 w-5 text-[#a8323e]" />
          {brand.address}
        </p>
        <div className="mb-6 space-y-2.5 text-[14px] text-[#5e5047]">
          <p className="flex items-center gap-3">
            <Train className="h-4 w-4" /> Tram A et B · arrêt Hubert Dubedout
          </p>
          <p className="flex items-center gap-3">
            <Car className="h-4 w-4" /> Parking Philippeville, à 3 min à pied
          </p>
          <p className="flex items-center gap-3">
            <Wine className="h-4 w-4" /> Terrasse chauffée l'hiver
          </p>
        </div>
        <table className="w-full text-[14px]">
          <tbody>
            {[
              ["Mardi – vendredi", "12 h – 14 h · 19 h – 22 h 30"],
              ["Samedi", "19 h – 23 h"],
              ["Dimanche, lundi", "Fermé"],
            ].map(([d, h]) => (
              <tr key={d} className="border-b border-[#eadfce]">
                <td className="py-2.5 font-semibold">{d}</td>
                <td className={cn("py-2.5 text-right", h === "Fermé" ? "text-[#a8323e]" : "text-[#5e5047]")}>{h}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <span className="mt-6 flex w-fit items-center gap-2 rounded-full bg-[#5b1a24] px-5 py-3 text-[14px] font-semibold text-white">
          <Phone className="h-4 w-4" /> Appeler le bistrot
        </span>
      </div>
      <div className="relative h-[480px] overflow-hidden rounded-xl bg-[#efe8dc]">
        <svg viewBox="0 0 500 480" className="absolute inset-0 h-full w-full">
          {[60, 150, 250, 350, 440].map((x) => (
            <path key={x} d={`M${x} 0 V480`} stroke="#fff" strokeWidth="14" />
          ))}
          {[70, 180, 300, 410].map((y) => (
            <path key={y} d={`M0 ${y} H500`} stroke="#fff" strokeWidth="14" />
          ))}
          <path d="M0 260 C140 240 300 250 500 220" stroke="#fff" strokeWidth="22" />
          <path d="M0 260 C140 240 300 250 500 220" stroke="#6a8fb8" strokeWidth="4" strokeDasharray="10 6" />
          <rect x="370" y="90" width="60" height="70" rx="6" fill="#c9dbbd" />
          <rect x="70" y="320" width="70" height="80" rx="6" fill="#c9dbbd" />
          <circle cx="256" cy="248" r="8" fill="#fff" stroke="#6a8fb8" strokeWidth="4" />
          <path d="M250 140 c0 -24 34 -24 34 0 c0 18 -17 34 -17 34 s-17 -16 -17 -34 z" fill="#5b1a24" />
          <circle cx="267" cy="140" r="6" fill="#fff" />
        </svg>
        <span className="absolute left-[280px] top-[96px] rounded-md bg-white px-3 py-1.5 text-[13px] font-semibold shadow">
          {brand.name}
        </span>
        <span className="absolute left-[200px] top-[270px] flex items-center gap-1 rounded bg-[#6a8fb8] px-2 py-1 text-[11px] font-semibold text-white">
          <Clock className="h-3 w-3" /> Tram · 2 min
        </span>
      </div>
    </div>
  </Page>
);

// Same order as the trade's pages in server/src/content/landings.ts
export const restaurantScreens = [
  <DinerHome key="home" />,
  <DinerMenu key="menu" />,
  <DinerBooking key="book" />,
  <DinerEvents key="events" />,
  <DinerAccess key="access" />,
];
