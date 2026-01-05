"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimations } from "../hooks/useScrollAnimations";
import { useI18n } from "../i18n/I18nProvider";
import TiltCard from "./TiltCard";

interface EducationType {
  degree: string;
  school: string;
  location: string;
  period: string;
  distinction?: string;
}

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimations(sectionRef, "fadeIn");
  const { t } = useI18n();

  const education: EducationType[] = [
    {
      degree: t("about.education.master.degree"),
      school: t("about.education.master.school"),
      location: t("about.education.master.location"),
      period: t("about.education.master.period"),
    },
    {
      degree: t("about.education.bachelor.degree"),
      school: t("about.education.bachelor.school"),
      location: t("about.education.bachelor.location"),
      period: t("about.education.bachelor.period"),
    },
    {
      degree: t("about.education.bac2.degree"),
      school: t("about.education.bac2.school"),
      location: t("about.education.bac2.location"),
      period: t("about.education.bac2.period"),
    },
    {
      degree: t("about.education.bac.degree"),
      school: t("about.education.bac.school"),
      location: t("about.education.bac.location"),
      period: t("about.education.bac.period"),
    },
  ];

  return (
    <section
      id="education"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {t("about.education.title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <TiltCard tiltStrength={8}>
            <div className="relative overflow-hidden bg-gradient-to-br from-secondary/80 via-secondary/60 to-secondary/40 backdrop-blur-sm p-6 md:p-10 rounded-2xl border border-accent/30 hover:border-accent/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent/10">
              {/* Decorative element */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-full blur-2xl"></div>

              <div className="relative space-y-6">
                {education.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-6 py-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-accent before:to-purple-500 hover:before:w-1 before:transition-all before:duration-300 group"
                  >
                    {/* Decorative dot */}
                    <div className="absolute -left-1.5 top-5 w-3 h-3 bg-accent rounded-full group-hover:scale-150 transition-transform duration-300 shadow-lg shadow-accent/50"></div>

                    <h5 className="font-semibold text-textPrimary text-base md:text-lg mb-2 group-hover:text-accent transition-colors duration-300">
                      {edu.degree}
                    </h5>
                    <p className="text-sm text-accent/90 mb-1 font-medium">
                      {edu.school}
                    </p>
                    <p className="text-xs text-textSecondary flex items-center gap-2">
                      <span>📍</span>
                      {edu.location}
                      <span className="text-accent/50">•</span>
                      <span>📅</span>
                      {edu.period}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
