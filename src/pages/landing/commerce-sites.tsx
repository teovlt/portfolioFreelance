import { type ReactNode } from "react";
import { Clock, Heart, Leaf, MapPin, Phone, Pin, Search, ShoppingBag, Store, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Portrait } from "./independant-sites";

// The site of a made-up delicatessen in Grenoble, drawn at desktop size
// (1024 × 640) and scaled down by ScaledFrame. Teal, coral and cream,
// whatever the page theme, like a screenshot of a real client's site

const brand = { name: "La Boutique du Coin", phone: "04 76 46 30 18", address: "5 place Saint-Bruno, Grenoble" };

// ---------------------------------------------------------------------------
// Packshots standing in for product photos

export type ProductKind = "honey" | "oil" | "cheese" | "coffee" | "chocolate" | "wine" | "jam" | "tea";

const tones: Record<ProductKind, string> = {
  honey: "#f6e3b4",
  oil: "#e3ead2",
  cheese: "#f3ead8",
  coffee: "#ead8c8",
  chocolate: "#f0d9d0",
  wine: "#e6dde6",
  jam: "#f6d8d2",
  tea: "#d9e8e3",
};

export const Product = ({ kind, className }: { kind: ProductKind; className?: string }) => (
  <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className={cn("block h-full w-full", className)}>
    <rect width="200" height="200" fill={tones[kind]} />
    <ellipse cx="100" cy="170" rx="60" ry="8" fill="#000" opacity="0.08" />
    {kind === "honey" && (
      <g>
        <rect x="64" y="80" width="72" height="90" rx="14" fill="#e3a21a" />
        <rect x="60" y="62" width="80" height="22" rx="4" fill="#3b2a1a" />
        <rect x="72" y="104" width="56" height="40" rx="4" fill="#fbf6ee" />
        <path d="M84 118 H116 M88 128 H112" stroke="#3b2a1a" strokeWidth="3" />
      </g>
    )}
    {(kind === "oil" || kind === "wine") && (
      <g>
        <rect x="76" y="70" width="48" height="100" rx="10" fill={kind === "oil" ? "#8a9a2c" : "#4a1d2c"} />
        <rect x="90" y="30" width="20" height="46" fill={kind === "oil" ? "#8a9a2c" : "#4a1d2c"} />
        <rect x="88" y="24" width="24" height="10" fill={kind === "oil" ? "#c9a227" : "#a8323e"} />
        <rect x="80" y="104" width="40" height="44" fill="#fbf6ee" />
        <path d="M88 118 H112 M90 128 H110" stroke="#1d2422" strokeWidth="2.5" />
      </g>
    )}
    {kind === "cheese" && (
      <g>
        <path d="M40 140 L150 100 L160 140 Z" fill="#f2c94c" />
        <path d="M40 140 H160 V165 H40 Z" fill="#e5b93a" />
        <circle cx="80" cy="152" r="5" fill="#cfa02c" />
        <circle cx="120" cy="148" r="7" fill="#cfa02c" />
        <circle cx="130" cy="125" r="5" fill="#d9ad35" />
      </g>
    )}
    {kind === "coffee" && (
      <g>
        <path d="M66 60 H134 L140 170 H60 Z" fill="#6b4a33" />
        <path d="M66 60 L74 46 H126 L134 60" fill="#4e3424" />
        <rect x="76" y="96" width="48" height="40" rx="4" fill="#e0704f" />
        <ellipse cx="100" cy="116" rx="9" ry="13" fill="#4e3424" />
        <path d="M100 104 C96 112 104 120 100 128" stroke="#e0704f" strokeWidth="2" fill="none" />
      </g>
    )}
    {kind === "chocolate" && (
      <g transform="rotate(-10 100 110)">
        <rect x="50" y="70" width="100" height="80" rx="4" fill="#5a3324" />
        {[0, 1, 2, 3].map((c) =>
          [0, 1, 2].map((r) => <rect key={`${c}${r}`} x={56 + c * 24} y={76 + r * 24} width="20" height="20" rx="2" fill="#6e4030" />),
        )}
        <path d="M50 70 H150 V100 L130 110 L110 98 L90 112 L70 100 L50 108 Z" fill="#1f5f5b" />
        <rect x="70" y="80" width="60" height="12" rx="2" fill="#fbf6ee" />
      </g>
    )}
    {kind === "jam" && (
      <g>
        <rect x="68" y="88" width="64" height="80" rx="10" fill="#b8323e" />
        <path d="M62 76 H138 V92 H62 Z" fill="#f6efe2" />
        <path d="M62 92 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6" stroke="#e0704f" strokeWidth="2" fill="none" />
        <rect x="76" y="114" width="48" height="30" rx="3" fill="#fbf6ee" />
      </g>
    )}
    {kind === "tea" && (
      <g>
        <rect x="60" y="66" width="80" height="104" rx="6" fill="#1f5f5b" />
        <rect x="60" y="66" width="80" height="20" fill="#174a47" />
        <path d="M100 104 C84 118 92 140 100 146 C108 140 116 118 100 104 Z" fill="#b9d5a6" />
        <path d="M100 108 V146" stroke="#1f5f5b" strokeWidth="2" />
      </g>
    )}
  </svg>
);

