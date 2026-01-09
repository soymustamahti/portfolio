"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { RESUME_LANGUAGES } from "@/constants";
import { openInNewTab } from "@/utils";
import type { Locale } from "@/types";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  delay: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onClick, delay }) => (
  <motion.button
    initial={{ opacity: 0, x: 50, scale: 0.8 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: 50, scale: 0.8 }}
    transition={{ duration: 0.2, delay }}
    onClick={onClick}
    className="flex items-center gap-3 bg-primary/95 backdrop-blur-xl border border-accent/40 rounded-full px-4 py-3 shadow-lg hover:border-accent transition-all duration-300"
  >
    <span className="text-xl">{icon}</span>
    <span className="text-sm font-medium text-textPrimary whitespace-nowrap">
      {label}
    </span>
  </motion.button>
);

const MobileFloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showResumeOptions, setShowResumeOptions] = useState(false);
  const { locale, setLocale, t } = useI18n();

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setShowResumeOptions(false);
    }
  }, [isOpen]);

  const handleLanguageToggle = useCallback(() => {
    setLocale(locale === "fr" ? "en" : "fr");
    setIsOpen(false);
  }, [locale, setLocale]);

  const handleGitHub = useCallback(() => {
    openInNewTab("https://github.com/soymustamahti/portfolio");
    setIsOpen(false);
  }, []);

  const handleViewResume = useCallback((language: Locale) => {
    openInNewTab(`/${language}_resume.pdf`);
    setShowResumeOptions(false);
    setIsOpen(false);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[100] md:hidden">
      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute top-16 right-0 flex flex-col items-end gap-2">
            {/* Resume Options */}
            <AnimatePresence>
              {showResumeOptions ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-primary/95 backdrop-blur-xl border border-accent/40 rounded-2xl p-2 shadow-lg"
                >
                  {RESUME_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleViewResume(lang.code)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent/20 transition-colors w-full"
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <div className="text-left">
                        <div className="text-sm font-medium text-textPrimary">
                          {lang.label}
                        </div>
                        <div className="text-xs text-textSecondary">
                          {lang.subtitle}
                        </div>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => setShowResumeOptions(false)}
                    className="w-full text-center text-xs text-textSecondary py-2 hover:text-textPrimary transition-colors"
                  >
                    ← {t("common.back") || "Back"}
                  </button>
                </motion.div>
              ) : (
                <>
                  <MenuItem
                    icon="📄"
                    label={t("common.viewResume") || "View Resume"}
                    onClick={() => setShowResumeOptions(true)}
                    delay={0}
                  />
                  <MenuItem
                    icon={
                      <svg
                        className="w-5 h-5 text-textPrimary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    }
                    label="GitHub"
                    onClick={handleGitHub}
                    delay={0.05}
                  />
                  <MenuItem
                    icon={locale === "fr" ? "🇬🇧" : "🇫🇷"}
                    label={locale === "fr" ? "English" : "Français"}
                    onClick={handleLanguageToggle}
                    delay={0.1}
                  />
                </>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={toggleMenu}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-accent via-purple-500 to-blue-500 shadow-lg shadow-accent/30 flex items-center justify-center transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </motion.button>

      {/* Backdrop for closing menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10"
            onClick={() => {
              setIsOpen(false);
              setShowResumeOptions(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileFloatingMenu;
