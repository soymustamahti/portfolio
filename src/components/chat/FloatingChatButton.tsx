"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useWelcomeBot } from "@/context/WelcomeBotContext";

interface FloatingChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({
  onClick,
  isOpen,
}) => {
  const { isWelcomeBotVisible } = useWelcomeBot();

  return (
    <AnimatePresence>
      {!isWelcomeBotVisible && (
        <motion.button
          onClick={onClick}
          className="fixed bottom-6 left-4 md:left-6 z-[110] w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-accent via-purple-500 to-blue-500 shadow-lg shadow-accent/30 flex items-center justify-center cursor-pointer hover:shadow-xl hover:shadow-accent/40 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          aria-label="Open AI Chat"
        >
          <div className="text-xl md:text-2xl">✨</div>

          {!isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingChatButton;
