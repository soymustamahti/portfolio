"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimations } from "../hooks/useScrollAnimations";
import { useI18n } from "../i18n/I18nProvider";
import TiltCard from "./TiltCard";

interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  distinction?: string;
}

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollAnimations(sectionRef, "fadeIn");
  const { t } = useI18n();

  const education: Education[] = [
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

  const languages = [
    { flag: "🇫🇷", name: t("about.languages.french") },
    { flag: "🇦🇪", name: t("about.languages.arabic") },
    { flag: "🇪🇸", name: t("about.languages.spanish") },
    { flag: "🇪🇸", name: t("about.languages.catalan") },
    { flag: "🇬🇧", name: t("about.languages.english") },
    { flag: "🇮🇹", name: t("about.languages.italian") },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {t("about.title")}
        </motion.h2>

        {/* Presentation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <TiltCard tiltStrength={5}>
            <div className="bg-secondary/50 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-accent/20 hover:border-accent/40 transition-all duration-300">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-accent">
                {t("about.presentation")}
              </h3>
              <p className="text-textSecondary text-lg leading-relaxed mb-4">
                {t("about.presentation.p1")}
              </p>
              <p className="text-textSecondary text-lg leading-relaxed">
                {t("about.presentation.p2")}
              </p>
            </div>
          </TiltCard>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard tiltStrength={8}>
              <div className="bg-secondary/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-accent/20 hover:border-accent/40 transition-all duration-300 h-full">
                <h4 className="text-xl md:text-2xl font-semibold mb-6 text-accent flex items-center gap-2">
                  <span>🎓</span>
                  {t("about.education.title")}
                </h4>
                <div className="space-y-6">
                  {education.map((edu, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-l-2 border-accent/40 pl-4 hover:border-accent transition-colors duration-300"
                    >
                      <h5 className="font-semibold text-textPrimary text-base md:text-lg mb-1">
                        {edu.degree}
                      </h5>
                      <p className="text-sm text-accent/80 mb-1">
                        {edu.school}
                      </p>
                      <p className="text-xs text-textSecondary mb-1">
                        {edu.location} • {edu.period}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Right Column - Location & Languages */}
          <div className="space-y-8">
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <TiltCard tiltStrength={10}>
                <div className="bg-secondary/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <h4 className="text-xl md:text-2xl font-semibold mb-4 text-accent flex items-center gap-2">
                    <span>📍</span>
                    {t("about.location.title")}
                  </h4>
                  <p className="text-textSecondary text-lg">
                    {t("about.location.value")}
                  </p>
                </div>
              </TiltCard>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TiltCard tiltStrength={10}>
                <div className="bg-secondary/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <h4 className="text-xl md:text-2xl font-semibold mb-4 text-accent flex items-center gap-2">
                    <span>🌍</span>
                    {t("about.languages.title")}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {languages.map((lang, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2 text-textSecondary"
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
