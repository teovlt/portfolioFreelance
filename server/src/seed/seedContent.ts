import "dotenv/config";
import mongoose from "mongoose";
import { Model } from "mongoose";
import { connectDB } from "../config/db.js";
import { ContactInfo } from "../models/ContactInfo.js";
import { Experience } from "../models/Experience.js";
import { Package } from "../models/Package.js";
import { Photo } from "../models/Photo.js";
import { Review } from "../models/Review.js";
import { Social } from "../models/Social.js";

// One-off migration of the content that used to be hardcoded in the front-end
// (src/locales/*.json, About.tsx, Services.tsx, Contact.tsx, Footer.tsx, Home.tsx).
// Safe to re-run: a collection that already has documents is left untouched.

const socials = [
  { label: "GitHub", url: "https://github.com/teovlt", icon: "github", order: 0 },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/teo-villet/", icon: "linkedin", order: 1 },
  { label: "Email", url: "mailto:teo.villet2@gmail.com", icon: "mail", order: 2 },
];

const photos = [
  {
    src: "/images/about/me.jpg",
    alt: {
      fr: "Photo de Téo Villet, développeur web freelance à Grenoble, en randonnée en montagne",
      en: "Photo of Téo Villet, freelance web developer in Grenoble, hiking in the mountains",
    },
    position: "32% 28%",
    order: 0,
  },
  {
    src: "/images/about/bridge.jpg",
    alt: {
      fr: "Photo de Téo Villet, développeur web freelance, sur un pont au-dessus d'un canal",
      en: "Photo of Téo Villet, freelance web developer, on a bridge over a canal",
    },
    position: "50% 35%",
    order: 1,
  },
  {
    src: "/images/about/park.jpg",
    alt: {
      fr: "Photo de Téo Villet, développeur web freelance, dans un parc",
      en: "Photo of Téo Villet, freelance web developer, in a park",
    },
    position: "50% 30%",
    order: 2,
  },
];

const packages = [
  {
    title: { fr: "Design personnalisé", en: "Custom Design" },
    description: {
      fr: "Des maquettes modernes et cohérentes avec votre image, avant de passer au développement.",
      en: "Modern mockups that match your brand, before moving into development.",
    },
    price: "950€",
    duration: { fr: "1 à 2 semaines", en: "1 to 2 weeks" },
    badge: { fr: "Étape optionnelle", en: "Optional step" },
    deliverables: [
      { fr: "Maquettes visuelles (Figma)", en: "Visual mockups (Figma)" },
      { fr: "Design mobile & bureau", en: "Mobile & desktop design" },
      { fr: "Couleurs & typographies pro", en: "Professional colors & fonts" },
      { fr: "Combinable avec un forfait développement", en: "Can be combined with a dev package" },
    ],
    popular: false,
    order: 0,
  },
  {
    title: { fr: "Site vitrine", en: "Showcase Website" },
    description: {
      fr: "Un site clair et rapide pour présenter votre activité ou projet.",
      en: "A clean and fast website to showcase your activity or project.",
    },
    price: "1 400€",
    duration: { fr: "1 à 2 semaines", en: "1 to 2 weeks" },
    badge: { fr: "Plus populaire", en: "Most Popular" },
    deliverables: [
      { fr: "Mobile & bureau", en: "Mobile & desktop ready" },
      { fr: "Pages rapides & optimisées", en: "Fast, optimized pages" },
      { fr: "Design moderne sur-mesure", en: "Custom modern design" },
      { fr: "Hébergement & assistance 30 jours inclus", en: "Hosting & 30-day support included" },
    ],
    popular: true,
    order: 1,
  },
  {
    title: { fr: "Site avec fonctionnalités", en: "Website with Features" },
    description: {
      fr: "Avis, formulaire de contact, réservation, espace personnel, et plus.",
      en: "Reviews, contact form, booking, personal space, and more.",
    },
    price: "2 900€",
    duration: { fr: "2 à 5 semaines", en: "2 to 5 weeks" },
    badge: { fr: "", en: "" },
    deliverables: [
      { fr: "Espace personnel sécurisé", en: "Secure personal space" },
      { fr: "Formulaires & réservation", en: "Forms & booking system" },
      { fr: "Connexion identifiants", en: "Login system" },
      { fr: "Hébergement & assistance 30 jours inclus", en: "Hosting & 30-day support included" },
    ],
    popular: false,
    order: 2,
  },
  {
    title: { fr: "Site complet", en: "Complete Website" },
    description: {
      fr: "Plusieurs pages, fonctionnalités personnalisées, base de données, et tout ce qu'il faut.",
      en: "Multiple pages, custom features, database, and everything needed.",
    },
    price: "5 500€",
    duration: { fr: "4 à 8 semaines", en: "4 to 8 weeks" },
    badge: { fr: "", en: "" },
    deliverables: [
      { fr: "Site sur mesure multi-pages", en: "Custom multi-page website" },
      { fr: "Fonctionnalités avancées", en: "Advanced features" },
      { fr: "Base de données & stockage", en: "Database & storage" },
      { fr: "Hébergement & assistance 60 jours inclus", en: "Hosting & 60-day support included" },
    ],
    popular: false,
    order: 3,
  },
];

