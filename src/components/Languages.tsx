"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimations } from "../hooks/useScrollAnimations";
import { useI18n } from "../i18n/I18nProvider";
import TiltCard from "./TiltCard";

const Languages: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimations(sectionRef, "fadeIn");
  const { t } = useI18n();

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
      id="languages"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {t("about.languages.title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <TiltCard tiltStrength={8}>
            <div className="relative overflow-hidden bg-gradient-to-br from-secondary/80 via-secondary/60 to-secondary/40 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-accent/30 hover:border-accent/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent/10">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/10 via-green-500/10 to-red-500/10 rounded-full blur-2xl"></div>

              <div className="relative grid grid-cols-2 md:grid-cols-3 gap-6">
                {languages.map((lang, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex flex-col items-center gap-3 p-4 rounded-xl bg-primary/30 hover:bg-primary/50 border border-accent/20 hover:border-accent/40 transition-all duration-300 cursor-pointer group"
                  >
                    <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300">
                      {lang.flag}
                    </span>
                    <span className="text-sm md:text-base text-textPrimary font-medium group-hover:text-accent transition-colors duration-300">
                      {lang.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Location info */}
              <div className="relative mt-8 pt-6 border-t border-accent/20">
                <p className="text-textSecondary text-center text-sm md:text-base flex items-center justify-center gap-2">
                  <span className="text-2xl">📍</span>
                  <span className="font-medium">
                    {t("about.location.value")}
                  </span>
                </p>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Languages;
