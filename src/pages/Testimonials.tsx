"use client";

import { TestimonialCarousel } from "@/components/customs/testimonials-caroussel";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function ReviewsSection() {
  const totalReviews = 6;
  const { t } = useTranslation();

  return (
    <section id="reviews-section" className="py-20 bg-gradient-to-br dark:from-muted/30 dark:to-muted/50 from-muted/80 to-muted/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold"
            >
              {t("reviews.title1")} <span className="text-primary">{t("reviews.title2")}</span>
            </motion.h2>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-3xl font-bold text-blue-600">5.0</span>
            <span className="text-muted-foreground text-lg">
              ({totalReviews} {t("reviews.reviews")})
            </span>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t("reviews.subtitle")}</p>
        </div>

        <TestimonialCarousel />

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-full border border-green-200 dark:border-green-800">
            <span className="font-bold text-green-800 dark:text-green-200 text-lg">{t("reviews.badge")}</span>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
