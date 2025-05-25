import { SchoolIcon, StarIcon, BriefcaseBusiness } from "lucide-react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";

const timelineData = [
  {
    type: "education",
    date: "2024 - 2027",
    title: "Engineering Degree in Computer Science - IMT Nord Europe",
    subtitle: "Villeneuve d'Ascq, France",
    description:
      "Specializing in software engineering, focusing on full-stack development and system design. In apprenticeship at GIPSA-Lab.",
    icon: <SchoolIcon />,
    bgColor: "rgb(0, 0,100)",
  },
  {
    type: "work",
    date: "2023 - present",
    title: "FullStack Developer - GIPSA-Lab",
    subtitle: "Grenoble, France",
    description: "Developing and maintaining web applications, focusing on user experience and performance.",
    icon: <BriefcaseBusiness />,
    bgColor: "rgb(59, 130, 246)",
  },
  {
    type: "internship",
    date: "June 2023",
    title: "FullStack Developer - Laboratoire d'Informatique de Grenoble",
    subtitle: "Grenoble, France",
    description: "Created a web application from scratch to help doctorants manage their research projects.",
    icon: <BriefcaseBusiness />,
    bgColor: "rgb(59, 130, 246)",
  },

  {
    type: "education",
    date: "2021 - 2024",
    title: "Bachelor of Technology in Computer Science",
    subtitle: "Grenoble, France",
    description: "Focus on software development, algorithms, and data structures.",
    icon: <SchoolIcon />,
    bgColor: "rgb(0, 0,100)",
  },
];

export const Experiences = () => {
  return (
    <section className="min-h-screen py-20 flex items-center justify-center p-4" id="experiences-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold items-center justify-center text-center mb-12"
        >
          My <span className="text-primary">Experiences</span>
        </motion.h2>
        <VerticalTimeline lineColor="var(--timeline-line-color)">
          {timelineData.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className={`vertical-timeline-element--${item.type}`}
              contentStyle={item.title ? { background: item.bgColor, color: "#fff" } : undefined}
              contentArrowStyle={item.title ? { borderRight: `7px solid ${item.bgColor}` } : undefined}
              date={item.date}
              iconStyle={{ background: item.bgColor, color: "#fff" }}
              icon={item.icon}
            >
              {item.title && (
                <>
                  <h3 className="vertical-timeline-element-title">{item.title}</h3>
                  <h4 className="vertical-timeline-element-subtitle">{item.subtitle}</h4>
                  <p>{item.description}</p>
                </>
              )}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};
