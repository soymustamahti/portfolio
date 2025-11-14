"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";

export default function HowItsMadeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Question Mark Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 w-12 h-12 bg-accent/20 hover:bg-accent/30 backdrop-blur-sm border border-accent/40 hover:border-accent rounded-full flex items-center justify-center text-accent font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-accent/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="How this portfolio was made"
      >
        ?
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[95%] max-w-5xl max-h-[90vh] bg-secondary/95 backdrop-blur-xl border border-accent/30 rounded-2xl shadow-2xl flex flex-col"
            >
              <div className="p-6 md:p-8 overflow-y-auto flex-1 [&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-primary/20 [&::-webkit-scrollbar-thumb]:bg-accent/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-accent/70" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(59, 130, 246, 0.5) rgba(0, 0, 0, 0.2)' }}>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-textPrimary mb-2">
                      {t("howItsMade.title")}
                    </h2>
                    <p className="text-textSecondary text-sm">
                      {t("howItsMade.subtitle")}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-textSecondary hover:text-accent transition-colors duration-200 text-2xl"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  {/* Overview */}
                  <div>
                    <h3 className="text-xl font-bold text-accent mb-3">
                      {t("howItsMade.overview.title")}
                    </h3>
                    <p className="text-textSecondary leading-relaxed">
                      {t("howItsMade.overview.description")}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-xl font-bold text-accent mb-3">
                      {t("howItsMade.techStack.title")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {t("howItsMade.techStack.items")
                        .split(";")
                        .filter((item) => item.trim())
                        .map((tech, index) => {
                          const [name, description] = tech.split(" - ");
                          return (
                            <div
                              key={index}
                              className="p-3 bg-primary/30 rounded-lg border border-accent/20"
                            >
                              <div className="font-semibold text-textPrimary">
                                {name}
                              </div>
                              <div className="text-sm text-textSecondary">
                                {description}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Animations */}
                  <div>
                    <h3 className="text-xl font-bold text-accent mb-3">
                      {t("howItsMade.animations.title")}
                    </h3>
                    <ul className="space-y-2">
                      {t("howItsMade.animations.items")
                        .split(";")
                        .filter((item) => item.trim())
                        .map((animation, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-textSecondary"
                          >
                            <span className="text-accent mt-1">✓</span>
                            <span>{animation}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-xl font-bold text-accent mb-3">
                      {t("howItsMade.features.title")}
                    </h3>
                    <ul className="space-y-2">
                      {t("howItsMade.features.items")
                        .split(";")
                        .filter((item) => item.trim())
                        .map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-textSecondary"
                          >
                            <span className="text-accent mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Performance */}
                  <div>
                    <h3 className="text-xl font-bold text-accent mb-3">
                      {t("howItsMade.performance.title")}
                    </h3>
                    <p className="text-textSecondary leading-relaxed">
                      {t("howItsMade.performance.description")}
                    </p>
                  </div>

                  {/* Source Code */}
                  <div className="pt-4 border-t border-accent/20">
                    <a
                      href="https://github.com/soymustamahti/porfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accentHover text-white rounded-lg font-semibold transition-all duration-300"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      {t("howItsMade.viewSource")}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
