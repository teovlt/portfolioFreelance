"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: "project1",
    title: "Achanfut",
    description:
      "A full-featured e-commerce platform with EA accounts management, shopping cart, payment integration, and user authentication.",
    image: "/ahcanfut.png",
    tags: ["NextJS", "Prisma", "MongoDB", "Stripe"],
    liveLink: "https://ahcanfut.com",
  },
  {
    id: "project2",
    title: "MERN Boilerplate",
    description:
      "A boilerplate for building full-stack applications using the MERN stack, with auth, real-time status, admin panel, and more.",
    image: "/mern-boilerplate.png",
    tags: ["MERN", "Socket.io", "Mongoose", "TailwindCSS"],
    githubLink: "https://github.com/TrioGrenobleImt/MERN-BoilerPlate",
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
  return (
    <section className="h-screen flex items-center justify-center bg-muted/30 p-4" id="projects-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work. Each project showcases different skills and technologies that I've acquired over the years.
          </p>
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
                    src={"images/" + project.image}
                    alt={project.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
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
                        Code
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild variant="ghost" size="sm" className="hover:cursor-not-allowed">
                      <span className="text-muted-foreground">Code not available</span>
                    </Button>
                  )}
                  {project.liveLink ? (
                    <Button asChild size="sm">
                      <Link to={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild variant="ghost" size="sm" className="hover:cursor-not-allowed">
                      <span className="text-muted-foreground">Demo not available</span>
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
