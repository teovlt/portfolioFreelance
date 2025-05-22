import { motion } from "framer-motion";
import SpotlightCard from "./ui/reactBits/components/SpotlightCard/SpotlightCard";
import { CardContent } from "./ui/card";
import { ArrowRight, CheckCircle, Rocket } from "lucide-react";
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
        <CardContent className="p-8 rounded-2xl ">
          <div className="text-primary mb-5 text-3xl">{icon}</div>
          <h3 className="text-2xl font-bold mb-3 text-foreground">{title}</h3>
          <p className="text-base text-muted-foreground mb-6">{description}</p>
          <h4 className="text-primary/80 font-semibold tracking-wide uppercase mb-4">What I Offer</h4>
          <ul className="space-y-3">
            {points.map((point, index) => (
              <li key={index} className="flex items-center gap-3">
                <Rocket className="h-5 w-5 text-primary/60" />
                <span className="text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </SpotlightCard>
    </motion.div>
  );
}
