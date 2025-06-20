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
      {/* <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-items-center p-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-col items-center text-left gap-6 w-full max-w-md"
        >
          <div className="relative flex flex-col items-center text-center space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative overflow-hidden rounded-full border-4 border-white/10 shadow-2xl animate-bounce-slow"
            >
              <Avatar className="w-full h-full">
                <AvatarImage src="images/me.jpg" alt="Profile Photo" className="object-cover w-full h-full" />
                <AvatarFallback className="text-6xl">TV</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full -rotate-6"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="bg-gradient-to-r from-primary to-primary-dark py-3 px-6 rounded-full shadow-lg"
            >
              <h1 className="text-2xl font-bold">{t("about.vibes")}</h1>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-col justify-center space-y-10"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold"
          >
            {t("about.title")} <span className="text-primary">{t("about.me")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="text-lg leading-relaxed text-justify"
          >
            {t("about.description")}
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.7 }}>
            <h3 className="text-xl font-semibold mb-4 text-primary">{t("about.factsTitle")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FunFactCard icon={<Dumbbell />} title={t("about.fact1.title")} description={t("about.fact1.desc")} delay={1.0} />
              <FunFactCard icon={<Crown />} title={t("about.fact2.title")} description={t("about.fact2.desc")} delay={1.1} />
              <FunFactCard icon={<Ship />} title={t("about.fact3.title")} description={t("about.fact3.desc")} delay={1.2} />
              <FunFactCard icon={<Award />} title={t("about.fact4.title")} description={t("about.fact4.desc")} delay={1.3} />
            </div>
          </motion.div>
        </motion.div>
      </div> */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
            {/* Photo and Personal Info */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block mb-8">
                <div className="relative lg:w-96 lg:h-96 sm:w-80 sm:h-80 mx-auto lg:mx-0">
                  <Avatar className="w-full h-full">
                    {/* <AvatarImage src="images/me.jpg" alt="Profile Photo" className="object-cover w-full h-full" /> */}
                    <AvatarFallback className="text-6xl">TV</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{"Based in France"}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{"Available for new projects"}</span>
                </div>
              </div>
            </div>

            {/* Description and Details */}
            <div className="space-y-8">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {
                    "Passionate about web development for over 4 years, I transform your ideas into performant and elegant digital solutions. My approach combines technical expertise with deep understanding of client needs."
                  }
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {
                    "Each project is a new adventure where I commit to delivering results that exceed your expectations. My priority: your success and your users' satisfaction."
                  }
                </p>
              </div>

              {/* Stats */}
              {/* <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="text-center p-4 border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{stat.number}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div> */}
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
                  {"Technologies I love"}
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

              {/* Personal Touch */}
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <p className="text-blue-800 dark:text-blue-200 italic">
                    {'"My goal is not just to code, but to create experiences that make a mark and bring real value to your business."'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
