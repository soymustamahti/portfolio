"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading,
  inputRef,
}) => {
  const { t } = useI18n();

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 md:p-6 border-t border-accent/20 safe-area-inset-bottom"
    >
      <div className="flex gap-3 md:gap-4">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("chatBot.placeholder")}
          disabled={isLoading}
          className="flex-1 bg-primary/50 border border-accent/30 rounded-xl px-4 py-3 md:px-5 text-sm md:text-base text-textPrimary placeholder:text-textSecondary/50 focus:outline-none focus:border-accent transition-colors duration-200 disabled:opacity-50"
        />
        <motion.button
          type="submit"
          disabled={isLoading || !value.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 flex-shrink-0"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="md:w-5 md:h-5"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </motion.button>
      </div>
      <p className="text-xs text-textSecondary/50 mt-2 md:mt-3 text-center">
        {t("chatBot.poweredBy")}
      </p>
    </form>
  );
};

export default ChatInput;
