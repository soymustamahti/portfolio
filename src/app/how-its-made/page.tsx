"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useI18n } from "../../i18n/I18nProvider";

export default function HowItsMadePage() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <div className="min-h-screen px-6 py-20 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-textSecondary hover:text-accent transition-colors duration-300 mb-8 cursor-pointer"
          whileHover={{ x: -5 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-textPrimary mb-4">
            {t("howItsMade.title")}
          </h1>
          <p className="text-textSecondary text-lg">
            {t("howItsMade.subtitle")}
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-accent mb-4">
              {t("howItsMade.overview.title")}
            </h2>
            <p className="text-textSecondary leading-relaxed">
              {t("howItsMade.overview.description")}
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-accent mb-4">
              {t("howItsMade.techStack.title")}
            </h2>
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
          </motion.div>

          {/* Animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-accent mb-4">
              {t("howItsMade.animations.title")}
            </h2>
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
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-accent mb-4">
              {t("howItsMade.features.title")}
            </h2>
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
          </motion.div>

          {/* Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-accent mb-4">
              {t("howItsMade.performance.title")}
            </h2>
            <p className="text-textSecondary leading-relaxed">
              {t("howItsMade.performance.description")}
            </p>
          </motion.div>

          {/* Source Code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-4 border-t border-accent/20"
          >
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