const reviews = [
  {
    name: "Timon Guillotin",
    company: {
      fr: "Auto entrepreneur & CEO",
      en: "Freelancer & CEO",
    },
    comment: {
      fr: "Téo a donné vie à Ciel Avenue avec une attention incroyable aux détails. Ses compétences techniques et sa vision créative nous ont aidés à construire une plateforme qui simplifie vraiment l'immobilier. Travailler avec lui a été un vrai plaisir !",
      en: "Téo brought Ciel Avenue to life with incredible attention to detail. His technical skills and creative vision helped us build a platform that truly simplifies real estate. Working with him was an absolute pleasure!",
    },
    project: {
      fr: "Plateforme Ciel Avenue",
      en: "Ciel Avenue platform",
    },
    rating: 5,
    image: "/images/reviews/timon.jpeg",
    website: "https://www.linkedin.com/in/timon-guillotin/?originalSubdomain=fr",
    status: "published",
    order: 0,
  },
  {
    name: "Axel Elias",
    company: {
      fr: "Co-fondateur - Couverto",
      en: "Co-founder - Couverto",
    },
    comment: {
      fr: "Couverto est parti de mon idée, et Téo m'a aidé à la concrétisée. Nous partageons ce projet à 50/50, et son expertise technique combinée à son engagement ont fait toute la différence. Un vrai partenaire à tous les niveaux !",
      en: "Couverto started as my idea, and Téo helped me turn it into reality. We share this project 50/50, and his technical expertise combined with his dedication made all the difference. A true partner in every sense!",
    },
    project: {
      fr: "Plateforme Couverto",
      en: "Couverto platform",
    },
    rating: 5,
    image: "/images/reviews/axel.jpeg",
    website: "https://www.linkedin.com/in/axel-elias/",
    status: "published",
    order: 1,
  },
  {
    name: "Mayeul Deries",
    company: {
      fr: "Développeur Freelance",
      en: "Freelance Developer",
    },
    comment: {
      fr: "Téo m'a aidé à créer un site exceptionnel pour suivre mes candidatures. Son professionnalisme et son souci du détail sont remarquables. Je recommande vivement !",
      en: "Téo helped me build an exceptional website to track job applications. His professionalism and attention to detail are remarkable. I highly recommend!",
    },
    project: {
      fr: "Plateforme de suivi d'emploi",
      en: "Job tracker platform",
    },
    rating: 5,
    image: "/images/reviews/mayeul.jpeg",
    website: "https://mayeulderies.fr/",
    status: "published",
    order: 2,
  },
  {
    name: "Gabriel Halus",
    company: {
      fr: "Développeur Freelance",
      en: "Freelance Developer",
    },
    comment: {
      fr: "J'ai eu le plaisir de travailler avec Téo sur les projets Let'sgo Lego, Paperlive et Ahcanfut. Ce fut à chaque fois une très belle expérience. Téo apporte naturellement des idées innovantes et sait toujours trouver des solutions pertinentes face aux défis rencontrés. C'est un vrai plaisir de collaborer avec lui.",
      en: "I had the pleasure of working with Téo on the Let'sgo Lego, Paperlive, and Ahcanfut projects. It was a great experience every time. Téo naturally brings innovative ideas and always finds relevant solutions to challenges. It is a genuine pleasure collaborating with him.",
    },
    project: {
      fr: "Let'sgo Lego, Paperlive, et Ahcanfut",
      en: "Let'sgo Lego, Paperlive, and Ahcanfut",
    },
    rating: 5,
    image: "/images/reviews/gabriel.jpeg",
    website: "https://gabrielhalus.com",
    status: "published",
    order: 3,
  },
  {
    name: "Félix Picon",
    company: {
      fr: "Administrateur Système",
      en: "System Administrator",
    },
    comment: {
      fr: "Le boilerplate de Téo m'a fait gagner des heures d'installation. Ses conseils étaient précis, clairs et vraiment utiles. Ce fut un plaisir de collaborer avec quelqu'un d'aussi passionné et rigoureux.",
      en: "Téo's boilerplate saved me hours of setup. His guidance was sharp, clear, and very useful. It was great to collaborate with someone so precise and passionate.",
    },
    project: {
      fr: "Support intégration boilerplate",
      en: "Boilerplate integration support",
    },
    rating: 5,
    image: "/images/reviews/felix.jpeg",
    website: "https://www.linkedin.com/in/f%C3%A9lix-picon-519231317/",
    status: "published",
    order: 4,
  },
];

