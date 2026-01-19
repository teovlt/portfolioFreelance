"use client";

import { TestimonialCarousel } from "@/components/customs/testimonials-caroussel";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function ReviewsSection() {
  const totalReviews = 5;
  const { t } = useTranslation();

  // Variante pour le conteneur principal qui orchestre l'animation des enfants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Délai entre chaque animation enfant
      },
    },
  };

  // Variante pour chaque élément animé individuellement
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="reviews-section"
      className="min-h-screen flex items-center justify-center py-20 p-4 bg-gradient-to-br dark:from-muted/30 dark:to-muted/50 from-muted/80 to-muted/90"
    >
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible" // Déclenche l'animation quand la section est visible
        viewport={{ once: true, amount: 0.2 }} // Se déclenche une seule fois quand 20% est visible
        variants={containerVariants}
      >
        <div className="text-center mb-16">
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-8">
            {t("reviews.title1")} <span className="text-primary">{t("reviews.title2")}</span>
          </motion.h2>

          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-6">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-3xl font-bold text-blue-600">5.0</span>
            <span className="text-muted-foreground text-lg">
              ({totalReviews} {t("reviews.reviews")})
            </span>
          </motion.div>

          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("reviews.subtitle")}
          </motion.p>
        </div>

        <motion.div variants={itemVariants}>
          <TestimonialCarousel />
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-12">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-full border border-green-200 dark:border-green-800">
            <span className="font-bold text-green-800 dark:text-green-200 text-lg">{t("reviews.badge")}</span>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
