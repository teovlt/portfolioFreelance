import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Dumbbell, Crown, Ship, MapPin, Calendar, Heart, Footprints } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FunFactCard } from "@/components/FunCard"; // Assurez-vous que ce composant est prêt pour framer-motion si besoin
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const About = () => {
  const { t } = useTranslation();

  const skills = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "Tailwind CSS", "Docker", "Vercel", "Git"];

  // Variants pour l'animation de la section principale et de ses enfants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Variants pour les éléments individuels (fade in + slide up)
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

  // Variants pour le conteneur des badges de compétences
  const skillsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Animation plus rapide pour les badges
      },
    },
  };

  return (
    <motion.section
      id="about-section"
      className="min-h-screen flex items-center justify-center bg-muted/50 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Déclenche une fois quand 10% est visible
      variants={sectionVariants}
    >
      <Helmet>
        <title>Téo Villet - Développeur Fullstack Freelance à Grenoble</title>
        <meta
          name="description"
          content="Découvrez qui est Téo Villet, développeur web fullstack freelance basé à Grenoble. Compétences, fun facts, parcours et plus encore."
        />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="sr-only">À propos de Téo Villet, Développeur Web Fullstack Freelance à Grenoble</h1>

          <div className="text-center mb-16">
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold">
              {t("about.title")} <span className="text-primary">{t("about.me")}</span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo et infos */}
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <div className="relative inline-block mb-8">
                <motion.div
                  className="relative lg:w-96 lg:h-96 sm:w-80 sm:h-80 mx-auto lg:mx-0"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar className="w-full h-full shadow-lg">
                    <AvatarImage
                      src="images/me.jpg"
                      alt="Photo de Téo Villet, développeur web freelance à Grenoble"
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback className="text-6xl">TV</AvatarFallback>
                  </Avatar>
                </motion.div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{t("about.location")}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{t("about.availability")}</span>
                </div>
              </div>
            </motion.div>

            {/* Description et détails */}
            <motion.div className="space-y-8" variants={sectionVariants}>
              <motion.div variants={itemVariants}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">{t("about.description")}</p>
                <span className="sr-only">
                  Téo Villet est développeur web fullstack freelance, passionné par React, Node.js et basé à Grenoble.
                </span>
              </motion.div>

              {/* Fun facts */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-4 text-primary">{t("about.factsTitle")}</h3>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  variants={skillsContainerVariants} // Réutilisation pour un effet similaire
                >
                  <FunFactCard icon={<Dumbbell />} title={t("about.fact1.title")} description={t("about.fact1.desc")} />
                  <FunFactCard icon={<Crown />} title={t("about.fact2.title")} description={t("about.fact2.desc")} />
                  <FunFactCard icon={<Ship />} title={t("about.fact3.title")} description={t("about.fact3.desc")} />
                  <FunFactCard icon={<Footprints />} title={t("about.fact4.title")} description={t("about.fact4.desc")} />
                </motion.div>
              </motion.div>

              {/* Skills */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  {t("about.techTitle")}
                </h3>
                <motion.div className="flex flex-wrap gap-2" variants={skillsContainerVariants}>
                  {skills.map((skill, index) => (
                    <motion.div key={index} variants={itemVariants} whileHover={{ y: -3 }}>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Citation perso */}
              <motion.div variants={itemVariants}>
                <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6">
                    <p className="text-blue-800 dark:text-blue-200 italic">{`"${t("about.quote")}"`}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
