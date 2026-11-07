// One page per kind of client, each aimed at the searches that client makes
// ("création site internet restaurant Grenoble"...). Kept here rather than in
// the front so the same text feeds the page, its meta tags, the crawler
// snapshot and the sitemap. French only: these pages target local searches.

export type Landing = {
  slug: string;
  // Footer and cross-links ("Sites internet pour : Restaurants")
  trade: string;
  // Who the page talks to, in a sentence ("des restaurants")
  audience: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  titleStart: string;
  titleHighlight: string;
  intro: string;
  pains: { title: string; text: string }[];
  features: string[];
  faqs: { q: string; a: string }[];
};

const area =
  "Grenoble et toute l'agglomération (Meylan, Échirolles, Saint-Martin-d'Hères, Fontaine, Seyssinet-Pariset), du Grésivaudan au Voironnais";

export const areaText = (audience: string) =>
  `Basé à Grenoble, je travaille avec ${audience} de ${area}, et à distance partout en France.`;

export const landings: Landing[] = [
  {
    slug: "site-internet-restaurant-grenoble",
    trade: "Restaurants",
    audience: "des restaurants, bars et cafés",
    metaTitle: "Création de site internet pour restaurant à Grenoble | Téo Villet",
    metaDescription:
      "Site internet pour restaurant, bar ou café à Grenoble : carte toujours à jour, réservation en ligne, horaires et photos qui donnent envie. Devis gratuit sous 24 h.",
    eyebrow: "Restaurants · Bars · Cafés",
    titleStart: "Un site qui remplit",
    titleHighlight: "vos tables.",
    intro:
      "Avant de réserver, vos futurs clients regardent votre carte, vos photos et vos horaires sur leur téléphone. Je crée des sites de restaurants, bars et cafés à Grenoble qui répondent à ces questions en quelques secondes et donnent envie de passer la porte.",
    pains: [
      {
        title: "Votre carte est introuvable ou périmée",
        text: "Un PDF illisible sur mobile ou la carte de l'an dernier, et le client passe au restaurant suivant. Votre menu devient une vraie page, lisible sur téléphone, que vous mettez à jour quand les plats changent.",
      },
      {
        title: "Des réservations vous échappent",
        text: "Un client qui tombe sur une messagerie à 19 h réserve ailleurs. Un formulaire de réservation ou un bouton d'appel direct capte la demande, même en plein service.",
      },
      {
        title: "Les plateformes décident pour vous",
        text: "Annuaires et applis de réservation vous rendent visible, mais à leurs conditions. Votre site est à vous : vos photos, vos mots et un lien direct avec vos clients.",
      },
    ],
    features: [
      "Carte et menus modifiables depuis un espace d'administration",
      "Réservation en ligne ou demande de table",
      "Horaires, plan d'accès et appel en un geste sur mobile",
      "Galerie photos de la salle et des plats",
      "Pages événements, privatisation ou traiteur",
      "Pages rapides, même en 4G au coin de la rue",
      "Bases du référencement local : titres, descriptions et informations structurées pour Google",
    ],
    faqs: [
      {
        q: "Puis-je modifier ma carte moi-même ?",
        a: "Oui. Je peux ajouter un espace d'administration pour changer vos plats, vos prix, vos photos et vos horaires sans toucher au code. Sinon, vous m'envoyez les changements et je m'en occupe.",
      },
      {
        q: "Le site peut-il prendre des réservations ?",
        a: "Oui : soit un formulaire qui vous envoie chaque demande, soit un système avec des créneaux. On choisit ensemble selon votre façon de travailler et votre nombre de couverts.",
      },
      {
        q: "Mon restaurant sera-t-il visible sur Google ?",
        a: "Le site est construit pour être bien compris par Google : pages rapides, titres et descriptions travaillés, adresse et horaires sous forme structurée. Avec votre fiche Google Business, c'est ce qui vous fait apparaître quand on cherche un restaurant près de chez soi.",
      },
      {
        q: "Combien de temps pour être en ligne ?",
        a: "Pour un site de restaurant classique, comptez environ deux semaines entre la validation de la maquette et la mise en ligne. Le délai exact figure dans le devis.",
      },
    ],
  },
  {
    slug: "site-internet-artisan-grenoble",
    trade: "Artisans",
    audience: "des artisans",
    metaTitle: "Création de site internet pour artisan à Grenoble | Téo Villet",
    metaDescription:
      "Site internet pour artisan à Grenoble : vos réalisations en photos, vos zones d'intervention et des demandes de devis complètes qui arrivent directement. Devis gratuit sous 24 h.",
    eyebrow: "Artisans · Bâtiment · Métiers d'art",
    titleStart: "Des demandes de devis,",
    titleHighlight: "pas seulement des visites.",
    intro:
      "Plombier, électricien, menuisier, paysagiste, ébéniste… Vos clients vous trouvent sur Google, comparent deux ou trois artisans, puis appellent celui qui leur inspire confiance. Votre site doit montrer votre travail et rendre la prise de contact évidente.",
    pains: [
      {
        title: "Le bouche-à-oreille ne suffit plus",
        text: "Même recommandé, on vous cherche en ligne avant d'appeler. Sans site, ou avec un site daté, vous perdez des chantiers face à un concurrent mieux présenté.",
      },
      {
        title: "Vos réalisations restent invisibles",
        text: "Vos plus beaux chantiers dorment dans votre téléphone. Une galerie avant/après, classée par type de travaux, vaut tous les arguments.",
      },
      {
        title: "Les demandes arrivent incomplètes",
        text: "« Vous pouvez passer voir ? », sans adresse ni photo : c'est un aller-retour de plus. Un formulaire de devis bien pensé vous donne le type de travaux, la commune et des photos dès le premier message.",
      },
    ],
    features: [
      "Galerie de réalisations, avec des avant/après",
      "Pages par type de travaux : rénovation, dépannage, installation…",
      "Zones d'intervention clairement affichées",
      "Formulaire de demande de devis, avec envoi de photos",
      "Bouton d'appel direct sur mobile",
      "Mise en avant de vos qualifications, de vos garanties et des avis clients",
      "Référencement local sur « votre métier + votre ville »",
    ],
    faqs: [
      {
        q: "Je n'ai pas le temps de m'occuper d'un site. Est-ce un problème ?",
        a: "Non. Vous m'envoyez vos photos et me parlez de votre activité pendant un appel de 30 minutes ; je m'occupe de la mise en page, de la structure et de la mise en ligne. Vous relisez et validez avant publication.",
      },
      {
        q: "Puis-je ajouter mes nouveaux chantiers moi-même ?",
        a: "Oui, avec un espace d'administration : vous ajoutez quelques photos et une légende depuis votre téléphone, sans toucher au code. Sinon, vous me les envoyez et je les mets en ligne.",
      },
      {
        q: "J'interviens sur plusieurs communes. Comment apparaître dans chacune ?",
        a: "Le site présente clairement vos zones d'intervention, et peut avoir des pages dédiées aux communes ou aux prestations qui comptent le plus pour vous. C'est ce qui aide Google à vous proposer aux bonnes personnes.",
      },
      {
        q: "J'ai déjà un site. Faut-il tout refaire ?",
        a: "Pas forcément. On regarde ensemble ce qui fonctionne et ce qui manque : parfois une refonte, parfois quelques pages et un vrai formulaire de devis suffisent. Je vous le dis franchement pendant l'appel.",
      },
    ],
  },
  {
    slug: "site-internet-commerce-grenoble",
    trade: "Commerces",
    audience: "des commerces de proximité",
    metaTitle: "Création de site internet pour commerce à Grenoble | Téo Villet",
    metaDescription:
      "Site internet pour boutique et commerce de proximité à Grenoble : vos produits, vos horaires, vos nouveautés, et des clients qui viennent en magasin. Devis gratuit sous 24 h.",
    eyebrow: "Boutiques · Commerces de proximité",
    titleStart: "Votre vitrine,",
    titleHighlight: "ouverte même le dimanche.",
    intro:
      "Fleuriste, caviste, librairie, épicerie fine, boutique de créateurs, institut… Avant de se déplacer, vos clients vérifient en ligne que vous êtes ouvert et que vous avez ce qu'ils cherchent. Je crée des sites de commerces qui donnent envie de pousser la porte.",
    pains: [
      {
        title: "On ne sait pas ce que vous vendez",
        text: "Une fiche Google ou une page Facebook montrent l'adresse, rarement l'univers de la boutique. Votre site présente vos produits phares, vos marques et ce qui vous rend différent.",
      },
      {
        title: "Les infos pratiques ne sont pas à jour",
        text: "Horaires d'été, fermeture exceptionnelle, nouvel arrivage : quand l'information est fausse, le client se déplace pour rien, ou ne se déplace pas. Vous la changez en deux clics.",
      },
      {
        title: "Vous dépendez des réseaux sociaux",
        text: "Un post Instagram disparaît en deux jours, et l'algorithme décide qui le voit. Un site reste trouvable sur Google toute l'année.",
      },
    ],
    features: [
      "Présentation de vos produits, rayons ou marques",
      "Horaires, fermetures et actualités modifiables par vous",
      "Plan d'accès, stationnement et bouton d'appel",
      "Retrait en boutique ou réservation de produits, selon la formule",
      "Liens vers vos réseaux sociaux",
      "Pensé d'abord pour le téléphone",
      "Référencement local sur votre quartier et votre ville",
    ],
    faqs: [
      {
        q: "Ai-je besoin d'une boutique en ligne ?",
        a: "Pas forcément. Beaucoup de commerces de proximité ont surtout besoin d'être trouvés et de faire venir en magasin. Si vous voulez vendre en ligne ou proposer le retrait en boutique, on le prévoit dans le devis.",
      },
      {
        q: "Puis-je annoncer mes nouveautés et mes fermetures moi-même ?",
        a: "Oui, avec un espace d'administration : vous changez vos horaires, publiez une actualité ou une nouvelle photo sans toucher au code.",
      },
      {
        q: "Le site s'affichera-t-il bien sur téléphone ?",
        a: "Oui, il est pensé d'abord pour le mobile : c'est là que la plupart de vos clients le consulteront, souvent dans la rue, juste avant de venir.",
      },
      {
        q: "Combien ça coûte ?",
        a: "Le prix de départ de chaque formule est affiché dans la section Tarifs de cette page. Le prix exact dépend de ce dont vous avez besoin et figure dans un devis gratuit, envoyé sous 24 h.",
      },
    ],
  },
  {
    slug: "site-internet-independant-grenoble",
    trade: "Indépendants",
    audience: "des indépendants et professions libérales",
    metaTitle: "Création de site internet pour indépendant à Grenoble | Téo Villet",
    metaDescription:
      "Site internet pour indépendant, consultant, coach ou thérapeute à Grenoble : une présentation qui inspire confiance et une prise de rendez-vous simple. Devis gratuit sous 24 h.",
    eyebrow: "Indépendants · Professions libérales",
    titleStart: "Inspirez confiance",
    titleHighlight: "avant le premier rendez-vous.",
    intro:
      "Coach, thérapeute, consultant, photographe, formateur… Quand on choisit un professionnel indépendant, on choisit une personne. Votre site doit expliquer clairement ce que vous faites, pour qui, et donner envie de vous contacter.",
    pains: [
      {
        title: "Votre offre reste floue",
        text: "Un profil LinkedIn ou une page Instagram ne laissent pas la place d'expliquer votre approche, vos prestations et vos tarifs. Votre site, si.",
      },
      {
        title: "Prendre contact demande trop d'efforts",
        text: "Envoyer un message, attendre une réponse, puis caler un créneau : une partie des gens abandonne en route. Un formulaire clair ou un agenda de prise de rendez-vous simplifie tout.",
      },
      {
        title: "Vous ressemblez à tout le monde",
        text: "Un modèle de site générique fait de vous un prestataire parmi d'autres. Un site sur mesure reflète votre personnalité et votre manière de travailler.",
      },
    ],
    features: [
      "Présentation de vous, de votre parcours et de votre approche",
      "Pages de prestations, avec leur déroulé et leurs tarifs",
      "Prise de rendez-vous en ligne ou formulaire de contact",
      "Témoignages de clients",
      "Articles pour partager votre expertise, selon la formule",
      "Référencement local et sur votre spécialité",
    ],
    faqs: [
      {
        q: "Je n'ai ni logo ni identité visuelle. Est-ce bloquant ?",
        a: "Non. Je peux vous proposer des maquettes et une identité simple (couleurs, typographies) avant de développer le site, pour qu'il vous ressemble dès le départ.",
      },
      {
        q: "Peut-on intégrer la prise de rendez-vous ?",
        a: "Oui : un formulaire de demande de rendez-vous, ou un agenda avec vos créneaux disponibles, comme celui en bas de cette page.",
      },
      {
        q: "Je démarre mon activité. Est-ce trop tôt ?",
        a: "Au contraire : un site simple et clair dès le lancement vous donne une adresse à partager et commence à être référencé sur Google. Il pourra grandir avec votre activité.",
      },
      {
        q: "Qui écrit les textes ?",
        a: "Vous me donnez la matière (votre parcours, vos prestations, vos mots), je vous aide à la structurer et à l'adapter au web. Vous relisez et validez tout avant la mise en ligne.",
      },
    ],
  },
];

export const findLanding = (slug: string) => landings.find((l) => l.slug === slug);

const SITE = "https://www.teovillet.fr";

// What Google reads about the page: the service, its questions and where it
// sits in the site. Served with the page so the front only has to print it.
export const landingStructuredData = (l: Landing) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: l.metaTitle.split(" | ")[0],
      serviceType: "Création de site internet",
      url: `${SITE}/${l.slug}`,
      description: l.metaDescription,
      provider: { "@id": `${SITE}/#business` },
      audience: { "@type": "Audience", audienceType: l.trade },
      areaServed: ["Grenoble", "Meylan", "Échirolles", "Saint-Martin-d'Hères", "Fontaine", "Voiron"].map((name) => ({ "@type": "City", name })),
    },
    {
      "@type": "FAQPage",
      mainEntity: l.faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: `Sites internet pour ${l.trade.toLowerCase()}` },
      ],
    },
  ],
});
