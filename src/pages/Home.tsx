import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Hero3DFigure } from "@/components/hero-3d-figure";
import { Suspense } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const scrollToSection = (id: string, event: any) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const navbarHeight = document.querySelector("header").getBoundingClientRect().height;
      const position = section.offsetTop - navbarHeight;
      window.scrollTo({ top: position, behavior: "smooth" });
    }
  };

  return (
    <section id="home-section" className="h-screen flex items-center justify-center">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-items-center px-4">
        {/* Left Content Column */}
        <div className="flex flex-col items-start text-left gap-6 w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
            <span className="inline-block text-sm md:text-base text-primary font-medium px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
              Full Stack Developer
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
              Hi, I'm <span className="text-primary">Téo Villet</span>
            </h1>
            <h2 className="text-xl text-muted-foreground">Building digital products, brands, and experiences</h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            I build responsive and performant web applications with modern technologies. Specialized in React, Node.js, and everything in
            between.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              asChild
              size="lg"
              aria-label="Get in Touch"
              onClick={(e) => {
                scrollToSection("contact-section", e);
              }}
              className="cursor-pointer"
            >
              <span>Get in Touch</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              onClick={(e) => {
                scrollToSection("projects-section", e);
              }}
              className="cursor-pointer"
            >
              <span>View My Work</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-6 mt-2"
          >
            <Link to="https://github.com/teovlt" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="https://www.linkedin.com/in/teo-villet/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="mailto:teo.villet2@gmail.com">
              <Button variant="ghost" size="icon" aria-label="Email">
                <Mail className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right 3D Figure Column - Hidden on Mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="hidden md:flex justify-center items-center h-[450px] w-full"
        >
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading...</div>}>
            <Hero3DFigure />
          </Suspense>
        </motion.div>
      </div>

      {/* Scroll Down Indicator - Visible on Mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <Button
          variant="ghost"
          className="flex items-center justify-center"
          size="icon"
          onClick={(e) => {
            scrollToSection("about-section", e);
          }}
        >
          <ArrowDown className="h-6 w-6 animate-bounce" />
        </Button>
      </motion.div>
    </section>
  );
};
