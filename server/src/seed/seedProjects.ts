import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { Project, ProjectStatus } from "../models/Project.js";

// One-off migration of the 9 projects that used to be hardcoded in
// src/pages/Projects.tsx and src/pages/ProjectCaseStudy.tsx, merged into the
// unified Project schema. Safe to re-run: skips slugs that already exist.
const projects = [
  {
    slug: "achanfut",
    title: "Achanfut",
    image: "/images/projects/ahcanfut.png",
    stack: ["NextJS", "Prisma", "MongoDB", "Stripe", "TailwindCSS"],
    status: ProjectStatus.DONE,
    order: 0,
    tagline: {
      fr: "Une plateforme e-commerce complète avec gestion de comptes, panier et paiement.",
      en: "A full-featured e-commerce platform with account management, cart and payment.",
    },
    role: { fr: "Développeur fullstack freelance", en: "Freelance Fullstack Developer" },
    timeline: { fr: "2023", en: "2023" },
    overview: {
      fr: "Achanfut est une plateforme e-commerce complète, de la gestion de comptes à l'intégration du paiement, en passant par le panier et l'authentification utilisateur.",
      en: "Achanfut is a full-featured e-commerce platform, from account management to payment integration, cart and user authentication.",
    },
    challenge: {
      fr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    approach: {
      fr: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.",
      en: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    },
    features: [
      { fr: "Gestion de comptes et authentification utilisateur", en: "Account management and user authentication" },
      { fr: "Panier et intégration de paiement Stripe", en: "Cart and Stripe payment integration" },
      { fr: "Base de données relationnelle via Prisma", en: "Relational database via Prisma" },
    ],
  },
  {
    slug: "mern-boilerplate",
    title: "MERN Boilerplate",
    image: "/images/projects/mern-boilerplate.png",
    stack: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    status: ProjectStatus.DONE,
    order: 1,
    githubLink: "https://github.com/teovlt/MERN-BoilerPlate",
    tagline: {
      fr: "Un modèle de base open-source pour démarrer une app MERN en quelques minutes.",
      en: "An open-source starter kit to spin up a MERN app in minutes.",
    },
    role: { fr: "Créateur & mainteneur, projet open-source", en: "Creator & maintainer, open-source project" },
    timeline: { fr: "2023", en: "2023" },
    overview: {
      fr: "Un boilerplate que j'ai construit pour éviter de réécrire l'authentification et le panneau d'admin à chaque nouveau projet MERN — aujourd'hui le point de départ de la plupart de mes projets personnels.",
      en: "A boilerplate I built to stop rewriting auth and an admin panel on every new MERN project — now the starting point for most of my personal projects.",
    },
    challenge: {
      fr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.",
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.",
    },
    approach: {
      fr: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      en: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    features: [
      { fr: "Authentification prête à l'emploi", en: "Ready-to-use authentication" },
      { fr: "Statut utilisateur en temps réel via Socket.io", en: "Real-time user status via Socket.io" },
      { fr: "Panneau d'administration inclus", en: "Admin panel included" },
    ],
  },
  {
    slug: "paperlive",
    title: "Paperlive",
    image: "/images/projects/paperlive.png",
    stack: ["React", "Node.js", "Express", "MongoDB", "Styled Components"],
    status: ProjectStatus.DONE,
    order: 2,
    liveLink: "https://paperlive.vercel.app",
    githubLink: "https://github.com/teovlt/Paperlive",
    tagline: {
      fr: "Aider les doctorants à suivre le cycle de vie de leurs contributions de recherche.",
      en: "Helping PhD students follow the lifecycle of their research contributions.",
    },
    role: { fr: "Développeur FullStack, LIG", en: "FullStack Developer, LIG" },
    timeline: { fr: "Juin 2023", en: "June 2023" },
    overview: {
      fr: "Développé pendant mon passage au Laboratoire d'Informatique de Grenoble (LIG), Paperlive aide les doctorants à gérer leurs projets de recherche et à suivre les statistiques de leurs soumissions.",
      en: "Built from scratch during my time at the Grenoble Computer Science Laboratory (LIG), Paperlive helps PhD students manage their research projects and track the statistics of their submissions.",
    },
    challenge: {
      fr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.",
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.",
    },
    approach: {
      fr: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
      en: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
    },
    features: [
      {
        fr: "Suivi des soumissions sur tout le cycle de vie d'une contribution",
        en: "Submission tracking across a contribution's full lifecycle",
      },
      {
        fr: "Pensé pour que les doctorants gèrent leurs propres projets",
        en: "Built for doctorants to manage their own research projects",
      },
      { fr: "Outils sur mesure développés pour les besoins internes du LIG", en: "Custom tooling developed for LIG's internal needs" },
    ],
  },
  {
    slug: "insight-hub",
    title: "Insight-hub",
    image: "/images/projects/insight-hub.png",
    stack: ["Firebase", "MongoDB", "Express", "React", "Node.js"],
    status: ProjectStatus.ONGOING,
    order: 3,
    liveLink: "https://insight-hub-prod.vercel.app/",
    githubLink: "https://github.com/teovlt/InsightHub",
    tagline: {
      fr: "Un tableau de bord personnel pour suivre ses statistiques et rester motivé.",
      en: "A personal dashboard to track your stats and stay motivated.",
    },
    role: { fr: "Développeur fullstack, projet personnel", en: "Fullstack Developer, personal project" },
    timeline: { fr: "2024 — aujourd'hui", en: "2024 — Present" },
    overview: {
      fr: "Insight-hub est mon terrain de jeu personnel : un tableau de bord pour suivre des statistiques du quotidien, fixer des objectifs et visualiser sa progression dans le temps.",
      en: "Insight-hub is my personal playground: a dashboard to track everyday statistics, set goals, and visualize progress over time.",
    },
    challenge: {
      fr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    approach: {
      fr: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      en: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    },
    features: [
      { fr: "Suivi d'objectifs personnalisés", en: "Custom goal tracking" },
      { fr: "Visualisation de la progression dans le temps", en: "Progress visualization over time" },
      { fr: "Authentification et stockage sécurisé via Firebase", en: "Secure auth and storage via Firebase" },
    ],
  },
  {
    slug: "lets-go-lego",
    title: "Let's-go Lego",
    image: "/images/projects/lets-go-lego.png",
    stack: ["MongoDB", "Express", "React", "Node.js", "Styled Components"],
    status: ProjectStatus.DONE,
    order: 4,
    githubLink: "https://github.com/BerriatMagasin/letsgo-lego",
    tagline: {
      fr: "Une plateforme d'enchères en ligne dédiée aux passionnés de Lego.",
      en: "An online auction platform built for Lego enthusiasts.",
    },
    role: { fr: "Développeur fullstack", en: "Fullstack Developer" },
    timeline: { fr: "2022", en: "2022" },
    overview: {
      fr: "Let's-go Lego permet aux passionnés d'acheter, vendre et enchérir sur des produits Lego uniques, avec un système d'enchères en temps réel pensé pour une petite communauté engagée.",
      en: "Let's-go Lego lets enthusiasts buy, sell, and bid on unique Lego sets, with a real-time auction system built for a small, engaged community.",
    },
    challenge: {
      fr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    approach: {
      fr: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.",
      en: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    },
    features: [
      { fr: "Système d'enchères en temps réel", en: "Real-time bidding system" },
      { fr: "Fiches produits détaillées avec historique", en: "Detailed listings with bid history" },
      { fr: "Comptes vendeurs et acheteurs distincts", en: "Separate buyer and seller accounts" },
    ],
  },
  {
    slug: "ciel-avenue",
    title: "Ciel Avenue",
    image: "/images/projects/cielavenue.png",
    stack: ["React", "AI chatbot", "Roles management", "TailwindCSS"],
    status: ProjectStatus.ONGOING,
    order: 5,
    githubLink: "https://github.com/teovlt/Ciel-Avenue",
    tagline: {
      fr: "Rendre l'immobilier plus simple, plus rapide et plus accessible pour tous.",
      en: "Making real estate simpler, faster, and more accessible for everyone.",
    },
    role: { fr: "Développeur fullstack freelance", en: "Freelance Fullstack Developer" },
    timeline: { fr: "2024 — aujourd'hui", en: "2024 — Present" },
    overview: {
      fr: "Ciel Avenue est une plateforme prototype que j'ai développée pour Timon Guillotin afin de simplifier l'immobilier — de la recherche de biens à la gestion des rôles entre agents, propriétaires et clients.",
      en: "Ciel Avenue is a prototype platform I built for Timon Guillotin to simplify real estate — from browsing listings to managing roles across agents, owners, and clients.",
    },
    challenge: {
      fr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    approach: {
      fr: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.",
      en: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    },
    features: [
      { fr: "Chatbot IA pour accompagner acheteurs et locataires", en: "AI-powered chatbot assistant for buyers and renters" },
      { fr: "Accès par rôle pour agents, propriétaires et clients", en: "Role-based access for agents, owners and clients" },
      { fr: "Parcours de recherche et de consultation simplifié", en: "Streamlined listing and browsing experience" },
    ],
  },
  {
    slug: "couverto",
    title: "Couverto",
    image: "/images/projects/couverto.png",
    stack: ["Socket.io", "TailwindCSS", "MongoDB", "Express", "React", "Node.js"],
    status: ProjectStatus.ONGOING,
    order: 6,
    liveLink: "https://www.couverto.fr",
    tagline: {
      fr: "Gestion des réservations et des tables, pensée pour les restaurateurs indépendants.",
      en: "Reservation and table management, built for independent restaurant owners.",
    },
    role: { fr: "Co-fondateur & développeur fullstack", en: "Co-founder & Fullstack Developer" },
    timeline: { fr: "2024 — aujourd'hui", en: "2024 — Present" },
    overview: {
      fr: "Couverto est une plateforme SaaS dédiée aux restaurateurs indépendants. L'idée est partie de mon associé Axel, et je co-détiens le projet à 50/50 — je m'occupe de toute la partie technique pendant qu'on construit le produit ensemble.",
      en: "Couverto is a SaaS platform dedicated to independent restaurant owners. The idea started with my business partner Axel, and I now co-own the project 50/50 — I handle the full technical build while we shape the product together.",
    },
    challenge: {
      fr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    approach: {
      fr: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      en: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    },
    features: [
      { fr: "Gestion des tables et réservations en temps réel", en: "Real-time table & reservation management" },
      { fr: "Outils de coordination du service et du personnel", en: "Service and staff coordination tools" },
      { fr: "Informations et historique client", en: "Customer information & history" },
      { fr: "Construit avec Socket.io pour des mises à jour live", en: "Built on Socket.io for live updates across devices" },
    ],
  },
  {
    slug: "job-tracker",
    title: "Job trackr",
    image: "/images/projects/job-tracker.png",
    stack: ["React", "TailwindCSS", "Framer Motion", "Node.js", "MongoDB", "Express"],
    status: ProjectStatus.DONE,
    order: 7,
    liveLink: "https://jobtracker-pro.vercel.app/",
    githubLink: "https://github.com/Mayeul-Deries/job-tracker",
    tagline: {
      fr: "Suivre ses candidatures emploi et stage sans y perdre un tableur.",
      en: "Tracking job and internship applications without losing it in a spreadsheet.",
    },
    role: { fr: "Développeur fullstack freelance", en: "Freelance Fullstack Developer" },
    timeline: { fr: "2024", en: "2024" },
    overview: {
      fr: "Construit pour Mayeul Deries, Job Tracker centralise les candidatures emploi et stage en un seul endroit : statut, relances et historique, plutôt qu'un tableur qui finit par déborder.",
      en: "Built for Mayeul Deries, Job Tracker centralizes job and internship applications in one place — status, follow-ups and history — instead of a spreadsheet that eventually gets out of hand.",
    },
    challenge: {
      fr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.",
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.",
    },
    approach: {
      fr: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
      en: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
    },
    features: [
      { fr: "Suivi du statut de chaque candidature", en: "Status tracking for every application" },
      { fr: "Rappels de relance programmés", en: "Scheduled follow-up reminders" },
      { fr: "Tableau de bord des statistiques de recherche", en: "Dashboard of job-search statistics" },
    ],
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    image: "/images/projects/portfolio.png",
    stack: ["React", "TailwindCSS", "Framer Motion"],
    status: ProjectStatus.DONE,
    order: 8,
    liveLink: "https://www.teovillet.fr",
    githubLink: "https://github.com/teovlt/portfolioFreelance",
    tagline: {
      fr: "Le site que vous êtes en train de regarder.",
      en: "The site you're currently looking at.",
    },
    role: { fr: "Développeur & direction artistique", en: "Developer & art direction" },
    timeline: { fr: "2024 — aujourd'hui", en: "2024 — Present" },
    overview: {
      fr: "Mon portfolio personnel, pensé comme une vitrine de mon travail et de la façon dont j'aborde un projet : du premier brief à la mise en production, avec la même exigence que pour mes clients.",
      en: "My personal portfolio, built as a showcase of my work and of how I approach a project — from the first brief to production, with the same care I bring to client work.",
    },
    challenge: {
      fr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    approach: {
      fr: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      en: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    },
    features: [
      { fr: "Études de cas détaillées pour chaque projet", en: "Detailed case studies for every project" },
      { fr: "Design responsive et compatible mode sombre", en: "Responsive design with dark mode support" },
      { fr: "Disponible en français et en anglais", en: "Available in French and English" },
    ],
  },
];

const run = async () => {
  await connectDB();

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
