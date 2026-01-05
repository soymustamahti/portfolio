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
            <div className="relative overflow-hidden bg-gradient-to-br from-secondary/80 via-secondary/60 to-secondary/40 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-accent/30 hover:border-accent/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-accent/20">
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl"></div>

              <h3 className="relative text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">👨‍💻</span>
                <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent px-1">
                  {t("about.presentation")}
                </span>
              </h3>
              <div className="relative space-y-4">
                <p className="text-textSecondary text-base md:text-lg leading-relaxed">
                  {t("about.presentation.p1")}
                </p>
                <p className="text-textSecondary text-base md:text-lg leading-relaxed">
                  {t("about.presentation.p2")}
                </p>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 auto-rows-fr">
          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard tiltStrength={8}>
              <div className="relative overflow-hidden bg-gradient-to-br from-secondary/80 via-secondary/60 to-secondary/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-accent/30 hover:border-accent/50 transition-all duration-300 h-full shadow-lg hover:shadow-xl hover:shadow-accent/10">
                {/* Decorative element */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-full blur-2xl"></div>

                <h4 className="relative text-xl md:text-2xl font-semibold mb-6 flex items-center gap-3">
                  <span className="text-2xl">🎓</span>
                  <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent px-1">
                    {t("about.education.title")}
                  </span>
                </h4>
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

          {/* Right Column - Location & Languages */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-full"
          >
            <TiltCard tiltStrength={8} className="h-full">
              <div className="relative overflow-hidden bg-gradient-to-br from-secondary/80 via-secondary/60 to-secondary/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-accent/30 hover:border-accent/50 transition-all duration-300 h-full shadow-lg hover:shadow-xl hover:shadow-accent/10 flex flex-col gap-8">
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/10 via-green-500/10 to-red-500/10 rounded-full blur-2xl"></div>

                {/* Location Section */}
                <div className="relative">
                  <h4 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-3">
                    <span className="text-2xl">📍</span>
                    <span className="bg-gradient-to-r from-red-400 to-accent bg-clip-text text-transparent px-1">
                      {t("about.location.title")}
                    </span>
                  </h4>
                  <p className="text-textSecondary text-lg font-medium flex items-center gap-2">
                    <span className="text-xl">🇫🇷</span>
                    {t("about.location.value")}
                  </p>
                </div>

                {/* Divider */}
                <div className="relative h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

                {/* Languages Section */}
                <div className="relative flex-1">
                  <h4 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-3">
                    <span className="text-2xl">🌍</span>
                    <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent px-1">
                      {t("about.languages.title")}
                    </span>
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {languages.map((lang, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="flex items-center gap-3 text-textSecondary bg-primary/30 hover:bg-primary/50 p-3 rounded-lg border border-accent/20 hover:border-accent/40 transition-all duration-300 cursor-default group"
                      >
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                          {lang.flag}
                        </span>
                        <span className="text-sm font-medium group-hover:text-textPrimary transition-colors duration-300">
                          {lang.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