// The shop seen from the square, awning and window display
export const Storefront = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={cn("block h-full w-full", className)}>
    <rect width="400" height="300" fill="#e8dcc8" />
    {Array.from({ length: 5 }, (_, i) => (
      <rect key={i} x={20 + i * 80} y="16" width="40" height="44" fill="#b9c7cc" stroke="#fff" strokeWidth="4" />
    ))}
    <rect x="20" y="78" width="360" height="36" fill="#1f5f5b" />
    <text x="200" y="102" textAnchor="middle" fill="#fbf6ee" fontSize="18" fontFamily="Fraunces Variable, serif" fontStyle="italic">
      La Boutique du Coin
    </text>
    {Array.from({ length: 12 }, (_, i) => (
      <path key={i} d={`M${20 + i * 30} 114 h30 l-4 24 a11 11 0 0 1 -22 0 z`} fill={i % 2 ? "#fbf6ee" : "#e0704f"} />
    ))}
    <rect x="30" y="150" width="200" height="130" fill="#2b3b3a" />
    <rect x="250" y="150" width="110" height="130" fill="#1f5f5b" />
    <rect x="262" y="164" width="86" height="66" fill="#c9dad6" opacity="0.5" />
    <circle cx="340" cy="245" r="4" fill="#d8b46a" />
    {[
      ["#e3a21a", 50],
      ["#8a9a2c", 80],
      ["#b8323e", 110],
      ["#4a1d2c", 140],
      ["#6b4a33", 170],
      ["#1f5f5b", 200],
    ].map(([c, x]) => (
      <g key={String(x)}>
        <rect x={Number(x) - 8} y="208" width="20" height="30" rx="4" fill={String(c)} />
        <rect x={Number(x) - 8} y="244" width="20" height="26" rx="4" fill={String(c)} opacity="0.7" />
      </g>
    ))}
    <path d="M30 240 H230 M30 272 H230" stroke="#c9a87c" strokeWidth="4" />
    <rect x="70" y="164" width="120" height="30" rx="4" fill="#fbf6ee" />
    <text x="130" y="184" textAnchor="middle" fill="#1d2422" fontSize="12" fontFamily="Inter Variable, sans-serif" fontWeight="700">
      OUVERT
    </text>
    <rect y="280" width="400" height="20" fill="#bcae96" />
  </svg>
);

// ---------------------------------------------------------------------------

const Header = ({ active }: { active?: string }) => (
  <div className="flex h-[66px] items-center justify-between border-b border-[#ece3d3] bg-[#fbf6ee] px-10">
    <span className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1f5f5b] text-white">
        <Store className="h-4 w-4" />
      </span>
      <span className="font-display text-[20px] italic font-semibold">{brand.name}</span>
    </span>
    <nav className="flex gap-7 text-[14px] font-medium">
      {["Produits", "Actualités", "La boutique", "Accès"].map((l) => (
        <span key={l} className={cn("rounded-full px-3 py-1.5", l === active && "bg-[#1f5f5b]/10 text-[#1f5f5b]")}>
          {l}
        </span>
      ))}
    </nav>
    <span className="flex items-center gap-2 rounded-full bg-[#1f5f5b]/10 px-3.5 py-2 text-[12px] font-bold text-[#1f5f5b]">
      <span className="h-2 w-2 rounded-full bg-[#2fa36b]" />
      Ouvert · jusqu'à 19 h 30
    </span>
  </div>
);

