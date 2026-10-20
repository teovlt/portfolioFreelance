import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Star } from "lucide-react";
import { scrollToSection } from "@/utils/scrollToSection";
import { useTranslation } from "react-i18next";
import { TypingAnimation } from "@/components/customs/typing-animations";
import { Accent } from "@/components/customs/accent-text";
import { HeroSocialProof } from "@/components/customs/hero-social-proof";
import { motion } from "framer-motion";

export const Home = () => {
  const { t } = useTranslation();

  const typingTexts = [t("home.typing1"), t("home.typing2"), t("home.typing3"), t("home.typing4"), t("home.typing5")];

  const stats = [
    { value: "5.0", label: t("home.rating") },
    { value: "20+", label: t("home.clients") },
    { value: "4+", label: t("home.experience") },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="home-section" className="relative min-h-screen pt-40 pb-24 flex items-center overflow-hidden">
      <Helmet>
        <title>Téo Villet - Développeur Fullstack Freelance à Grenoble</title>
        <meta
          name="description"
          content="Téo Villet, développeur web fullstack freelance basé à Grenoble. Découvrez mon portfolio, mes projets, mon expérience et contactez-moi pour concrétiser vos idées web !"
        />
      </Helmet>

      <div
        className="absolute top-0 right-0 w-[640px] h-[640px] rounded-full pointer-events-none -z-10 opacity-60 dark:opacity-30"
        style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.25), transparent 70%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="xl:grid xl:grid-cols-[1.15fr_0.85fr] xl:gap-12 xl:items-center">
          <motion.div className="max-w-4xl" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">{t("home.badge")}</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-bold leading-[1.02] tracking-tight mb-8 text-balance"
            >
              {t("home.titleStart")} <Accent className="font-serif italic font-medium">{t("home.titleHighlight")}</Accent> {t("home.titleEnd")}
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="flex flex-wrap items-center gap-x-3 text-2xl sm:text-3xl lg:text-4xl text-muted-foreground mb-8 min-h-12"
            >
              <span>{t("home.icreate")}</span>
              <TypingAnimation texts={typingTexts} className="font-serif italic font-medium text-foreground" />
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
              {t("home.subtitle")}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button size="lg" onClick={(e) => scrollToSection("contact-section", e)} className="group">
                {t("home.action1")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={(e) => scrollToSection("projects-section", e)}>
                {t("home.action2")}
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-12 gap-y-6 border-t border-border pt-10">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-display font-bold tracking-tight">{stat.value}</span>
                  {i === 0 && <Star className="h-4 w-4 fill-accent text-accent -ml-1" />}
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <HeroSocialProof />
        </div>
      </div>

      <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Voir la section À propos"
          onClick={(e) => scrollToSection("about-section", e)}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </Button>
      </div>
    </section>
  );
};
