import { SchoolIcon, StarIcon, BriefcaseBusiness } from "lucide-react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const Experiences = () => {
  const { t } = useTranslation();

  const timelineData = [
    {
      type: "education",
      date: "2024 - 2027",
      title: t("experiences.timeline.0.title"),
      subtitle: t("experiences.timeline.0.subtitle"),
      description: t("experiences.timeline.0.description"),
      icon: <SchoolIcon />,
      bgColor: "rgb(0, 45,100)",
    },
    {
      type: "work",
      date: t("experiences.timeline.1.date"),
      title: t("experiences.timeline.1.title"),
      subtitle: t("experiences.timeline.1.subtitle"),
      description: t("experiences.timeline.1.description"),
      icon: <BriefcaseBusiness />,
      bgColor: "rgb(59, 130, 246)",
    },
    {
      type: "internship",
      date: t("experiences.timeline.2.date"),
      title: t("experiences.timeline.2.title"),
      subtitle: t("experiences.timeline.2.subtitle"),
      description: t("experiences.timeline.2.description"),
      icon: <BriefcaseBusiness />,
      bgColor: "rgb(59, 130, 246)",
    },
    {
      type: "education",
      date: "2021 - 2024",
      title: t("experiences.timeline.3.title"),
      subtitle: t("experiences.timeline.3.subtitle"),
      description: t("experiences.timeline.3.description"),
      icon: <SchoolIcon />,
      bgColor: "rgb(0, 45,100)",
    },
  ];

  return (
    <section className="min-h-screen py-20 flex items-center justify-center p-4" id="experiences-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold items-center justify-center text-center mb-12"
        >
          {t("experiences.titleStart")} <span className="text-primary">{t("experiences.titleHighlight")}</span>
        </motion.h2>
        <VerticalTimeline lineColor="var(--timeline-line-color)">
          {timelineData.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className={`vertical-timeline-element--${item.type}`}
              contentStyle={{ background: item.bgColor, color: "#fff" }}
              contentArrowStyle={{ borderRight: `7px solid ${item.bgColor}` }}
              date={item.date}
              iconStyle={{ background: item.bgColor, color: "#fff" }}
              icon={item.icon}
            >
              <h3 className="vertical-timeline-element-title">{item.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">{item.subtitle}</h4>
              <p>{item.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};
