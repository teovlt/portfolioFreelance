import { motion } from "framer-motion";
import { Palette, Globe, Smartphone } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";

export const Services = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-muted/30 to-muted/50"
      id="services-section"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold "
          >
            Let’s build <span className="text-primary">together</span>
          </motion.h2>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              icon={<Globe className="h-12 w-12 text-primary" />}
              title="Web Development"
              description="Custom website development with focus on performance, SEO, and responsive design. From simple landing pages to complex web applications."
              points={["Responsive Design", "E-commerce Solutions", "CMS Integration", "API Development"]}
              delay={0.1}
            />
            <ServiceCard
              icon={<Smartphone className="h-12 w-12 text-primary" />}
              title="Mobile App Development"
              description="Native and cross-platform mobile app development for iOS and Android with focus on user experience and performance."
              points={["Native iOS/Android", "Cross-platform Solutions", "App Store Optimization", "Maintenance & Support"]}
              delay={0.2}
            />
            <ServiceCard
              icon={<Palette className="h-12 w-12 text-primary" />}
              title="UI/UX Design"
              description="User-centered design solutions that enhance customer satisfaction and retention through intuitive and engaging interfaces."
              points={["User Research", "Wireframing & Prototyping", "Visual Design", "Usability Testing"]}
              delay={0.3}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
