"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useI18n } from "../i18n/I18nProvider";

const WelcomeBot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("portfolioVisited");

    if (!hasVisited) {
      // Show bot after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      // If visited before, show the reopen button immediately
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setShowButton(true);
    localStorage.setItem("portfolioVisited", "true");
  };

  const handleReopen = () => {
    setIsVisible(true);
    setShowButton(false);
    setCurrentStep(0);
    setIsMinimized(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  const steps = [
    {
      title: t("welcomeBot.step1.title"),
      message: t("welcomeBot.step1.message"),
      emoji: "👋",
    },
    {
      title: t("welcomeBot.step2.title"),
      message: t("welcomeBot.step2.message"),
      emoji: "🚀",
    },
    {
      title: t("welcomeBot.step3.title"),
      message: t("welcomeBot.step3.message"),
      emoji: "💼",
    },
    {
      title: t("welcomeBot.step4.title"),
      message: t("welcomeBot.step4.message"),
      emoji: "📱",
    },
    {
      title: t("welcomeBot.step5.title"),
      message: t("welcomeBot.step5.message"),
      emoji: "✨",
    },
    {
      title: t("welcomeBot.step6.title"),
      message: t("welcomeBot.step6.message"),
      emoji: "📄",
    },
    {
      title: t("welcomeBot.step7.title"),
      message: t("welcomeBot.step7.message"),
      emoji: "💌",
    },
  ];

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: isMinimized ? 0.9 : 1,
              height: isMinimized ? "auto" : "auto"
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-8 right-8 z-[100] max-w-md"
          >
        {/* Bot Container */}
        <div className="bg-gradient-to-br from-primary/95 to-secondary/95 backdrop-blur-xl border-2 border-accent/40 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 flex items-center justify-between border-b border-accent/30">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
                className="text-3xl"
              >
                🤖
              </motion.div>
              <div>
                <h3 className="font-bold text-textPrimary">
                  {t("welcomeBot.botName")}
                </h3>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                  <span className="text-xs text-textSecondary">
                    {t("welcomeBot.status")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-textSecondary hover:text-textPrimary transition-colors"
                aria-label="Minimize"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </button>
              <button
                onClick={handleClose}
                className="text-textSecondary hover:text-red-500 transition-colors"
                aria-label="Close"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {!isMinimized && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                {/* Step Emoji */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-5xl mb-4 text-center"
                >
                  {steps[currentStep].emoji}
                </motion.div>

                {/* Step Title */}
                <h4 className="text-xl font-bold text-textPrimary mb-3 text-center">
                  {steps[currentStep].title}
                </h4>

                {/* Step Message with typing effect */}
                <div className="text-textSecondary text-sm mb-6 leading-relaxed min-h-[4rem]">
                  <TypeAnimation
                    key={`${currentStep}-${steps[currentStep].message}`}
                    sequence={[
                      200,
                      steps[currentStep].message,
                    ]}
                    wrapper="p"
                    speed={80}
                    cursor={false}
                    repeat={0}
                  />
                </div>

                {/* Progress Dots */}
                <div className="flex justify-center gap-2 mb-6">
                  {steps.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentStep
                          ? "w-8 bg-accent"
                          : "w-2 bg-accent/30"
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={handleSkip}
                    className="text-sm text-textSecondary hover:text-textPrimary transition-colors"
                  >
                    {t("welcomeBot.skip")}
                  </button>

                  <div className="flex gap-2">
                    {currentStep > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePrevious}
                        className="px-4 py-2 bg-primary/50 hover:bg-primary/70 text-textPrimary rounded-lg border border-accent/30 transition-all duration-300"
                      >
                        {t("welcomeBot.previous")}
                      </motion.button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNext}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-300"
                    >
                      {currentStep === steps.length - 1
                        ? t("welcomeBot.getStarted")
                        : t("welcomeBot.next")}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating particles around bot */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
          className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl pointer-events-none"
        />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reopen Button */}
      <AnimatePresence>
        {showButton && !isVisible && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReopen}
            className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all duration-300 border-2 border-accent/40"
            aria-label="Reopen guide"
          >
            <motion.span
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            >
              🤖
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
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full border-2 border-accent"
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default WelcomeBot;
