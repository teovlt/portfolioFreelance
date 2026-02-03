"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Project status enum
enum ProjectStatus {
  STARTED = "started",
  ONGOING = "ongoing",
  DONE = "done",
}

// Status badge colors
const statusColors: Record<ProjectStatus, string> = {
  [ProjectStatus.STARTED]: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
  [ProjectStatus.ONGOING]: "bg-blue-500/15 text-blue-500 border-blue-500/30",
  [ProjectStatus.DONE]: "bg-green-500/15 text-green-500 border-green-500/30",
};

const projects = [
  {
    id: "project1",
    title: "Achanfut",
    description:
      "A full-featured e-commerce platform with EA accounts management, shopping cart, payment integration, and user authentication.",
    image: "/images/projects/ahcanfut.png",
    tags: ["NextJS", "Prisma", "MongoDB", "Stripe", "TailwindCSS"],
    status: ProjectStatus.DONE,
  },
  {
    id: "project2",
    title: "MERN Boilerplate",
    description:
      "A boilerplate for building full-stack applications using the MERN stack, with auth, real-time status, admin panel, and more.",
    image: "/images/projects/mern-boilerplate.png",
    tags: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    githubLink: "https://github.com/teovlt/MERN-BoilerPlate",
    status: ProjectStatus.DONE,
  },
  {
    id: "project5",
    title: "Insight-hub",
    description: "Your own dashboard to track all the data you want, with a focus on simplicity and ease of use.",
    image: "/images/projects/insight-hub.png",
    tags: ["Firebase", "MongoDB", "Express", "React", "Node.js"],
    githubLink: "https://github.com/teovlt/InsightHub",
    liveLink: "https://insight-hub-prod.vercel.app/",
    status: ProjectStatus.ONGOING,
  },
  {
    id: "project4",
    title: "Paperlive",
    description:
      "A modern application allowing doctorants to follow the life cycle of their contributions and study the statistics of their submissions ",
    image: "/images/projects/paperlive.png",
    tags: ["React", "Node.js", "Express", "MongoDB", "Styled Components"],
    githubLink: "https://github.com/teovlt/Paperlive",
    liveLink: "https://paperlive.vercel.app",
    status: ProjectStatus.DONE,
  },
  {
    id: "project3",
    title: "Portfolio",
    description: "My personal portfolio showcasing my skills and projects.",
    image: "/images/projects/portfolio.png",
    tags: ["React", "TailwindCSS", "Framer Motion"],
    githubLink: "https://github.com/teovlt/portfolioFreelance",
    liveLink: "https://www.teovillet.fr/",
    status: ProjectStatus.DONE,
  },
  {
    id: "project6",
    title: "Lets-go lego",
    description: "Online auction platform for Lego enthusiasts to buy, sell, and bid on unique Lego products.",
    image: "/images/projects/lets-go-lego.png",
    tags: ["MongoDB", "Express", "React", "Node.js", "Styled Components"],
    githubLink: "https://github.com/BerriatMagasin/letsgo-lego",
    status: ProjectStatus.DONE,
  },
  {
    id: "project7",
    title: "Ciel avenue",
    description: "Prototype for a platform that makes real estate simpler, faster, and more accessible for everyone.",
    image: "/images/projects/cielavenue.png",
    tags: ["React", "AI chatbot", "Roles management", "TailwindCSS"],
    githubLink: "https://github.com/teovlt/Ciel-Avenue",
    liveLink: "https://www.cielavenue.fr",
    status: ProjectStatus.ONGOING,
  },
  {
    id: "project8",
    title: "Couverto",
    description:
      "Couverto is a SaaS software dedicated to independent restaurant owners. It provides essential tools for managing reservations, tables, services, and basic customer information.",
    image: "/images/projects/couverto.png",
    tags: ["Socket.io", "TailwindCSS", "MongoDB", "Express", "React", "Node.js"],
    liveLink: "https://www.couverto.fr",
    status: ProjectStatus.ONGOING,
  },
  {
    id: "project9",
    title: "Job trackr",
    description: "",
    image: "/images/projects/job-tracker.png",
    tags: ["React", "TailwindCSS", "Framer Motion", "Node.js", "MongoDB", "Express"],
    liveLink: "https://jobtracker-pro.vercel.app/",
    githubLink: "https://github.com/Mayeul-Deries/job-tracker",
    status: ProjectStatus.DONE,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const Projects = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex sm:py-20 items-center justify-center  p-4" id="projects-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold "
          >
            {t("projects.title")} <span className="text-primary">{t("projects.highlight")}</span>
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">{t("projects.description")}</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Card className="h-full flex flex-col overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-black/30 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between pb-4">
                    <CardTitle>{t(`projects.items.${project.id}.title`)}</CardTitle>
                    <Badge className={`${statusColors[project.status]} text-xs font-medium`}>
                      {t(`projects.status.${project.status}`)}
                    </Badge>
                  </div>
                  <CardDescription>{t(`projects.items.${project.id}.description`)}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={`${project.id}-${tag}`} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {project.githubLink ? (
                    <Button asChild variant="ghost" size="sm">
                      <Link to={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        {t("projects.code")}
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild variant="ghost" size="sm" className="hover:cursor-not-allowed">
                      <span className="text-muted-foreground">{t("projects.noCode")}</span>
                    </Button>
                  )}
                  {project.liveLink ? (
                    <Button asChild size="sm">
                      <Link to={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t("projects.demo")}
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild variant="ghost" size="sm" className="hover:cursor-not-allowed">
                      <span className="text-muted-foreground">{t("projects.noDemo")}</span>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
