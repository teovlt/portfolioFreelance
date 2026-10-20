"use client";

import { Helmet } from "react-helmet";
import { Link, useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type CaseStudy = {
  slug: string;
  title: string;
  status: { fr: string; en: string };
  tagline: { fr: string; en: string };
  role: { fr: string; en: string };
  timeline: { fr: string; en: string };
  liveLink?: string;
  githubLink?: string;
  image: string;
  stack: string[];
  overview: { fr: string; en: string };
  challenge: { fr: string; en: string };
  approach: { fr: string; en: string };
  features: { fr: string; en: string }[];
  next: string;
};

const caseStudies: CaseStudy[] = [
  {
    slug: "couverto",
    title: "Couverto",
    status: { fr: "En cours", en: "Ongoing" },
    tagline: {
      fr: "Gestion des réservations et des tables, pensée pour les restaurateurs indépendants.",
      en: "Reservation and table management, built for independent restaurant owners.",
    },
    role: { fr: "Co-fondateur & développeur fullstack", en: "Co-founder & Fullstack Developer" },
    timeline: { fr: "2024 — aujourd'hui", en: "2024 — Present" },
    liveLink: "https://www.couverto.fr",
    image: "/images/projects/couverto.png",
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
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
    next: "job-tracker",
  },
  {
    slug: "ciel-avenue",
    title: "Ciel Avenue",
    status: { fr: "En cours", en: "Ongoing" },
    tagline: {
      fr: "Rendre l'immobilier plus simple, plus rapide et plus accessible pour tous.",
      en: "Making real estate simpler, faster, and more accessible for everyone.",
    },
    role: { fr: "Développeur fullstack freelance", en: "Freelance Fullstack Developer" },
    timeline: { fr: "2024 — aujourd'hui", en: "2024 — Present" },
    githubLink: "https://github.com/teovlt/Ciel-Avenue",
    image: "/images/projects/cielavenue.png",
    stack: ["React", "Chatbot IA", "Gestion des rôles", "Tailwind CSS"],
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
    next: "couverto",
  },
  {
    slug: "paperlive",
    title: "Paperlive",
    status: { fr: "Terminé", en: "Done" },
    tagline: {
      fr: "Aider les doctorants à suivre le cycle de vie de leurs contributions de recherche.",
      en: "Helping PhD students follow the lifecycle of their research contributions.",
    },
    role: { fr: "Développeur FullStack, LIG", en: "FullStack Developer, LIG" },
    timeline: { fr: "Juin 2023", en: "June 2023" },
    liveLink: "https://paperlive.vercel.app",
    githubLink: "https://github.com/teovlt/Paperlive",
    image: "/images/projects/paperlive.png",
    stack: ["React", "Node.js", "Express", "MongoDB", "Styled Components"],
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
    next: "insight-hub",
  },
  {
    slug: "insight-hub",
    title: "Insight-hub",
    status: { fr: "En cours", en: "Ongoing" },
    tagline: {
      fr: "Un tableau de bord personnel pour suivre ses statistiques et rester motivé.",
      en: "A personal dashboard to track your stats and stay motivated.",
    },
    role: { fr: "Développeur fullstack, projet personnel", en: "Fullstack Developer, personal project" },
    timeline: { fr: "2024 — aujourd'hui", en: "2024 — Present" },
    liveLink: "https://insight-hub-prod.vercel.app/",
    githubLink: "https://github.com/teovlt/InsightHub",
    image: "/images/projects/insight-hub.png",
    stack: ["React", "Node.js", "Express", "MongoDB", "Firebase"],
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
    next: "lets-go-lego",
  },
  {
    slug: "lets-go-lego",
    title: "Let's-go Lego",
    status: { fr: "Terminé", en: "Done" },
    tagline: {
      fr: "Une plateforme d'enchères en ligne dédiée aux passionnés de Lego.",
      en: "An online auction platform built for Lego enthusiasts.",
    },
    role: { fr: "Développeur fullstack", en: "Fullstack Developer" },
    timeline: { fr: "2022", en: "2022" },
    githubLink: "https://github.com/BerriatMagasin/letsgo-lego",
    image: "/images/projects/lets-go-lego.png",
    stack: ["React", "Node.js", "Express", "MongoDB", "Styled Components"],
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
    next: "ciel-avenue",
  },
  {
    slug: "job-tracker",
    title: "Job Tracker",
    status: { fr: "Terminé", en: "Done" },
    tagline: {
      fr: "Suivre ses candidatures emploi et stage sans y perdre un tableur.",
      en: "Tracking job and internship applications without losing it in a spreadsheet.",
    },
    role: { fr: "Développeur fullstack freelance", en: "Freelance Fullstack Developer" },
    timeline: { fr: "2024", en: "2024" },
    liveLink: "https://jobtracker-pro.vercel.app/",
    githubLink: "https://github.com/Mayeul-Deries/job-tracker",
    image: "/images/projects/job-tracker.png",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Framer Motion"],
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
    next: "portfolio",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    status: { fr: "Terminé", en: "Done" },
    tagline: {
      fr: "Le site que vous êtes en train de regarder.",
      en: "The site you're currently looking at.",
    },
    role: { fr: "Développeur & direction artistique", en: "Developer & art direction" },
    timeline: { fr: "2024 — aujourd'hui", en: "2024 — Present" },
    liveLink: "https://www.teovillet.fr",
    githubLink: "https://github.com/teovlt/portfolioFreelance",
    image: "/images/projects/portfolio.png",
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
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
    next: "achanfut",
  },
  {
    slug: "achanfut",
    title: "Achanfut",
    status: { fr: "Terminé", en: "Done" },
    tagline: {
      fr: "Une plateforme e-commerce complète avec gestion de comptes, panier et paiement.",
      en: "A full-featured e-commerce platform with account management, cart and payment.",
    },
    role: { fr: "Développeur fullstack freelance", en: "Freelance Fullstack Developer" },
    timeline: { fr: "2023", en: "2023" },
    image: "/images/projects/ahcanfut.png",
    stack: ["Next.js", "Prisma", "MongoDB", "Stripe", "Tailwind CSS"],
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
    next: "mern-boilerplate",
  },
  {
    slug: "mern-boilerplate",
    title: "MERN Boilerplate",
    status: { fr: "Terminé", en: "Done" },
    tagline: {
      fr: "Un modèle de base open-source pour démarrer une app MERN en quelques minutes.",
      en: "An open-source starter kit to spin up a MERN app in minutes.",
    },
    role: { fr: "Créateur & mainteneur, projet open-source", en: "Creator & maintainer, open-source project" },
    timeline: { fr: "2023", en: "2023" },
    githubLink: "https://github.com/teovlt/MERN-BoilerPlate",
    image: "/images/projects/mern-boilerplate.png",
    stack: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    overview: {
      fr: "Un boilerplate que j'ai construit pour éviter de réécrire l'authentification et le panneau d'admin à chaque nouveau projet MERN — aujourd'hui le point de départ de la plupart de mes projets personnels.",
      en: "A boilerplate I built to stop rewriting auth and an admin panel on every new MERN project — now the starting point for most of my personal projects.",
    },
    challenge: {
      fr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.",
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.",
    },
    approach: {
      fr: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
      en: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    features: [
      { fr: "Authentification prête à l'emploi", en: "Ready-to-use authentication" },
      { fr: "Statut utilisateur en temps réel via Socket.io", en: "Real-time user status via Socket.io" },
      { fr: "Panneau d'administration inclus", en: "Admin panel included" },
    ],
    next: "paperlive",
  },
];

export const ProjectCaseStudy = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language === "fr" ? "fr" : "en";

  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return <Navigate to="/#projects-section" replace />;

  const next = caseStudies.find((s) => s.slug === study.next)!;

  return (
    <section className="pt-32 pb-24 px-4">
      <Helmet>
        <title>{`${study.title} — Téo Villet`}</title>
        <meta name="description" content={study.tagline[lang]} />
      </Helmet>

      <div className="container max-w-4xl mx-auto">
        <Link
          to="/#projects-section"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {lang === "fr" ? "Tous les projets" : "All projects"}
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="eyebrow mb-3">
            {lang === "fr" ? "Étude de cas" : "Case Study"} — {study.status[lang]}
          </p>
          <h1 className="text-5xl md:text-7xl mb-5">{study.title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">{study.tagline[lang]}</p>

          <div className="flex flex-wrap gap-x-10 gap-y-4 py-7 border-y border-border mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                {lang === "fr" ? "Rôle" : "Role"}
              </div>
              <div className="text-sm font-semibold">{study.role[lang]}</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                {lang === "fr" ? "Période" : "Timeline"}
              </div>
              <div className="text-sm font-semibold">{study.timeline[lang]}</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                {lang === "fr" ? "Statut" : "Status"}
              </div>
              <div className="text-sm font-semibold">{study.status[lang]}</div>
            </div>
            {study.liveLink && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Live</div>
                <a
                  href={study.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold inline-flex items-center gap-1 border-b border-foreground"
                >
                  {study.liveLink.replace("https://", "")} <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            )}
            {study.githubLink && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Code</div>
                <a
                  href={study.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold inline-flex items-center gap-1 border-b border-foreground"
                >
                  GitHub <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          <div className="rounded-2xl overflow-hidden border border-border shadow-sm mb-16">
            <div className="h-9 bg-muted flex items-center gap-1.5 px-4 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <img src={study.image} alt={study.title} className="w-full object-cover max-h-[560px]" />
          </div>

          <div className="grid sm:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-xl font-bold mb-3">{lang === "fr" ? "Aperçu" : "Overview"}</h2>
              <p className="text-muted-foreground leading-relaxed">{study.overview[lang]}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-3">{lang === "fr" ? "Stack technique" : "Stack"}</h2>
              <div className="flex flex-wrap gap-2">
                {study.stack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-lg font-bold mb-3">{lang === "fr" ? "Le défi" : "The Challenge"}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge[lang]}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-3">{lang === "fr" ? "L'approche" : "The Approach"}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{study.approach[lang]}</p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-xl font-bold mb-2">{lang === "fr" ? "Fonctionnalités clés" : "Key Features"}</h2>
            <div className="divide-y divide-border border-y border-border">
              {study.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 py-4 text-sm">
                  <ArrowRight className="w-4 h-4 text-accent-foreground flex-shrink-0 mt-0.5" />
                  {feature[lang]}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t border-border">
            <Link to="/#projects-section" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              ← {lang === "fr" ? "Retour aux projets" : "Back to all projects"}
            </Link>
            <Button asChild variant="ghost" className="font-semibold">
              <Link to={`/projects/${next.slug}`}>
                {lang === "fr" ? "Projet suivant" : "Next project"}: {next.title}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
