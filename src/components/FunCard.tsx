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
        <CardContent className="p-4 flex items-start space-x-3">
          <div className="text-primary mt-1">{icon}</div>
          <div>
            <h4 className="font-bold">{title}</h4>
            <p className="text-sm ">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
