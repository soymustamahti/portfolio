"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  onSelect,
}) => {
  const { t, locale } = useI18n();

  const questions =
    locale === "fr"
      ? [
          "Quels sont les projets de Mustapha ?",
          "Quelles technologies maîtrise-t-il ?",
          "Parle-moi d'Archeon",
          "Quelle est son expérience ?",
          "Comment le contacter ?",
        ]
      : [
          "What are Mustapha's projects?",
          "What technologies does he know?",
          "Tell me about Archeon",
          "What's his experience?",
          "How to contact him?",
        ];

  return (
    <div className="px-4 md:px-6 pb-3 md:pb-4">
      <p className="text-xs md:text-sm text-textSecondary mb-3 md:mb-4 font-medium">
        {t("chatBot.suggestions")}
      </p>
      <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 md:flex-wrap scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {questions.map((q, idx) => (
          <motion.button
            key={idx}
            onClick={() => onSelect(q)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-xs md:text-sm px-3 md:px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-full border border-accent/30 transition-all duration-200 cursor-pointer whitespace-nowrap flex-shrink-0"
          >
            {q}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
