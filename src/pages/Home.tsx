import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Star } from "lucide-react";
import { scrollToSection } from "@/utils/scrollToSection";
import { useTranslation } from "react-i18next";
import { TypingAnimation } from "@/components/customs/typing-animations";
import { Accent } from "@/components/customs/accent-text";
import { HeroSocialProof } from "@/components/customs/hero-social-proof";
import { motion } from "framer-motion";
import { usePackagePricing } from "@/hooks/usePackagePricing";
import { usePublicContent } from "@/hooks/usePublicContent";
import type { Review } from "@/types/content";

export const Home = () => {
  const { t } = useTranslation();
  const { featured } = usePackagePricing();

  const typingTexts = [t("home.typing1"), t("home.typing2"), t("home.typing3"), t("home.typing4"), t("home.typing5")];

  // The rating is the average of the published reviews, the same ones the
  // card next to it shows, rather than a number written in the copy
  const { data: reviews } = usePublicContent<Review[]>("/reviews", []);
  const average = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : null;

  const stats = [
    ...(average !== null ? [{ value: average.toFixed(1), label: t("home.rating"), star: true }] : []),
    { value: "20+", label: t("home.clients") },
    { value: "4+", label: t("home.experience") },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.15, staggerChildren: 0.1 } },
  };

  // Soft rise from a slight blur: the page settles into place on load
  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home-section" className="relative min-h-screen pt-28 pb-10 flex items-center overflow-hidden">
      <Helmet>
        <title>Téo Villet - Développeur Fullstack Freelance à Grenoble</title>
        <meta
          name="description"
          content="Développeur web freelance à Grenoble. Sites vitrines, applications et outils sur mesure pour restaurants, artisans et indépendants. Devis gratuit sous 24 h."
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute top-0 right-0 w-[640px] h-[640px] rounded-full pointer-events-none -z-10"
      >
        <div
          className="w-full h-full rounded-full opacity-60 dark:opacity-30"
          style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.25), transparent 70%)" }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="xl:grid xl:grid-cols-[1.15fr_0.85fr] xl:gap-12 xl:items-center">
          <motion.div className="max-w-4xl" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-1.5 mb-4"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">{t("home.badge")}</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[4.25rem] font-display font-bold leading-[1.05] tracking-tight mb-3 text-balance"
            >
              {t("home.titleStart")} <Accent className="font-serif italic font-medium">{t("home.titleHighlight")}</Accent>{" "}
              {t("home.titleEnd")}
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="flex flex-wrap items-center gap-x-3 text-2xl sm:text-3xl lg:text-4xl text-muted-foreground mb-3 min-h-12"
            >
              <span>{t("home.icreate")}</span>
              <TypingAnimation texts={typingTexts} className="font-serif italic font-medium text-foreground" />
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-5 leading-relaxed">
              {t("home.subtitle")}
              {featured && ` ${t("home.offer", { ...featured, interpolation: { escapeValue: false } })}`}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-6">
              <Button size="lg" onClick={(e) => scrollToSection("contact-section", e)} className="group">
                {t("home.action1")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={(e) => scrollToSection("projects-section", e)}>
                {t("home.action2")}
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:items-center sm:gap-x-12 sm:gap-y-4 border-t border-border pt-5"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
                  <span className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-display font-bold tracking-tight">{stat.value}</span>
                    {"star" in stat && <Star className="h-4 w-4 fill-accent text-accent" />}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <HeroSocialProof />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <Button variant="ghost" size="icon" aria-label="Voir la section Services" onClick={(e) => scrollToSection("services-section", e)}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </Button>
      </motion.div>
    </section>
  );
};
