import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { Project, ProjectCategory, ProjectStatus } from "../models/Project.js";

// One-off migration for the "clients / demos / personal" sections: files the
// existing projects under a category and adds the client and demo sites.
// Safe to re-run: categories are only set, new projects skip existing slugs.

const categories: Record<string, { category: ProjectCategory; order: number }> = {
  "ciel-avenue": { category: ProjectCategory.CLIENT, order: 1 },
  couverto: { category: ProjectCategory.PERSONAL, order: 0 },
  "insight-hub": { category: ProjectCategory.PERSONAL, order: 1 },
};

const projects = [
  {
    slug: "manoir-champagne",
    title: "Manoir de la Champagne",
    image: "/images/projects/manoir-champagne.webp",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "TailwindCSS", "Docker"],
    status: ProjectStatus.DONE,
    category: ProjectCategory.CLIENT,
    order: 0,
    visible: true,
    liveLink: "https://manoir-champagne.teovillet.fr",
    tagline: {
      fr: "Le site d'un gîte de charme en Normandie, en trois langues, avec demandes de réservation et espace propriétaires.",
      en: "The website of a countryside holiday home in Normandy, in three languages, with booking requests and an owners' area.",
    },
    role: { fr: "Développeur freelance, du brief à la mise en ligne", en: "Freelance developer, from brief to launch" },
    timeline: { fr: "2026", en: "2026" },
    overview: {
      fr: "Le Manoir de la Champagne est un gîte pour 12 à 14 personnes à Millières, dans la Manche. Les propriétaires voulaient un site qui donne envie de réserver en direct, pour les visiteurs français, anglais et allemands, sans dépendre uniquement des plateformes.",
      en: "Manoir de la Champagne is a holiday home for 12 to 14 guests in Millières, Normandy. The owners wanted a site that makes French, English and German visitors want to book directly, without relying only on booking platforms.",
    },
    challenge: {
      fr: "Les propriétaires devaient pouvoir tout gérer seuls : textes dans trois langues, photos, tarifs par saison, disponibilités synchronisées avec Abritel, Airbnb et Booking, et réponses aux demandes de réservation.",
      en: "The owners had to be able to manage everything themselves: texts in three languages, photos, seasonal prices, availability synced with Abritel, Airbnb and Booking, and replies to booking requests.",
    },
    approach: {
      fr: "Un site rapide et soigné côté visiteurs (vérification des disponibilités dès l'accueil, calendrier, avis Google, carte) et un espace propriétaires simple pour le reste. Le SEO est géré par page et par langue, et l'ensemble tient dans une seule image Docker.",
      en: "A fast, polished site for visitors (availability check right on the homepage, calendar, Google reviews, map) and a simple owners' area for everything else. SEO is handled per page and per language, and the whole thing ships as a single Docker image.",
    },
    features: [
      { fr: "Site en français, anglais et allemand", en: "Site in French, English and German" },
      { fr: "Calendrier des disponibilités et demandes de réservation", en: "Availability calendar and booking requests" },
      { fr: "Synchronisation iCal avec Abritel, Airbnb et Booking", en: "iCal sync with Abritel, Airbnb and Booking" },
      { fr: "Espace propriétaires : textes, photos, tarifs, événements", en: "Owners' area: texts, photos, prices, events" },
      { fr: "Avis Google et carte avec itinéraire", en: "Google reviews and a map with directions" },
      { fr: "SEO multilingue et photos optimisées", en: "Multilingual SEO and optimised photos" },
    ],
  },
  {
    slug: "jl-psychologue",
    title: "Jean-Louis Clément, psychologue",
    image: "/images/projects/jl-psychologue.webp",
    stack: ["React", "TypeScript", "TailwindCSS", "Vite"],
    status: ProjectStatus.DONE,
    category: ProjectCategory.CLIENT,
    order: 2,
    visible: true,
    liveLink: "https://psychologue-psychotherapeute-bron-69.fr",
    tagline: {
      fr: "Un site vitrine sobre pour un psychologue clinicien et psychothérapeute à Bron.",
      en: "A clean showcase website for a clinical psychologist and psychotherapist in Bron.",
    },
    role: { fr: "Développeur freelance", en: "Freelance developer" },
    timeline: { fr: "2025", en: "2025" },
    overview: {
      fr: "Jean-Louis Clément intervient auprès des particuliers, des équipes et des institutions. Il lui fallait un site clair qui présente ses interventions et permette de le contacter facilement.",
      en: "Jean-Louis Clément works with individuals, teams and institutions. He needed a clear website presenting his services and making it easy to get in touch.",
    },
    challenge: {
      fr: "Présenter des prestations variées (analyse de la pratique, interventions en entreprise) de façon lisible et rassurante, avec un site bien référencé localement.",
      en: "Present a range of services (practice analysis, workplace interventions) in a readable, reassuring way, with good local search visibility.",
    },
    approach: {
      fr: "Un site léger et rapide, centré sur le contenu, avec une prise de contact mise en avant et des balises SEO adaptées à une activité locale.",
      en: "A light, fast site focused on content, with a prominent contact call-to-action and SEO tags suited to a local practice.",
    },
    features: [
      { fr: "Présentation claire des interventions", en: "Clear presentation of services" },
      { fr: "Demande de renseignement et de devis", en: "Information and quote requests" },
      { fr: "SEO local", en: "Local SEO" },
      { fr: "Adapté au mobile", en: "Mobile-friendly" },
    ],
  },
  {
    slug: "col-et-cadre",
    title: "Col & Cadre",
    image: "/images/projects/col-et-cadre.webp",
    gallery: [
      "/images/projects/col-et-cadre-categories.webp",
      "/images/projects/col-et-cadre-boutique.webp",
      "/images/projects/col-et-cadre-atelier.webp",
      "/images/projects/col-et-cadre-tarifs.webp",
      "/images/projects/col-et-cadre-equipe.webp",
    ],
    stack: ["Next.js", "Payload CMS", "MongoDB", "TailwindCSS", "TypeScript", "Docker"],
    status: ProjectStatus.DONE,
    category: ProjectCategory.DEMO,
    order: 0,
    visible: true,
    liveLink: "https://www.col-et-cadre.teovillet.fr",
    githubLink: "https://github.com/teovlt/Col-et-cadre",
    tagline: {
      fr: "Site de démonstration d'un atelier de réparation et d'une boutique de vélos, skis et trottinettes d'occasion, avec un espace de gestion complet.",
      en: "Demo website for a repair workshop and second-hand bike, ski and scooter shop, with a full management area.",
    },
    role: { fr: "Direction artistique, design et développement", en: "Art direction, design and development" },
    timeline: { fr: "2025 — 2026", en: "2025 — 2026" },
    overview: {
      fr: "Col & Cadre est un commerce fictif, imaginé pour montrer ce qu'un atelier de quartier peut avoir en ligne. L'été, on y répare des vélos ; l'hiver, des skis ; les trottinettes passent toute l'année. Le site présente la boutique d'occasion, les tarifs de l'atelier, l'équipe et permet de réserver un créneau. Tout le contenu se gère depuis un tableau de bord en français, jusqu'au nom du commerce.",
      en: "Col & Cadre is a fictional shop, built to show what a neighbourhood workshop can have online. Bikes get fixed in summer, skis in winter, and scooters all year round. The site showcases the second-hand shop, the workshop's prices and the team, and lets visitors book a slot. Everything is managed from a French dashboard, right down to the shop's name.",
    },
    challenge: {
      fr: "Un magasin d'occasion a un stock qui change chaque semaine et une activité qui suit les saisons. Le gérant doit pouvoir ajouter un vélo, changer un prix ou ses horaires en deux minutes, sans développeur. Il fallait aussi une identité qui ne ressemble pas à un modèle générique, et un site prêt à être repris pour un vrai commerce en changeant seulement le nom et le contenu.",
      en: "A second-hand shop's stock changes every week and its business follows the seasons. The owner must be able to add a bike, change a price or the opening hours in two minutes, without a developer. It also needed an identity that doesn't look like a generic template, and a site ready to be reused for a real shop by changing only the name and the content.",
    },
    approach: {
      fr: "J'ai commencé par la direction artistique : un « atelier alpin » en vert sapin, crème et jaune signalisation, la typo Barlow inspirée des panneaux routiers, et un logo qui réunit une roue, deux sommets et la route en lacets du col. Le site est construit avec Next.js et Payload CMS sur MongoDB. Le nom, le slogan, la ville et les textes de l'accueil sont réglables dans l'admin et repris partout. Un script remplit la base avec un contenu de démonstration complet, photos comprises, et l'ensemble est déployé en Docker sur mon VPS avec Dokploy.",
      en: "I started with the art direction: an \"alpine workshop\" look in pine green, cream and road-sign yellow, the Barlow typeface inspired by road signs, and a logo combining a wheel, two peaks and the winding road up the pass. The site is built with Next.js and Payload CMS on MongoDB. The name, tagline, city and homepage copy are editable in the admin and used everywhere. A script fills the database with complete demo content, photos included, and everything is deployed with Docker on my VPS using Dokploy.",
    },
    features: [
      { fr: "Identité complète : logo, palette, typographies et favicon", en: "Complete identity: logo, palette, typefaces and favicon" },
      { fr: "Nom du commerce et textes clés modifiables depuis l'admin", en: "Shop name and key copy editable from the admin" },
      { fr: "Boutique d'occasion avec filtres par catégorie et tri par prix", en: "Second-hand shop with category filters and price sorting" },
      { fr: "Tarifs de l'atelier présentés comme un tableau d'atelier", en: "Workshop prices laid out like a workshop board" },
      { fr: "Indicateur « ouvert / fermé » calculé depuis les horaires", en: "\"Open / closed\" indicator computed from the opening hours" },
      { fr: "Prise de rendez-vous à l'atelier", en: "Workshop appointment booking" },
      { fr: "Espace de gestion Payload CMS en français, aux couleurs du site", en: "French Payload CMS management area, styled to match the site" },
      { fr: "Contenu de démonstration généré en un clic", en: "Demo content generated in one click" },
      { fr: "Responsive, SEO (sitemap, Open Graph) et déploiement Docker", en: "Responsive, SEO (sitemap, Open Graph) and Docker deployment" },
    ],
  },
];

const run = async () => {
  await connectDB();

  for (const [slug, update] of Object.entries(categories)) {
    const result = await Project.updateOne({ slug }, update);
    console.log(result.matchedCount ? `Categorised project: ${slug}` : `Project not found: ${slug}`);
  }

  for (const project of projects) {
    const existing = await Project.findOne({ slug: project.slug });
    if (existing) {
      console.log(`Skipping existing project: ${project.slug}`);
      continue;
    }
    await Project.create(project);
    console.log(`Inserted project: ${project.slug}`);
  }

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
