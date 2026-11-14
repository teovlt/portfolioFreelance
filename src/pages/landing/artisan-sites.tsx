import { useId, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, FileText, MapPin, Phone, ShieldCheck, Star, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

// Two sites for the same made-up joiner, drawn at desktop size (1024 × 640)
// and scaled down by ScaledFrame: the kind of site many craftsmen still have,
// and the one I'd make them. They keep their own colors whatever the page
// theme, like screenshots of real sites would.

const brand = {
  name: "Martin Menuiserie",
  phone: "04 76 12 34 56",
};

// ---------------------------------------------------------------------------
// Illustrations standing in for site photos: warm wood, flat but detailed
// enough to read as kitchens, stairs and doors at thumbnail size

export type SceneKind = "kitchen" | "stairs" | "door" | "dressing" | "terrace" | "window";

const Wood = ({ id, tone = "oak" }: { id: string; tone?: "oak" | "walnut" | "pale" }) => {
  const [a, b] = { oak: ["#c99a68", "#a97b4f"], walnut: ["#7a5236", "#5c3b25"], pale: ["#e2c8a2", "#c9a87c"] }[tone];
  return (
    <defs>
      <linearGradient id={`${id}-g`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor={a} />
        <stop offset="1" stopColor={b} />
      </linearGradient>
      <pattern id={`${id}-p`} width="40" height="12" patternUnits="userSpaceOnUse">
        <rect width="40" height="12" fill={`url(#${id}-g)`} />
        <path d="M0 4 C10 2 20 6 40 3 M0 9 C14 11 26 7 40 10" stroke="#000" strokeOpacity="0.08" fill="none" />
      </pattern>
    </defs>
  );
};

export const Scene = ({ kind, className }: { kind: SceneKind; className?: string }) => {
  const id = `w${useId().replace(/:/g, "")}`;
  const wood = `url(#${id}-p)`;
  const common = { viewBox: "0 0 400 300", preserveAspectRatio: "xMidYMid slice", className: cn("block h-full w-full", className) };

  if (kind === "kitchen")
    return (
      <svg {...common}>
        <Wood id={id} />
        <rect width="400" height="300" fill="#efe7da" />
        <rect y="235" width="400" height="65" fill="#d9c6a8" />
        <rect x="150" y="38" width="100" height="78" fill="#dbe8ee" stroke="#8c6a48" strokeWidth="6" />
        <path d="M200 38 V116 M150 77 H250" stroke="#8c6a48" strokeWidth="3" />
        <rect x="20" y="30" width="115" height="80" fill={wood} />
        <rect x="265" y="30" width="115" height="80" fill={wood} />
        <path d="M77 30 V110 M322 30 V110" stroke="#000" strokeOpacity="0.15" strokeWidth="2" />
        <rect x="10" y="150" width="380" height="12" fill="#3a3330" />
        <rect x="20" y="162" width="360" height="80" fill={wood} />
        {[110, 200, 290].map((x) => (
          <path key={x} d={`M${x} 162 V242`} stroke="#000" strokeOpacity="0.15" strokeWidth="2" />
        ))}
        {[65, 155, 245, 335].map((x) => (
          <rect key={x} x={x - 12} y="172" width="24" height="3" rx="1.5" fill="#2b2522" />
        ))}
        <rect x="175" y="132" width="50" height="18" rx="3" fill="#cfd6d8" />
        <path d="M300 150 C300 120 330 118 330 140" stroke="#5d7a55" strokeWidth="8" fill="none" strokeLinecap="round" />
        <rect x="292" y="135" width="22" height="15" rx="2" fill="#f4efe7" />
      </svg>
    );

  if (kind === "stairs")
    return (
      <svg {...common}>
        <Wood id={id} />
        <rect width="400" height="300" fill="#ebe3d5" />
        <rect y="260" width="400" height="40" fill="#cdb796" />
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i}>
            <rect x={70 + i * 32} y={250 - i * 26} width="34" height="10" fill={wood} />
            <rect x={70 + i * 32} y={260 - i * 26} width="34" height="16" fill="#f7f3ec" />
          </g>
        ))}
        <path d="M80 200 L370 -30" stroke="#5c3b25" strokeWidth="7" strokeLinecap="round" />
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${86 + i * 32} ${250 - i * 26} V${196 - i * 25.5}`} stroke="#5c3b25" strokeWidth="3" />
        ))}
        <rect x="20" y="60" width="40" height="60" fill="#dbe8ee" stroke="#fff" strokeWidth="4" />
      </svg>
    );

  if (kind === "door")
    return (
      <svg {...common}>
        <Wood id={id} tone="walnut" />
        <rect width="400" height="300" fill="#e7dfd1" />
        <rect y="262" width="400" height="38" fill="#b9a382" />
        <rect x="132" y="30" width="136" height="236" fill="#f3eee6" />
        <rect x="142" y="40" width="116" height="226" fill={wood} />
        {[
          [154, 54, 40, 80],
          [206, 54, 40, 80],
          [154, 148, 40, 104],
          [206, 148, 40, 104],
        ].map(([x, y, w, h]) => (
          <rect key={`${x}${y}`} x={x} y={y} width={w} height={h} fill="none" stroke="#000" strokeOpacity="0.22" strokeWidth="3" />
        ))}
        <circle cx="246" cy="150" r="5" fill="#d8b46a" />
        <rect x="40" y="200" width="44" height="62" rx="4" fill="#5d7a55" />
        <ellipse cx="62" cy="190" rx="34" ry="28" fill="#6f8f63" />
        <rect x="300" y="236" width="70" height="26" fill="#8c6a48" />
      </svg>
    );

  if (kind === "dressing")
    return (
      <svg {...common}>
        <Wood id={id} tone="pale" />
        <rect width="400" height="300" fill="#efe9df" />
        <rect y="262" width="400" height="38" fill="#cdb796" />
        <rect x="50" y="26" width="300" height="236" fill="#f8f5ef" stroke="#d6c6ad" strokeWidth="4" />
        <rect x="54" y="30" width="96" height="228" fill={wood} />
        <rect x="250" y="30" width="96" height="228" fill={wood} />
        <path d="M150 30 V258 M250 30 V258" stroke="#000" strokeOpacity="0.15" strokeWidth="2" />
        <path d="M160 60 H240" stroke="#8c6a48" strokeWidth="3" />
        {[
          ["#3f5a73", 166],
          ["#c4a484", 184],
          ["#7c8f6b", 202],
          ["#e5ded2", 220],
        ].map(([c, x]) => (
          <rect key={x} x={Number(x)} y="62" width="14" height="70" rx="3" fill={String(c)} />
        ))}
        {[160, 200].map((y) => (
          <rect key={y} x="156" y={y} width="88" height="6" fill="#c9a87c" />
        ))}
        <rect x="166" y="170" width="30" height="28" fill="#b65f4a" />
        <rect x="204" y="176" width="30" height="22" fill="#e5ded2" />
        <rect x="140" y="130" width="4" height="30" rx="2" fill="#6b5a45" />
        <rect x="256" y="130" width="4" height="30" rx="2" fill="#6b5a45" />
      </svg>
    );

  if (kind === "terrace")
    return (
      <svg {...common}>
        <Wood id={id} />
        <rect width="400" height="300" fill="#cfe1e8" />
        <path d="M0 150 L80 90 L150 130 L240 70 L330 125 L400 95 V170 H0 Z" fill="#9db293" />
        <rect y="160" width="400" height="20" fill="#7f9a72" />
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d={`M${200 - (i - 3.5) * 22} 180 L${200 - (i - 3.5) * 70} 300`} stroke="#7a5236" strokeWidth="2" />
        ))}
        <path d="M0 180 H400 V300 H0 Z" fill={wood} opacity="0.95" />
        {Array.from({ length: 6 }, (_, i) => (
          <path key={i} d={`M0 ${190 + i * i * 3.4} H400`} stroke="#5c3b25" strokeOpacity="0.35" strokeWidth="2" />
        ))}
        <rect x="250" y="196" width="70" height="8" fill="#f3eee6" />
        <path d="M258 204 V236 M312 204 V236" stroke="#f3eee6" strokeWidth="4" />
      </svg>
    );

  return (
    <svg {...common}>
      <Wood id={id} />
      <rect width="400" height="300" fill="#e9e1d4" />
      <rect x="110" y="40" width="180" height="200" fill={wood} />
      <rect x="124" y="54" width="70" height="172" fill="#d6e6ee" />
      <rect x="206" y="54" width="70" height="172" fill="#d6e6ee" />
      <path d="M124 140 H194 M206 140 H276" stroke="#a97b4f" strokeWidth="4" />
      <rect x="96" y="240" width="208" height="12" fill="#f4efe7" />
      <path d="M140 70 L170 110 M226 70 L256 110" stroke="#fff" strokeOpacity="0.7" strokeWidth="6" />
    </svg>
  );
};

// ---------------------------------------------------------------------------
// The site as many craftsmen still have it: made in 2009, never touched since

const marquee = "★ NOUVEAU : nous réalisons aussi les cuisines !!! ★ Devis gratuit ★ Bienvenue sur notre site ★";

export const OldSite = () => (
  <div className="h-full bg-[#ffffcc] text-black font-['Times_New_Roman',Times,serif] text-[15px] leading-snug">
    <div className="bg-[#003399] border-b-4 border-[#ffcc00] px-6 py-4 text-center">
      <p className="font-['Comic_Sans_MS','Comic_Sans',cursive] text-[40px] font-bold text-[#ffcc00] [text-shadow:3px_3px_0_#cc0000]">
        MARTIN MENUISERIE
      </p>
      <p className="text-white italic text-[14px]">Menuiserie - Ebénisterie - Agencement - Parquets - Escaliers - Placards - Fenêtres</p>
    </div>
    <div className="overflow-hidden bg-[#cc0000] py-1 text-[14px] font-bold text-[#ffff00] whitespace-nowrap">
      <motion.p animate={{ x: ["0%", "-50%"] }} transition={{ duration: 18, ease: "linear", repeat: Infinity }} className="w-max">
        {marquee}&nbsp;&nbsp;&nbsp;{marquee}&nbsp;&nbsp;&nbsp;{marquee}&nbsp;&nbsp;&nbsp;{marquee}
      </motion.p>
    </div>
    <div className="grid grid-cols-[190px_1fr] gap-0 border-b-2 border-[#999]">
      <div className="bg-[#ccccff] border-r-2 border-[#999] p-3 space-y-2 min-h-[420px]">
        <p className="font-bold text-[#000080] underline">MENU</p>
        {["Accueil", "Qui sommes-nous ?", "Nos travaux", "Nos tarifs", "Plan d'accès", "Livre d'or", "Contact"].map((l) => (
          <p key={l} className="text-[#0000ee] underline">
            » {l}
          </p>
        ))}
        <div className="mt-6 border-2 border-black bg-[repeating-linear-gradient(-45deg,#ffcc00_0_10px,#000_10px_20px)] p-1">
          <p className="bg-[#ffcc00] px-1 text-center text-[12px] font-bold">SITE EN CONSTRUCTION</p>
        </div>
        <div className="mt-6 text-center text-[12px]">
          <p>Vous êtes le</p>
          <p className="my-1 inline-flex gap-px bg-black p-1 font-mono text-[16px] text-[#33ff33]">
            {"004521".split("").map((d, i) => (
              <span key={i} className="border border-[#333] px-1">
                {d}
              </span>
            ))}
          </p>
          <p>ème visiteur !</p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-center text-[26px] font-bold text-[#cc0000] underline mb-3">Bienvenue sur notre site !!</p>
        <div className="grid grid-cols-[1fr_200px] gap-4">
          <p className="text-justify">
            L'entreprise MARTIN MENUISERIE a été créée en 1998 et est situé à Meylan. Nous réalisons tous travaux de menuiserie intérieure
            et extérieure pour les particuliers et les professionnels. Fenêtres bois et PVC, portes, volets, escaliers, placards, parquets,
            agencement de cuisines et salles de bains, etc... Nous intervenons dans toute la région grenobloise et alentours. N'hésitez pas
            à nous contacter pour tout renseignement complémentaire. Toute l'équipe vous remercie de votre visite et à bientôt !!!
          </p>
          <div className="border-2 border-[#808080] border-r-white border-b-white bg-white p-2 text-center text-[12px] text-[#555] h-[150px] flex flex-col items-center justify-center">
            <span className="mb-2 inline-block h-5 w-5 border border-[#999] bg-[linear-gradient(135deg,#eee_45%,#c00_45%_55%,#eee_55%)]" />
            photo_atelier_2008.JPG
          </div>
        </div>
        <p className="mt-4 text-[#0000ee] underline">Cliquez ici pour voir nos réalisations (photos)</p>
        <hr className="my-4 border-[#999]" />
        <p className="text-[14px]">
          Pour tout devis, téléphonez nous aux heures de bureau ou envoyez un mail à :{" "}
          <span className="text-[#0000ee] underline">martin.menuiserie@wanadoo.fr</span>
        </p>
      </div>
    </div>
    <p className="px-4 py-2 text-center text-[11px] text-[#666]">
      © 2009 Martin Menuiserie - Site optimisé pour Internet Explorer 6 en 1024x768 - Dernière mise à jour le 12/03/2011
    </p>
  </div>
);

// ---------------------------------------------------------------------------
// The same joiner, redone: oak, forest green and cream, phone always in view

const c = {
  ink: "text-[#1c1917]",
  muted: "text-[#6b6258]",
};

const Logo = () => (
  <span className="flex items-center gap-2.5">
    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1f3a2e] font-display text-[18px] font-semibold text-[#e9d2b0]">
      M
    </span>
    <span className="leading-tight">
      <span className="block font-display text-[17px] font-semibold">{brand.name}</span>
      <span className={cn("block text-[11px] tracking-wide", c.muted)}>Meylan · depuis 1998</span>
    </span>
  </span>
);

const nav = ["Accueil", "Prestations", "Réalisations", "Zones", "Devis"];

const Header = ({ active }: { active: string }) => (
  <div className="flex h-[68px] items-center justify-between border-b border-[#e7dfd3] bg-[#fbf8f3] px-10">
    <Logo />
    <nav className="flex gap-7 text-[14px] font-medium">
      {nav.slice(0, 4).map((l) => (
        <span key={l} className={cn("relative py-1", l === active ? "text-[#1f3a2e]" : c.muted)}>
          {l}
          {l === active && <span className="absolute inset-x-0 -bottom-[3px] h-[2px] rounded-full bg-[#b5835a]" />}
        </span>
      ))}
    </nav>
    <span className="flex items-center gap-4">
      <span className="flex items-center gap-2 text-[14px] font-semibold">
        <Phone className="h-4 w-4 text-[#b5835a]" />
        {brand.phone}
      </span>
      <span className="rounded-md bg-[#1f3a2e] px-4 py-2.5 text-[13px] font-semibold text-white">Devis gratuit</span>
    </span>
  </div>
);

const Page = ({ active, children }: { active: string; children: ReactNode }) => (
  <div className={cn("h-full bg-[#fbf8f3] font-sans", c.ink)}>
    <Header active={active} />
    {children}
  </div>
);

const Title = ({ eyebrow, children }: { eyebrow: string; children: ReactNode }) => (
  <div className="mb-6">
    <p className="mb-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#b5835a]">{eyebrow}</p>
    <p className="font-display text-[32px] font-semibold leading-tight">{children}</p>
  </div>
);

const Stars = ({ size = "h-3.5 w-3.5" }: { size?: string }) => (
  <span className="flex gap-0.5 text-[#e0a526]">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} className={cn(size, "fill-current")} />
    ))}
  </span>
);

export const NewHome = () => (
  <Page active="Accueil">
    <div className="grid grid-cols-[1.05fr_0.95fr] gap-10 px-10 pt-10">
      <div className="pt-4">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ece3d6] px-3 py-1 text-[12px] font-semibold text-[#5c4630]">
          <MapPin className="h-3.5 w-3.5" />
          Menuisier à Meylan et dans le Grésivaudan
        </p>
        <p className="font-display text-[46px] font-semibold leading-[1.05] tracking-tight mb-4">
          Menuiserie sur mesure, de la cuisine à <span className="italic text-[#b5835a]">l'escalier</span>.
        </p>
        <p className={cn("text-[16px] leading-relaxed mb-6 max-w-[430px]", c.muted)}>
          Bois massif, fabrication dans notre atelier de Meylan, pose par nos soins. Devis détaillé sous 48 h.
        </p>
        <div className="flex gap-3 mb-8">
          <span className="flex items-center gap-2 rounded-md bg-[#1f3a2e] px-5 py-3 text-[14px] font-semibold text-white">
            Demander un devis <ArrowRight className="h-4 w-4" />
          </span>
          <span className="rounded-md border border-[#d6cab8] px-5 py-3 text-[14px] font-semibold">Voir nos réalisations</span>
        </div>
        <div className="flex items-center gap-5 whitespace-nowrap border-t border-[#e7dfd3] pt-5 text-[13px]">
          <span className="flex items-center gap-2">
            <Stars />
            <b>4,9</b> <span className={c.muted}>· 87 avis</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#1f3a2e]" />
            Garantie décennale
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-[#1f3a2e]" />
            Artisan RGE
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="h-[420px] overflow-hidden rounded-xl shadow-[0_20px_40px_-20px_rgba(60,40,20,0.45)]">
          <Scene kind="kitchen" />
        </div>
        <div className="absolute -left-8 bottom-8 w-[230px] rounded-lg bg-white p-4 shadow-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#b5835a] mb-1">Dernier chantier</p>
          <p className="text-[14px] font-semibold leading-snug">Cuisine en chêne massif</p>
          <p className={cn("text-[12px]", c.muted)}>Corenc · livrée en 3 semaines</p>
        </div>
      </div>
    </div>
  </Page>
);

const services: { kind: SceneKind; name: string; from: string; delay: string }[] = [
  { kind: "kitchen", name: "Cuisines sur mesure", from: "à partir de 6 500 €", delay: "4 à 6 semaines" },
  { kind: "stairs", name: "Escaliers bois", from: "à partir de 3 900 €", delay: "5 semaines" },
  { kind: "door", name: "Portes intérieures", from: "à partir de 480 €", delay: "2 semaines" },
  { kind: "dressing", name: "Placards & dressings", from: "à partir de 1 200 €", delay: "3 semaines" },
  { kind: "window", name: "Fenêtres bois", from: "à partir de 750 €", delay: "4 semaines" },
  { kind: "terrace", name: "Terrasses", from: "à partir de 95 €/m²", delay: "2 semaines" },
];

export const NewServices = () => (
  <Page active="Prestations">
    <div className="px-10 pt-8">
      <Title eyebrow="Prestations">Ce que nous fabriquons et posons</Title>
      <div className="grid grid-cols-3 gap-5">
        {services.map((s) => (
          <div key={s.name} className="overflow-hidden rounded-lg border border-[#e7dfd3] bg-white">
            <div className="h-[118px]">
              <Scene kind={s.kind} />
            </div>
            <div className="p-3.5">
              <p className="text-[15px] font-semibold mb-1">{s.name}</p>
              <p className="flex items-center justify-between text-[12px]">
                <span className="font-semibold text-[#1f3a2e]">{s.from}</span>
                <span className={cn("flex items-center gap-1", c.muted)}>
                  <Clock className="h-3 w-3" />
                  {s.delay}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Page>
);

const works: { kind: SceneKind; name: string; place: string }[] = [
  { kind: "kitchen", name: "Cuisine chêne massif", place: "Corenc" },
  { kind: "stairs", name: "Escalier quart tournant", place: "Montbonnot" },
  { kind: "dressing", name: "Dressing sous pente", place: "Grenoble" },
  { kind: "terrace", name: "Terrasse en mélèze", place: "Saint-Ismier" },
  { kind: "door", name: "Porte d'entrée en noyer", place: "Meylan" },
  { kind: "window", name: "Fenêtres à petits bois", place: "La Tronche" },
];

export const NewWorks = () => (
  <Page active="Réalisations">
    <div className="px-10 pt-8">
      <div className="flex items-end justify-between">
        <Title eyebrow="Réalisations">Nos derniers chantiers</Title>
        <div className="mb-7 flex gap-2 text-[13px] font-medium">
          {["Tout", "Cuisines", "Escaliers", "Dressings", "Extérieur"].map((f, i) => (
            <span key={f} className={cn("rounded-full px-3.5 py-1.5", i === 0 ? "bg-[#1f3a2e] text-white" : "border border-[#d6cab8]")}>
              {f}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {works.map((w, i) => (
          <div key={w.name} className="relative h-[200px] overflow-hidden rounded-lg">
            <Scene kind={w.kind} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 text-white">
              <p className="text-[14px] font-semibold">{w.name}</p>
              <p className="text-[12px] opacity-80">{w.place}</p>
            </div>
            {i === 0 && <span className="absolute left-3 top-3 rounded bg-white px-2 py-1 text-[11px] font-semibold">Avant / après</span>}
          </div>
        ))}
      </div>
    </div>
  </Page>
);

const towns = [
  ["Meylan", 0, 0],
  ["Grenoble", -70, 40],
  ["Corenc", -20, -40],
  ["La Tronche", -140, -15],
  ["Montbonnot", 60, -30],
  ["Saint-Ismier", 110, -60],
  ["Saint-Martin-d'Hères", -40, 85],
  ["Gières", 20, 70],
  ["Crolles", 160, -100],
  ["Échirolles", -120, 110],
] as const;

export const NewZones = () => (
  <Page active="Zones">
    <div className="grid grid-cols-[0.9fr_1.1fr] gap-10 px-10 pt-8">
      <div>
        <Title eyebrow="Zones d'intervention">Nous venons chez vous dans un rayon de 25 km</Title>
        <p className={cn("text-[15px] leading-relaxed mb-6", c.muted)}>
          Depuis notre atelier de Meylan, nous intervenons dans toute l'agglomération grenobloise et le Grésivaudan, sans frais de
          déplacement.
        </p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[14px]">
          {towns.map(([t]) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#1f3a2e]" />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative h-[470px] overflow-hidden rounded-xl bg-[#e8efe6]">
        <svg viewBox="-260 -230 520 470" className="absolute inset-0 h-full w-full">
          <path d="M-260 -60 C-150 -90 -80 20 0 10 C90 0 150 -120 260 -170" stroke="#a8c4d6" strokeWidth="18" fill="none" />
          <path d="M-260 120 C-180 60 -110 70 -60 40" stroke="#a8c4d6" strokeWidth="12" fill="none" />
          <path d="M-240 -230 L-150 -120 L-220 -40 Z M150 120 L260 60 L260 240 L120 240 Z" fill="#cfdcc7" />
          <path d="M-260 30 H260 M-60 -230 V240" stroke="#fff" strokeWidth="5" />
          <circle r="200" fill="#1f3a2e" fillOpacity="0.07" stroke="#1f3a2e" strokeDasharray="8 8" strokeWidth="2" />
          {towns.map(([t, x, y], i) => (
            <g key={t} transform={`translate(${x} ${y})`}>
              <circle r={i === 0 ? 9 : 5} fill={i === 0 ? "#b5835a" : "#1f3a2e"} stroke="#fff" strokeWidth="2.5" />
              <text
                x="10"
                y="4"
                fontSize={i === 0 ? 15 : 12}
                fontWeight={i === 0 ? 700 : 500}
                fill="#1c1917"
                fontFamily="Inter Variable, sans-serif"
              >
                {t}
              </text>
            </g>
          ))}
        </svg>
        <span className="absolute left-4 top-4 rounded-md bg-white px-3 py-1.5 text-[12px] font-semibold shadow">
          Atelier : 12 chemin des Sources, Meylan
        </span>
      </div>
    </div>
  </Page>
);

export const NewQuote = () => (
  <Page active="Devis">
    <div className="grid grid-cols-[1.3fr_0.7fr] gap-8 px-10 pt-8">
      <div className="rounded-xl border border-[#e7dfd3] bg-white p-7">
        <div className="mb-6 flex items-center gap-3 text-[12px] font-semibold">
          {["Vos travaux", "Vos coordonnées", "Envoi"].map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full",
                  i === 0 ? "bg-[#1f3a2e] text-white" : "bg-[#ece3d6]",
                )}
              >
                {i + 1}
              </span>
              <span className={i === 0 ? "" : c.muted}>{s}</span>
              {i < 2 && <span className="mx-1 h-px w-8 bg-[#d6cab8]" />}
            </span>
          ))}
        </div>
        <p className="mb-2 text-[13px] font-semibold">Type de travaux</p>
        <div className="mb-5 flex flex-wrap gap-2 text-[13px]">
          {["Cuisine", "Escalier", "Dressing", "Portes", "Fenêtres", "Autre"].map((t, i) => (
            <span
              key={t}
              className={cn(
                "rounded-md border px-3.5 py-2",
                i === 1 ? "border-[#1f3a2e] bg-[#1f3a2e]/5 font-semibold" : "border-[#d6cab8]",
              )}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mb-5 grid grid-cols-2 gap-4 text-[13px]">
          {[
            ["Commune", "Montbonnot-Saint-Martin"],
            ["Délai souhaité", "D'ici 2 mois"],
          ].map(([l, v]) => (
            <div key={l}>
              <p className="mb-2 font-semibold">{l}</p>
              <p className="rounded-md border border-[#d6cab8] px-3 py-2.5">{v}</p>
            </div>
          ))}
        </div>
        <p className="mb-2 text-[13px] font-semibold">Photos de l'existant</p>
        <div className="mb-6 grid grid-cols-4 gap-3">
          {(["stairs", "window"] as SceneKind[]).map((k) => (
            <div key={k} className="h-[72px] overflow-hidden rounded-md">
              <Scene kind={k} />
            </div>
          ))}
          <div
            className={cn(
              "col-span-2 flex h-[72px] items-center justify-center gap-2 rounded-md border-2 border-dashed border-[#d6cab8] text-[13px]",
              c.muted,
            )}
          >
            <Upload className="h-4 w-4" />
            Ajouter des photos
          </div>
        </div>
        <span className="flex items-center justify-center gap-2 rounded-md bg-[#1f3a2e] py-3 text-[14px] font-semibold text-white">
          Continuer <ArrowRight className="h-4 w-4" />
        </span>
      </div>
      <div className="space-y-4">
        <div className="rounded-xl bg-[#1f3a2e] p-6 text-white">
          <FileText className="mb-3 h-6 w-6 text-[#e9d2b0]" />
          <p className="font-display text-[22px] font-semibold leading-tight mb-2">Devis gratuit sous 48 h</p>
          <p className="text-[13px] leading-relaxed opacity-80">Détaillé poste par poste, sans engagement. Visite sur place si besoin.</p>
        </div>
        <div className="rounded-xl border border-[#e7dfd3] bg-white p-6">
          <p className={cn("text-[12px] mb-1", c.muted)}>Vous préférez appeler ?</p>
          <p className="flex items-center gap-2 text-[20px] font-semibold">
            <Phone className="h-5 w-5 text-[#b5835a]" />
            {brand.phone}
          </p>
          <p className={cn("text-[12px] mt-1", c.muted)}>Du lundi au vendredi, 7 h 30 – 18 h</p>
        </div>
        <div className="rounded-xl border border-[#e7dfd3] bg-white p-5">
          <Stars />
          <p className="mt-2 text-[13px] leading-relaxed">« Escalier magnifique, posé dans les temps. Très bon conseil. »</p>
          <p className={cn("mt-1 text-[12px]", c.muted)}>Claire D., Biviers</p>
        </div>
      </div>
    </div>
  </Page>
);

// Same order as the trade's pages in server/src/content/landings.ts
export const artisanScreens = [
  <NewHome key="home" />,
  <NewServices key="s" />,
  <NewWorks key="w" />,
  <NewZones key="z" />,
  <NewQuote key="q" />,
];
