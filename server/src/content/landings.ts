// One page per kind of client, each aimed at the searches that client makes
// ("création site internet restaurant Grenoble"...). Kept here rather than in
// the front so the same text feeds the page, its meta tags, the crawler
// snapshot and the sitemap. French only: these pages target local searches.

export type Landing = {
  slug: string;
  // Footer and cross-links ("Sites internet pour : Restaurants")
  trade: string;
  // Colors and touches of the page (see .trade-* in the front's index.css),
  // so each trade gets an art direction close to the sites it would get
  theme: "restaurant" | "gite" | "artisan" | "commerce" | "independant";
  // A live site of this kind I made, shown as an example
  example?: { name: string; url: string; text: string };
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
  // The pages a typical site for this trade has, shown as a browsable mock-up
  pages: { name: string; path: string; text: string }[];
  faqs: { q: string; a: string }[];
  // Where these clients are, when it isn't the agglomeration (gîtes are in
  // the mountains around it)
  area?: string;
};

const defaultArea =
  "Grenoble et toute l'agglomération (Meylan, Échirolles, Saint-Martin-d'Hères, Fontaine, Seyssinet-Pariset), du Grésivaudan au Voironnais";

export const areaText = (l: Landing) =>
  `Basé à Grenoble, je travaille avec ${l.audience} de ${l.area ?? defaultArea}, et à distance partout en France.`;

// Asked whatever the trade, so written once and added after each page's own
const commonFaqs = [
  {
    q: "Que se passe-t-il après la mise en ligne ?",
    a: "L'hébergement et l'assistance sont inclus pendant 30 jours (60 pour un site complet). Ensuite, une maintenance mensuelle couvre l'hébergement, les mises à jour, les sauvegardes et les petites modifications.",
  },
];

export const faqsOf = (l: Landing) => [...l.faqs, ...commonFaqs];

