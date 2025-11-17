"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";

export default function HowItsMadeButton() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <div className="fixed top-4 left-4 z-50 group">
      <motion.button
        onClick={() => router.push("/how-its-made")}
        className="w-12 h-12 bg-accent/20 hover:bg-accent/30 backdrop-blur-sm border border-accent/40 hover:border-accent rounded-full flex items-center justify-center text-accent font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-accent/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="How this portfolio was made"
      >
        ?
      </motion.button>

      {/* Tooltip */}
      <div className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        <div className="bg-gradient-to-br from-primary/95 to-secondary/95 backdrop-blur-xl border-2 border-accent/40 rounded-lg px-3 py-2 shadow-xl">
          <span className="text-sm text-textPrimary font-semibold">
            {t("tooltip.howItsMade")}
          </span>
        </div>
      </div>
    </div>
  );
}
