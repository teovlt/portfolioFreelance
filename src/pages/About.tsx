import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Dumbbell, Crown, Ship, MapPin, Calendar, Heart, Footprints } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FunFactCard } from "@/components/FunCard";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const About = () => {
  const { t } = useTranslation();

  const skills = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "Tailwind CSS", "Docker", "Vercel", "Git"];

  return (
    <section id="about-section" className="min-h-screen flex items-center justify-center bg-muted/50 py-20">
      {/* SEO Helmet spécifique */}
      <Helmet>
        <title>Téo Villet - Développeur Fullstack Freelance à Grenoble</title>
        <meta
          name="description"
          content="Découvrez qui est Téo Villet, développeur web fullstack freelance basé à Grenoble. Compétences, fun facts, parcours et plus encore."
        />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* H1 SEO invisible */}
          <h1 className="sr-only">À propos de Téo Villet, Développeur Web Fullstack Freelance à Grenoble</h1>

          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold"
            >
              {t("about.title")} <span className="text-primary">{t("about.me")}</span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo et infos */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block mb-8">
                <div className="relative lg:w-96 lg:h-96 sm:w-80 sm:h-80 mx-auto lg:mx-0">
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src="images/me.png"
                      alt="Photo de Téo Villet, développeur web freelance à Grenoble"
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback className="text-6xl">TV</AvatarFallback>
                  </Avatar>
                </div>
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
            </div>

            {/* Description et détails */}
            <div className="space-y-8">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">{t("about.description")}</p>
                {/* SR-ONLY pour booster mot-clé */}
                <span className="sr-only">
                  Téo Villet est développeur web fullstack freelance, passionné par React, Node.js et basé à Grenoble.
                </span>
              </div>

              {/* Fun facts */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.7 }}>
                <h3 className="text-xl font-semibold mb-4 text-primary">{t("about.factsTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FunFactCard icon={<Dumbbell />} title={t("about.fact1.title")} description={t("about.fact1.desc")} delay={1.0} />
                  <FunFactCard icon={<Crown />} title={t("about.fact2.title")} description={t("about.fact2.desc")} delay={1.1} />
                  <FunFactCard icon={<Ship />} title={t("about.fact3.title")} description={t("about.fact3.desc")} delay={1.2} />
                  <FunFactCard icon={<Footprints />} title={t("about.fact4.title")} description={t("about.fact4.desc")} delay={1.3} />
                </div>
              </motion.div>

              {/* Skills */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  {t("about.techTitle")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Citation perso */}
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <p className="text-blue-800 dark:text-blue-200 italic">{`"${t("about.quote")}"`}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