export const landings: Landing[] = [
  {
    slug: "site-internet-restaurant-grenoble",
    trade: "Restaurants",
    theme: "restaurant",
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
    pages: [
      { name: "Accueil", path: "", text: "L'ambiance de la salle en une photo, vos horaires du jour et un bouton « Réserver » visible tout de suite." },
      { name: "La carte", path: "la-carte", text: "Entrées, plats, desserts et boissons, avec les prix et les allergènes. Une vraie page lisible sur téléphone, pas un PDF." },
      { name: "Réserver", path: "reserver", text: "Le client choisit le jour, l'heure et le nombre de couverts. Vous recevez la demande par e-mail, même en plein service." },
      { name: "Événements", path: "evenements", text: "Soirées à thème, privatisation de la salle, menus de groupe ou traiteur : de quoi décrocher les demandes plus importantes." },
      { name: "Accès", path: "acces", text: "Adresse, plan, stationnement et tramway le plus proche, avec l'appel en un geste depuis le téléphone." },
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
    slug: "site-internet-gite-grenoble",
    trade: "Gîtes",
    theme: "gite",
    example: {
      name: "Manoir de la Champagne",
      url: "https://manoir-champagne.teovillet.fr",
      text: "Gîte de charme pour 12 à 14 personnes en Normandie : grandes photos, l'essentiel du séjour en un coup d'œil, tarifs par saison et vérification des disponibilités dès l'arrivée sur le site.",
    },
    audience: "des gîtes, chambres d'hôtes et locations saisonnières",
    area: "Grenoble, du Vercors à la Chartreuse, de Belledonne à l'Oisans et au Trièves",
    metaTitle: "Création de site internet pour gîte et chambre d'hôtes en Isère | Téo Villet",
    metaDescription:
      "Site internet pour gîte, chambre d'hôtes ou location saisonnière autour de Grenoble : photos qui donnent envie, disponibilités à jour et réservations en direct, sans commission. Devis gratuit sous 24 h.",
    eyebrow: "Gîtes · Chambres d'hôtes · Locations saisonnières",
    titleStart: "Plus de réservations en direct,",
    titleHighlight: "moins de commissions.",
    intro:
      "Vos voyageurs vous découvrent souvent sur une plateforme, puis cherchent votre nom sur Google avant de réserver. S'ils tombent sur votre propre site, avec vos photos, vos disponibilités et un moyen simple de vous écrire, ils réservent chez vous, et la commission reste dans votre poche.",
    pains: [
      {
        title: "Les plateformes prennent leur part",
        text: "Chaque nuit réservée par une plateforme vous coûte une commission, et ce sont elles qui fixent les règles. Votre site vous permet d'accueillir en direct les habitués, les recommandations et ceux qui vous ont trouvés sur Google.",
      },
      {
        title: "On ne sait pas si c'est libre",
        text: "« C'est disponible la deuxième semaine d'août ? » : sans calendrier, chaque question est un échange de messages, et le voyageur réserve ailleurs en attendant. Vos disponibilités sont affichées, à jour.",
      },
      {
        title: "Votre lieu mérite mieux qu'une annonce",
        text: "Une annonce ressemble à toutes les autres. Votre site raconte la maison, le jardin, la vue sur le massif, les randonnées au départ du gîte : tout ce qui fait qu'on choisit chez vous.",
      },
    ],
    features: [
      "Grandes photos du gîte, des chambres et des alentours",
      "Calendrier des disponibilités, à jour",
      "Demande de réservation en direct, ou réservation avec acompte selon la formule",
      "Tarifs par saison, durée minimale et conditions claires",
      "Page sur la région : randonnées, stations, lacs et bonnes adresses",
      "Version anglaise pour les voyageurs étrangers, selon la formule",
      "Avis de vos anciens voyageurs",
      "Référencement local sur « gîte + votre massif ou votre village »",
    ],
    pages: [
      { name: "Accueil", path: "", text: "Une grande photo qui donne envie de partir, la capacité du gîte et un bouton pour vérifier les disponibilités." },
      { name: "Le gîte", path: "le-gite", text: "Chaque chambre, les équipements, le linge, le jardin, l'accès : toutes les réponses avant même qu'on vous les demande." },
      { name: "Tarifs", path: "disponibilites-tarifs", text: "Le calendrier des disponibilités et les prix par saison, pour réserver sans attendre votre réponse." },
      { name: "La région", path: "la-region", text: "Randonnées, ski, lacs, marchés et restaurants du coin : ce qui donne envie de venir, et que Google aime trouver." },
      { name: "Réserver", path: "reserver", text: "Dates, nombre de voyageurs, message : la demande arrive chez vous, sans intermédiaire ni commission." },
    ],
    faqs: [
      {
        q: "Puis-je garder mes annonces sur les plateformes ?",
        a: "Oui, et c'est souvent le plus malin : les plateformes vous font découvrir, votre site transforme les voyageurs qui vous cherchent en réservations directes. Les deux se complètent.",
      },
      {
        q: "Le calendrier peut-il se synchroniser avec mes plateformes ?",
        a: "C'est possible dans la plupart des cas, grâce aux calendriers que proposent les plateformes de location. On regarde ensemble lesquelles vous utilisez pour choisir la solution la plus simple, et éviter les doubles réservations.",
      },
      {
        q: "Les voyageurs peuvent-ils payer en ligne ?",
        a: "Selon la formule : soit une demande de réservation que vous confirmez vous-même, soit une réservation avec paiement d'un acompte en ligne. On choisit selon votre façon de travailler.",
      },
      {
        q: "Mon gîte est isolé en montagne. Est-ce que ça change quelque chose ?",
        a: "Non, tout se fait à distance : un appel, puis vos photos et vos textes par e-mail. Et votre situation devient un atout sur le site : le massif, les activités au départ du gîte, le calme.",
      },
    ],
  },
  {
    slug: "site-internet-artisan-grenoble",
    trade: "Artisans",
    theme: "artisan",
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
    pages: [
      { name: "Accueil", path: "", text: "Votre métier, vos communes et votre numéro en grand : le visiteur sait en trois secondes s'il est au bon endroit." },
      { name: "Prestations", path: "prestations", text: "Une page par type de travaux, avec ce qui est compris, les délais habituels et des photos de chantiers similaires." },
      { name: "Réalisations", path: "realisations", text: "Vos chantiers en avant/après, classés par type de travaux. La preuve de votre savoir-faire, mieux qu'un long discours." },
      { name: "Zones", path: "zones-intervention", text: "Les communes où vous intervenez, pour que les clients d'à côté sachent que vous venez chez eux." },
      { name: "Devis", path: "demande-de-devis", text: "Type de travaux, commune, photos, délai souhaité : vous recevez une demande complète, prête à chiffrer." },
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
    theme: "commerce",
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
    pages: [
      { name: "Accueil", path: "", text: "L'univers de la boutique en photos, ouvert ou fermé en ce moment, et la nouveauté de la semaine." },
      { name: "Produits", path: "produits", text: "Vos rayons, vos marques et vos produits phares, pour qu'on sache avant de venir que vous avez ce qu'on cherche." },
      { name: "Actualités", path: "actualites", text: "Arrivages, dégustations, soldes, fermeture exceptionnelle : vous publiez en deux clics depuis votre téléphone." },
      { name: "La boutique", path: "la-boutique", text: "Votre histoire, l'équipe et ce qui vous rend différent des grandes surfaces et des sites en ligne." },
      { name: "Accès", path: "acces", text: "Horaires, plan, stationnement et bouton d'appel, toujours à jour." },
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
    theme: "independant",
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
    pages: [
      { name: "Accueil", path: "", text: "Ce que vous faites et pour qui, en une phrase claire, avec votre photo et un bouton pour prendre rendez-vous." },
      { name: "À propos", path: "a-propos", text: "Votre parcours, vos formations et votre approche : ce qui fait qu'on a envie de travailler avec vous plutôt qu'avec un autre." },
      { name: "Prestations", path: "prestations", text: "Chaque accompagnement avec son déroulé, sa durée et son tarif. Fini les « c'est combien ? » par message." },
      { name: "Témoignages", path: "temoignages", text: "Les mots de vos clients, avec leur accord. Rien ne rassure davantage un futur client." },
      { name: "Rendez-vous", path: "rendez-vous", text: "Un agenda avec vos créneaux libres, ou un formulaire simple : le premier contact se fait en une minute." },
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
      mainEntity: faqsOf(l).map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
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
