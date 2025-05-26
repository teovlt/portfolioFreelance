import { motion } from "framer-motion";
import { Dumbbell, Crown, Award, Ship } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FunFactCard } from "@/components/FunCard";
import { useTranslation } from "react-i18next";
export const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about-section" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/50">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-items-center p-4">
        {/* Photo Section */}
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

        {/* About Content */}
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
      </div>
    </section>
  );
};
