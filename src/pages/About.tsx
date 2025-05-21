import { motion } from "framer-motion";
import { Dumbbell, Crown, Award, Ship } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FunFactCard } from "@/components/FunCard";

export const About = () => {
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
                <AvatarFallback className="text-6xl">JD</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full -rotate-6"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="bg-gradient-to-r from-primary to-primary-dark py-3 px-6 rounded-full shadow-lg"
            >
              <h1 className="text-2xl font-bold">Chill Vibes Only</h1>
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
            className="text-4xl md:text-5xl font-bold "
          >
            Here's a little about <span className="text-primary">me</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className=" text-lg leading-relaxed text-justify"
          >
            I'm a passionate fullstack developer based in Grenoble, currently studying engineering at IMT Nord Europe while doing an
            apprenticeship. I love mixing creativity and logic to build elegant, user-friendly digital experiences. When I'm not coding or
            dreaming up new projects, you'll find me exploring the outdoors, jamming to music, or enjoying a good coffee. I'm always open
            and motivated to take on new external projects — so feel free to reach out!
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.7 }}>
            <h3 className="text-xl font-semibold mb-4 text-primary">Fun Facts About Me</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FunFactCard icon={<Dumbbell />} title="Gym enthusiast" description="At my prime, i had a 110kg bench" delay={1.0} />
              <FunFactCard
                icon={<Crown />}
                title="Amateur chess player"
                description="I've been trying to learn chess recently"
                delay={1.1}
              />
              <FunFactCard icon={<Ship />} title="Echiro Oda supporter" description="I am a huge fan of One Piece " delay={1.2} />
              <FunFactCard icon={<Award />} title="Runner enjoyer" description="I did my first half marathon recently" delay={1.3} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
