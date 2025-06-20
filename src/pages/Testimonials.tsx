"use client";

import { TestimonialCarousel } from "@/components/customs/testimonials-caroussel";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function ReviewsSection() {
  const totalReviews = 6;
  const { t } = useTranslation();

  return (
    <section
      id="reviews-section"
      className="py-20 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 bg-muted/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold"
            >
              {t("What my clients")} <span className="text-primary">{t("say")}</span>
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
              ({totalReviews} {"reviews"})
            </span>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {"Discover authentic testimonials from clients who trusted my expertise for their web projects"}
          </p>
        </div>

        <TestimonialCarousel />

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-full border border-green-200 dark:border-green-800">
            {/* <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div> */}
            <span className="font-bold text-green-800 dark:text-green-200 text-lg">{"100% satisfied clients"}</span>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
