import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Accent } from "@/components/customs/accent-text";

export const About = () => {
  const { t } = useTranslation();

  const skills = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "Tailwind CSS", "Docker", "Vercel", "Git"];

  const quickFacts = [
    { value: "4+", label: t("about.quick.experience") },
    { value: "20+", label: t("about.quick.projects") },
    { value: "100%", label: t("about.quick.satisfaction") },
    { value: "24h", label: t("about.quick.response") },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="about-section"
      className="py-24 sm:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <Helmet>
        <title>Téo Villet - Développeur Fullstack Freelance à Lille & Grenoble</title>
        <meta
          name="description"
          content="Découvrez qui est Téo Villet, développeur web fullstack freelance basé à Lille et Grenoble. Compétences, expérience, parcours et plus encore."
        />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="sr-only">À propos de Téo Villet, Développeur Web Fullstack Freelance à Lille & Grenoble</h1>

          <motion.p variants={itemVariants} className="eyebrow mb-4">
            {t("about.eyebrow")}
          </motion.p>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl mb-16 max-w-xl">
            {t("about.title")} <Accent className="font-serif italic font-medium">{t("about.me")}</Accent>
          </motion.h2>

          <div className="grid lg:grid-cols-[minmax(0,380px)_1fr] gap-16 items-start">
            {/* Photo et infos */}
            <motion.div variants={itemVariants}>
              <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                <div className="absolute -bottom-5 -right-5 w-full h-full rounded-2xl bg-accent -z-10" />
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }} className="aspect-[4/5] w-full">
                  <Avatar className="w-full h-full rounded-2xl border border-border shadow-sm">
                    <AvatarImage
                      src="/images/about/me.jpg"
                      alt="Photo de Téo Villet, développeur web freelance à Grenoble, en randonnée en montagne"
                      className="object-cover w-full h-full rounded-2xl"
                      style={{ objectPosition: "32% 28%" }}
                    />
                    <AvatarFallback className="text-6xl rounded-2xl">TV</AvatarFallback>
                  </Avatar>
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 max-w-sm mx-auto lg:mx-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{t("about.location")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{t("about.availability")}</span>
                </div>
              </div>
            </motion.div>

            {/* Description et détails */}
            <motion.div className="space-y-12" variants={sectionVariants}>
              <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {t("about.description")}
              </motion.p>

              {/* Quick facts */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-y border-border py-8">
                {quickFacts.map((fact, index) => (
                  <div key={index}>
                    <div className="text-3xl font-display font-bold tracking-tight">{fact.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{fact.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Skills */}
              <motion.div variants={itemVariants}>
                <h3 className="eyebrow mb-4">{t("about.techTitle")}</h3>
                <motion.div className="flex flex-wrap gap-2" variants={sectionVariants}>
                  {skills.map((skill, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Badge variant="outline" className="font-normal">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Citation perso */}
              <motion.blockquote variants={itemVariants} className="border-l-2 border-accent pl-6">
                <p className="font-serif italic text-xl sm:text-2xl leading-snug">{`"${t("about.quote")}"`}</p>
              </motion.blockquote>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