const experiences = [
  {
    type: "formation",
    logo: "/images/experiences/imt-nord-europe.png",
    org: {
      fr: "IMT Nord Europe",
      en: "IMT Nord Europe",
    },
    title: {
      fr: "Diplôme d'ingénieur en informatique",
      en: "Engineering Degree in Computer Science",
    },
    location: {
      fr: "Villeneuve d'Ascq, France",
      en: "Villeneuve d'Ascq, France",
    },
    date: {
      fr: "2024 — 2027",
      en: "2024 — 2027",
    },
    description: {
      fr: "Spécialisation en ingénierie logicielle, avec un accent sur le développement full-stack et la conception de systèmes. En alternance au GIPSA-Lab.",
      en: "Specializing in software engineering, focusing on full-stack development and system design. In apprenticeship at GIPSA-Lab.",
    },
    highlights: [
      {
        fr: "Spécialisation génie logiciel et architecture système",
        en: "Software engineering and systems architecture track",
      },
      {
        fr: "Alternance en entreprise en parallèle du cursus",
        en: "Apprenticeship alongside the degree",
      },
      {
        fr: "Projets d'ingénierie en équipe sur cahier des charges réel",
        en: "Team engineering projects on real-world specs",
      },
    ],
    order: 0,
  },
  {
    type: "alternance",
    logo: "/images/experiences/gipsa-lab.png",
    org: {
      fr: "GIPSA-Lab",
      en: "GIPSA-Lab",
    },
    title: {
      fr: "Développeur FullStack",
      en: "FullStack Developer",
    },
    location: {
      fr: "Grenoble, France",
      en: "Grenoble, France",
    },
    date: {
      fr: "2023 — aujourd'hui",
      en: "2023 — present",
    },
    description: {
      fr: "Développement et maintenance d'applications web, avec une attention particulière à l'expérience utilisateur et à la performance.",
      en: "Developing and maintaining web applications, focusing on user experience and performance.",
    },
    highlights: [
      {
        fr: "Développement d'outils internes pour les équipes de recherche",
        en: "Building internal tools for research teams",
      },
      {
        fr: "Maintenance et évolution d'applications existantes",
        en: "Maintaining and evolving existing applications",
      },
      {
        fr: "Collaboration directe avec chercheurs et doctorants",
        en: "Working directly with researchers and PhD students",
      },
    ],
    order: 1,
  },
  {
    type: "stage",
    logo: "/images/experiences/lig.png",
    org: {
      fr: "Laboratoire d'Informatique de Grenoble",
      en: "Grenoble Computer Science Laboratory",
    },
    title: {
      fr: "Développeur FullStack",
      en: "FullStack Developer",
    },
    location: {
      fr: "Grenoble, France",
      en: "Grenoble, France",
    },
    date: {
      fr: "Juin 2023",
      en: "June 2023",
    },
    description: {
      fr: "Création d'une application web complète pour aider les doctorants à gérer leurs projets de recherche.",
      en: "Created a web application from scratch to help doctorants manage their research projects.",
    },
    highlights: [
      {
        fr: "Conception de l'application de A à Z, du cahier des charges à la mise en production",
        en: "Built the app end-to-end, from spec to production",
      },
      {
        fr: "Interface pensée avec les doctorants, utilisateurs finaux",
        en: "Interface designed with PhD students, the end users",
      },
      {
        fr: "Livraison en autonomie sur un calendrier contraint",
        en: "Delivered independently on a tight timeline",
      },
    ],
    order: 2,
  },
  {
    type: "formation",
    logo: "/images/experiences/iut2-informatique.png",
    org: {
      fr: "IUT2 de Grenoble",
      en: "IUT2 Grenoble",
    },
    title: {
      fr: "BUT Informatique",
      en: "Bachelor of Technology in Computer Science",
    },
    location: {
      fr: "Grenoble, France",
      en: "Grenoble, France",
    },
    date: {
      fr: "2021 — 2024",
      en: "2021 — 2024",
    },
    description: {
      fr: "Formation axée sur le développement logiciel, les algorithmes et les structures de données.",
      en: "Focus on software development, algorithms, and data structures.",
    },
    highlights: [
      {
        fr: "Algorithmique, structures de données et bases de données",
        en: "Algorithms, data structures and databases",
      },
      {
        fr: "Projets de groupe en méthodologie agile",
        en: "Group projects using agile methodology",
      },
      {
        fr: "Stages en entreprise chaque année de formation",
        en: "Internships every year of the program",
      },
    ],
    order: 3,
  },
];

const contactInfo = {
  email: "teo.villet2@gmail.com",
  phone: "+33 6 18 21 56 37",
  location: { fr: "Grenoble, FR", en: "Grenoble, FR" },
  locationUrl: "https://www.google.fr/search?q=lille+grenoble",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const seedCollection = async (name: string, model: Model<any>, docs: object[]) => {
  if (await model.exists({})) {
    console.log(`Skipped ${name}: collection already has documents`);
    return;
  }
  await model.insertMany(docs);
  console.log(`Inserted ${docs.length} ${name}`);
};

const run = async () => {
  await connectDB();

  await seedCollection("socials", Social, socials);
  await seedCollection("photos", Photo, photos);
  await seedCollection("packages", Package, packages);
  await seedCollection("reviews", Review, reviews);
  await seedCollection("experiences", Experience, experiences);
  await seedCollection("contact info", ContactInfo, [contactInfo]);

  await mongoose.disconnect();
};

run().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
