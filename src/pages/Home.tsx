import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Code2, Download, Sparkles, Star, Users } from "lucide-react";
import { scrollToSection } from "@/utils/scrollToSection";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { ParticleBackground } from "@/components/customs/particle-background";
import { TypingAnimation } from "@/components/customs/typing-animations";

export const Home = () => {
  const { t } = useTranslation();

  const typingTexts = [t("home.typing1"), t("home.typing2"), t("home.typing3"), t("home.typing4"), t("home.typing5")];

  return (
    <section id="home-section" className="min-h-screen py-28 flex items-center justify-center">
      <Helmet>
        <title>Téo Villet - Développeur Fullstack Freelance à Grenoble</title>
        <meta
          name="description"
          content="Téo Villet, développeur web fullstack freelance basé à Grenoble. Découvrez mon portfolio, mes projets, mon expérience et contactez-moi pour concrétiser vos idées web !"
        />
      </Helmet>

      <ParticleBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Status Badge */}
          <div className="mb-8 flex justify-center">
            <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800 px-4 py-2 text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              {t("home.badge")}
            </Badge>
          </div>

          {/* Main Content */}
          <div className="mb-8">
            <p className="text-lg text-muted-foreground mb-4 animate-fade-in-up">{t("home.hello")}</p>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up animation-delay-200">
              <span className="sr-only">Développeur Fullstack Freelance - </span>
              <span className="text-foreground">Téo</span>{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">VILLET</span>
            </h1>

            <h2 className="hidden sm:flex text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-8 min-h-16 flex-col sm:flex-row items-center justify-center text-center animate-fade-in-up animation-delay-400 px-4 sm:px-8 space-y-2 sm:space-y-0 sm:space-x-3">
              <span className="whitespace-nowrap">{t("home.icreate")}</span>
              <TypingAnimation texts={typingTexts} className="text-blue-600 dark:text-blue-400 break-words max-w-full" />
            </h2>
          </div>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600">
            {t("home.subtitle")}
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in-up animation-delay-800">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">5.0</span>
              <span>{t("home.rating")}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="font-semibold">20+</span>
              <span>{t("home.clients")}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Code2 className="h-5 w-5 text-purple-500" />
              <span className="font-semibold">4+</span>
              <span>{t("home.experience")}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-1000">
            <Button
              size="lg"
              onClick={(e) => scrollToSection("contact-section", e)}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
              <span>{t("home.action1")}</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={(e) => scrollToSection("projects-section", e)}
              className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span>{t("home.action2")}</span>
              <Download className="ml-2 h-5 w-5 group-hover:animate-bounce" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center lg:mt-24 sm:mt-16 mt-12">
          <Button
            variant="ghost"
            className="flex items-center justify-center"
            size="icon"
            aria-label="Voir la section À propos"
            onClick={(e) => scrollToSection("about-section", e)}
          >
            <ArrowDown className="h-6 w-6 animate-bounce" />
          </Button>
        </div>
      </div>
    </section>
  );
};
