import { motion } from "framer-motion";
import SpotlightCard from "./ui/reactBits/components/SpotlightCard/SpotlightCard";
import { CardContent } from "./ui/card";
import { Rocket } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  points: string[];
  delay: number;
}

export function ServiceCard({ icon, title, description, points, delay }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <SpotlightCard className="custom-spotlight-card rounded-3xl">
        <CardContent className="p-2 md:p-8 rounded-2xl">
          <div className="flex items-center sm:block gap-3 mb-4 sm:mb-5">
            <div className="text-primary text-2xl sm:text-3xl">{icon}</div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h3>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{description}</p>
          <h4 className="text-primary/80 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3 sm:mb-4">What I Offer</h4>
          <ul className="space-y-2 sm:space-y-3">
            {points.map((point, index) => (
              <li key={index} className="flex items-start sm:items-center gap-2 sm:gap-3">
                <Rocket className="h-4 w-4 sm:h-5 sm:w-5 text-primary/60 mt-[2px] sm:mt-0" />
                <span className="text-xs sm:text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </SpotlightCard>
    </motion.div>
  );
}
