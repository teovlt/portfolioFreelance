import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Code2, Download, Github, Linkedin, Mail, Sparkles, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Hero3DFigure } from "@/components/Homefigure";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import { scrollToSection } from "@/utils/scrollToSection";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { ParticleBackground } from "@/components/customs/particle-background";
import { TypingAnimation } from "@/components/customs/typing-animations";

export const Home = () => {
  const { t, i18n } = useTranslation();

  const typingTexts = ["Modern Web Applications", "Exceptional User Experiences", "Innovative Digital Solutions"];

  return (
    <section id="home-section" className="h-screen flex items-center justify-center">
      {/* <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-items-center px-4">
        <div className="flex flex-col items-start text-left gap-6 w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
            <span className="inline-block text-sm md:text-base text-primary font-medium px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
              {t("home.developer")}
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
              {t("home.hello")} <span className="text-primary">Téo Villet</span>
            </h1>
            <h2 className="text-xl text-muted-foreground">{t("home.title")}</h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            {t("home.subtitle")}
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
              <span>{t("home.action1")}</span>
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
              <span>{t("home.action2")}</span>
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
      */}

      <ParticleBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Status Badge */}
          <div className="mb-8 flex justify-center">
            <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800 px-4 py-2 text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              {"Available for new projects"}
            </Badge>
          </div>

          {/* Main Content */}
          <div className="mb-8">
            <p className="text-lg text-muted-foreground mb-4 animate-fade-in-up"> {t("home.hello")}</p>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up animation-delay-200">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">VILLET</span>{" "}
              <span className="text-foreground">Téo</span>
            </h1>

            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-8 h-16 flex items-center justify-center animate-fade-in-up animation-delay-400">
              <span className="mr-4">{"I create"}</span>
              <TypingAnimation texts={typingTexts} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {/* Enhanced Description */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600">
            {t("home.subtitle")}
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in-up animation-delay-800">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">4.9</span>
              <span>{"Average rating"}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="font-semibold">50+</span>
              <span>{"Happy clients"}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Code2 className="h-5 w-5 text-purple-500" />
              <span className="font-semibold">4+</span>
              <span>{"Years experience"}</span>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-1000">
            <Button
              size="lg"
              onClick={(e) => {
                scrollToSection("contact-section", e);
              }}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
              <span>{t("home.action1")}</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={(e) => {
                scrollToSection("projects-section", e);
              }}
              className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span>{t("home.action2")}</span>
              <Download className="ml-2 h-5 w-5 group-hover:animate-bounce" />
            </Button>
          </div>
        </div>
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
