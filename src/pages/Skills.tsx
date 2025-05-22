import { SkillsMarquee } from "@/components/SkillsMarquee";

export const Skills = () => {
  return (
    <section className="min-h-screen flex items-center justify-center p-4" id="skills-section">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Here's what i can <span className="text-primary">do</span>
        </h2>
        <SkillsMarquee />
      </div>
    </section>
  );
};
