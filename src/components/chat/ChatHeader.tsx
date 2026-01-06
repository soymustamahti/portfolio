"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  const { t } = useI18n();

  return (
    <div className="relative bg-gradient-to-r from-accent/20 via-purple-500/20 to-blue-500/20 p-6 border-b border-accent/20">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent" />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-2xl">
              🤖
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-secondary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-textPrimary">
              {t("chatBot.title")}
            </h3>
            <p className="text-sm text-green-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {t("chatBot.status")}
            </p>
          </div>
        </div>

        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors duration-200"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-400"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default ChatHeader;
