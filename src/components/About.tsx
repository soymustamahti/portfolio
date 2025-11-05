"use client";

import { useMemo, useRef } from "react";
import { useScrollAnimations } from "../hooks/useScrollAnimations";
import { useI18n } from "../i18n/I18nProvider";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollAnimations(sectionRef, "fadeIn");
  const { t } = useI18n();
  const languageItems = useMemo(() => t("about.languages.items").split(";"), [t]);
  const educationItems = useMemo(() => t("about.education.items").split(";"), [t]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          {t("about.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-secondary/50 backdrop-blur-sm p-8 rounded-2xl border border-accent/20 hover:border-accent/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-accent">{t("about.presentation")}</h3>
              <p className="text-textSecondary leading-relaxed mb-6">{t("about.presentation.p1")}</p>
              <p className="text-textSecondary leading-relaxed">{t("about.presentation.p2")}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:transform hover:scale-105">
              <h4 className="text-xl font-semibold mb-2 text-accent">{t("about.location")}</h4>
              <p className="text-textSecondary">{t("about.location.value")}</p>
            </div>

            <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:transform hover:scale-105">
              <h4 className="text-xl font-semibold mb-2 text-accent">{t("about.languages")}</h4>
              <div className="grid grid-cols-2 gap-2 text-textSecondary">
                {languageItems.map((item, idx) => (
                  <span key={idx}>{item}</span>
                ))}
              </div>
            </div>

            <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:transform hover:scale-105">
              <h4 className="text-xl font-semibold mb-2 text-accent">{t("about.education")}</h4>
              <ul className="space-y-2 text-textSecondary">
                {educationItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