const Page = ({ active, children }: { active?: string; children: ReactNode }) => (
  <div className="h-full bg-[#fbf6ee] font-sans text-[#1d2422]">
    <Header active={active} />
    {children}
  </div>
);

const Title = ({ eyebrow, children }: { eyebrow: string; children: ReactNode }) => (
  <div className="mb-6">
    <p className="mb-1 text-[13px] font-semibold text-[#e0704f]">{eyebrow}</p>
    <p className="font-display text-[34px] font-bold leading-tight">{children}</p>
  </div>
);

export const ShopHome = () => (
  <Page>
    <div className="grid grid-cols-[1fr_1fr] gap-10 px-10 pt-10">
      <div className="pt-3">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f6d8cc] px-3.5 py-1.5 text-[12px] font-semibold text-[#9a3f24]">
          <Leaf className="h-3.5 w-3.5" />
          Épicerie fine & cave · Saint-Bruno
        </p>
        <p className="mb-4 font-display text-[48px] font-bold leading-[1.04]">
          Les bons produits du coin, <span className="italic font-medium text-[#1f5f5b]">à deux pas</span> de chez vous.
        </p>
        <p className="mb-7 max-w-[420px] text-[16px] leading-relaxed text-[#5b625f]">
          Plus de 300 références de producteurs à moins de 100 km : miels, fromages, vins, cafés torréfiés à Grenoble.
        </p>
        <div className="flex gap-3">
          <span className="rounded-full bg-[#1f5f5b] px-6 py-3 text-[14px] font-semibold text-white">Voir les produits</span>
          <span className="flex items-center gap-2 rounded-full border border-[#d8cdb9] px-6 py-3 text-[14px] font-semibold">
            <MapPin className="h-4 w-4" /> Venir en boutique
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="h-[380px] overflow-hidden rounded-[28px]">
          <Storefront />
        </div>
        <div className="absolute -bottom-6 -left-8 flex w-[270px] items-center gap-3 rounded-2xl bg-white p-3 shadow-xl">
          <div className="h-[64px] w-[64px] flex-shrink-0 overflow-hidden rounded-xl">
            <Product kind="cheese" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#e0704f]">Arrivage de la semaine</p>
            <p className="text-[14px] font-semibold leading-snug">Tomme de Belledonne affinée 6 mois</p>
          </div>
        </div>
      </div>
    </div>
  </Page>
);

const products: { kind: ProductKind; name: string; maker: string; price: string }[] = [
  { kind: "honey", name: "Miel de montagne", maker: "Rucher du Taillefer", price: "9,50 €" },
  { kind: "cheese", name: "Tomme de Belledonne", maker: "Ferme des Arnauds", price: "24 €/kg" },
  { kind: "coffee", name: "Café Éthiopie", maker: "Torréfié à Grenoble", price: "11,90 €" },
  { kind: "wine", name: "Mondeuse 2023", maker: "Domaine du Granier", price: "17 €" },
  { kind: "jam", name: "Confiture de myrtilles", maker: "Les Jardins de Chartreuse", price: "6,80 €" },
  { kind: "oil", name: "Huile de noix", maker: "Moulin de Vinay", price: "12,50 €" },
  { kind: "chocolate", name: "Tablette noir 70 %", maker: "Atelier Cacao, Voiron", price: "5,20 €" },
  { kind: "tea", name: "Tisane des alpages", maker: "Herboristerie du Vercors", price: "7,40 €" },
];

