"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";

const DownloadResumeButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { t } = useI18n();

  const handleViewResume = (language: "en" | "fr") => {
    window.open(`/${language}_resume.pdf`, "_blank");
    setShowOptions(false);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100]">
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 left-0 bg-gradient-to-br from-primary/95 to-secondary/95 backdrop-blur-xl border-2 border-accent/40 rounded-xl shadow-2xl overflow-hidden min-w-[200px]"
          >
            <div className="p-2 space-y-1">
              <button
                onClick={() => handleViewResume("en")}
                className="w-full px-4 py-3 text-left text-textPrimary hover:bg-accent/20 rounded-lg transition-all duration-300 flex items-center gap-3 group"
              >
                <span className="text-2xl">🇬🇧</span>
                <div>
                  <div className="font-semibold group-hover:text-accent transition-colors">
                    English
                  </div>
                  <div className="text-xs text-textSecondary">
                    View EN resume
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleViewResume("fr")}
                className="w-full px-4 py-3 text-left text-textPrimary hover:bg-accent/20 rounded-lg transition-all duration-300 flex items-center gap-3 group"
              >
                <span className="text-2xl">🇫🇷</span>
                <div>
                  <div className="font-semibold group-hover:text-accent transition-colors">
                    Français
                  </div>
                  <div className="text-xs text-textSecondary">
                    Voir CV FR
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Download Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowOptions(!showOptions)}
        className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 border-2 border-accent/40 relative group"
        aria-label="Download resume"
      >
        <motion.span
          animate={{
            y: showOptions ? 0 : [0, -2, 0],
          }}
          transition={{
            repeat: showOptions ? 0 : Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          📄
        </motion.span>

        {/* Pulsing ring */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full border-2 border-accent"
        />

        {/* Tooltip */}
        <div className="absolute left-16 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <div className="bg-gradient-to-br from-primary/95 to-secondary/95 backdrop-blur-xl border-2 border-accent/40 rounded-lg px-3 py-2 shadow-xl">
            <span className="text-sm text-textPrimary font-semibold">
              {t("common.downloadCv")}
            </span>
          </div>
        </div>
      </motion.button>
    </div>
  );
};

export default DownloadResumeButton;
