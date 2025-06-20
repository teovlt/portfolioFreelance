import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface FunFactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

export function FunFactCard({ icon, title, description, delay }: FunFactCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}>
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
        {/* align items vertically with items-center and drop the stray `items` keyword */}
        <CardContent className="p-4 flex  space-x-3">
          <span className="text-primary">{icon}</span>
          <h4 className="font-bold">{title}</h4>
          {/* <p className="text-sm">{description}</p> */}
        </CardContent>
      </Card>
    </motion.div>
  );
}