export const ShopProducts = () => (
  <Page active="Produits">
    <div className="grid grid-cols-[180px_1fr] gap-8 px-10 pt-8">
      <div>
        <p className="mb-3 flex items-center gap-2 rounded-full border border-[#d8cdb9] px-3 py-2 text-[13px] text-[#8a8f8c]">
          <Search className="h-4 w-4" /> Rechercher
        </p>
        <ul className="space-y-1 text-[14px]">
          {["Tout voir", "Épicerie sucrée", "Épicerie salée", "Fromages", "Cave", "Cafés & thés", "Idées cadeaux"].map((c, i) => (
            <li key={c} className={cn("rounded-lg px-3 py-2", i === 0 ? "bg-[#1f5f5b] font-semibold text-white" : "text-[#5b625f]")}>
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {products.map((p, i) => (
          <div key={p.name}>
            <div className="relative mb-2 h-[150px] overflow-hidden rounded-2xl">
              <Product kind={p.kind} />
              {i === 1 && (
                <span className="absolute left-2 top-2 rotate-[-6deg] rounded-full bg-[#e0704f] px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                  Nouveau
                </span>
              )}
              <Heart className="absolute right-2.5 top-2.5 h-4 w-4 text-[#1d2422]/40" />
            </div>
            <p className="text-[14px] font-semibold leading-tight">{p.name}</p>
            <p className="text-[12px] text-[#8a8f8c]">{p.maker}</p>
            <p className="mt-0.5 text-[14px] font-bold text-[#1f5f5b]">{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  </Page>
);

const posts: { kind: ProductKind; date: string; title: string; text: string; pinned?: boolean }[] = [
  {
    kind: "wine",
    date: "Samedi 21 nov.",
    title: "Dégustation : les vins de Savoie",
    text: "De 15 h à 19 h, avec Lucie du domaine du Granier. Entrée libre.",
    pinned: true,
  },
  {
    kind: "cheese",
    date: "13 nov.",
    title: "Arrivage : la tomme de Belledonne est là",
    text: "Affinée six mois, elle part vite chaque année. On vous en met de côté ?",
  },
  {
    kind: "chocolate",
    date: "8 nov.",
    title: "Les coffrets de Noël sont prêts",
    text: "À composer vous-même, de 25 à 80 €, emballés sur place.",
  },
];

export const ShopNews = () => (
  <Page active="Actualités">
    <div className="px-10 pt-8">
      <Title eyebrow="Actualités">Ce qui se passe à la boutique</Title>
      <div className="grid grid-cols-[1.2fr_1fr] gap-6">
        {posts.slice(0, 1).map((p) => (
          <div key={p.title} className="overflow-hidden rounded-3xl bg-[#1f5f5b] text-white">
            <div className="grid h-[220px] grid-cols-3">
              {(["wine", "cheese", "oil"] as ProductKind[]).map((k) => (
                <Product key={k} kind={k} />
              ))}
            </div>
            <div className="p-6">
              <p className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-[#f6c5b3]">
                <Pin className="h-3.5 w-3.5" /> Épinglé · {p.date}
              </p>
              <p className="mb-2 font-display text-[24px] font-bold leading-tight">{p.title}</p>
              <p className="text-[14px] opacity-80">{p.text}</p>
            </div>
          </div>
        ))}
        <div className="space-y-4">
          {posts.slice(1).map((p) => (
            <div key={p.title} className="flex gap-4 rounded-3xl bg-white p-4">
              <div className="h-[110px] w-[110px] flex-shrink-0 overflow-hidden rounded-2xl">
                <Product kind={p.kind} />
              </div>
              <div>
                <p className="mb-1 text-[12px] font-semibold text-[#e0704f]">{p.date}</p>
                <p className="mb-1 text-[16px] font-bold leading-snug">{p.title}</p>
                <p className="text-[13px] leading-relaxed text-[#5b625f]">{p.text}</p>
              </div>
            </div>
          ))}
          <p className="rounded-2xl border-2 border-dashed border-[#e0704f]/50 px-4 py-3 text-[13px] font-semibold text-[#9a3f24]">
            Fermeture exceptionnelle le mardi 1er décembre (inventaire).
          </p>
        </div>
      </div>
    </div>
  </Page>
);

export const ShopAbout = () => (
  <Page active="La boutique">
    <div className="grid grid-cols-[1fr_1fr] gap-10 px-10 pt-8">
      <div>
        <Title eyebrow="Notre histoire">Une épicerie de quartier, depuis 2016</Title>
        <p className="mb-6 text-[15px] leading-relaxed text-[#5b625f]">
          Sophie et Karim ont ouvert la boutique pour trouver, au même endroit, ce qu'ils allaient chercher dans quatre fermes différentes.
          On goûte tout avant de le vendre, et on connaît chaque producteur par son prénom.
        </p>
        <div className="mb-6 grid grid-cols-3 gap-3 text-center text-[13px]">
          {[
            [Leaf, "Producteurs à moins de 100 km"],
            [Truck, "Livraison à vélo dans Grenoble"],
            [ShoppingBag, "Coffrets cadeaux sur mesure"],
          ].map(([Icon, t]) => {
            const I = Icon as typeof Leaf;
            return (
              <div key={String(t)} className="rounded-2xl bg-white p-4">
                <I className="mx-auto mb-2 h-5 w-5 text-[#1f5f5b]" />
                {String(t)}
              </div>
            );
          })}
        </div>
        <div className="flex gap-5">
          {[
            ["Sophie", "#e0704f", "#3b2a1a"],
            ["Karim", "#1f5f5b", "#1d1d1d"],
          ].map(([n, shirt, hair]) => (
            <div key={n} className="flex items-center gap-3">
              <div className="h-14 w-14 overflow-hidden rounded-full">
                <Portrait shirt={shirt} hair={hair} short={n === "Karim"} />
              </div>
              <p className="text-[14px] font-semibold">{n}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[470px] overflow-hidden rounded-[28px]">
        <Storefront />
      </div>
    </div>
  </Page>
);

export const ShopAccess = () => (
  <Page active="Accès">
    <div className="grid grid-cols-[0.9fr_1.1fr] gap-10 px-10 pt-8">
      <div>
        <Title eyebrow="Venir nous voir">Horaires & accès</Title>
        <div className="mb-5 rounded-2xl bg-white p-5">
          <p className="mb-3 flex items-center gap-2 text-[14px] font-bold text-[#1f5f5b]">
            <Clock className="h-4 w-4" /> Ouvert maintenant
          </p>
          {[
            ["Mardi – vendredi", "9 h 30 – 13 h · 15 h – 19 h 30"],
            ["Samedi", "9 h – 19 h 30"],
            ["Dimanche", "9 h – 12 h 30"],
            ["Lundi", "Fermé"],
          ].map(([d, h], i) => (
            <p key={d} className={cn("flex justify-between border-b border-[#f0e8db] py-2 text-[14px]", i === 0 && "font-semibold")}>
              <span>{d}</span>
              <span className={h === "Fermé" ? "text-[#b8323e]" : "text-[#5b625f]"}>{h}</span>
            </p>
          ))}
        </div>
        <p className="mb-2 flex items-center gap-2 text-[14px]">
          <MapPin className="h-4 w-4 text-[#e0704f]" /> {brand.address}
        </p>
        <p className="mb-5 text-[13px] text-[#5b625f]">Tram A · arrêt Saint-Bruno · Marché le samedi matin</p>
        <span className="flex w-fit items-center gap-2 rounded-full bg-[#1f5f5b] px-5 py-3 text-[14px] font-semibold text-white">
          <Phone className="h-4 w-4" /> {brand.phone}
        </span>
      </div>
      <div className="relative h-[470px] overflow-hidden rounded-[28px] bg-[#e9efe8]">
        <svg viewBox="0 0 500 470" className="absolute inset-0 h-full w-full">
          <path d="M0 120 L500 60 M0 320 L500 280 M120 0 L160 470 M360 0 L330 470" stroke="#fff" strokeWidth="16" />
          <rect x="190" y="150" width="120" height="110" rx="10" fill="#cfe0c8" />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={210 + i * 26} cy={205} r="9" fill="#a9c79c" />
          ))}
          <path d="M0 200 C150 190 350 215 500 200" stroke="#2f7fa8" strokeWidth="4" strokeDasharray="10 6" />
          <path d="M296 130 c0 -26 36 -26 36 0 c0 20 -18 36 -18 36 s-18 -16 -18 -36 z" fill="#e0704f" />
          <circle cx="314" cy="130" r="6" fill="#fff" />
        </svg>
        <span className="absolute left-[200px] top-[180px] rounded-md bg-white/90 px-2 py-1 text-[11px] font-semibold">
          Place Saint-Bruno
        </span>
        <span className="absolute left-[340px] top-[100px] rounded-lg bg-white px-3 py-1.5 text-[13px] font-semibold shadow">
          {brand.name}
        </span>
      </div>
    </div>
  </Page>
);

// Same order as the trade's pages in server/src/content/landings.ts
export const commerceScreens = [
  <ShopHome key="home" />,
  <ShopProducts key="p" />,
  <ShopNews key="n" />,
  <ShopAbout key="a" />,
  <ShopAccess key="x" />,
];
