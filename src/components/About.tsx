"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimations } from "../hooks/useScrollAnimations";
import { useI18n } from "../i18n/I18nProvider";
import TiltCard from "./TiltCard";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimations(sectionRef, "fadeIn");
  const { t } = useI18n();

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
                <p className="text-textSecondary text-base md:text-lg leading-relaxed">
                  {t("about.presentation.p3")}
                </p>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
