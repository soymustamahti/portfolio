"use client";

import { motion } from "framer-motion";

interface FloatingChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({
  onClick,
  isOpen,
}) => (
  <motion.button
    onClick={onClick}
    className="fixed bottom-6 left-6 z-[110] w-14 h-14 rounded-full bg-gradient-to-br from-accent via-purple-500 to-blue-500 shadow-lg shadow-accent/30 flex items-center justify-center cursor-pointer hover:shadow-xl hover:shadow-accent/40 transition-all duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 0.5 }}
  >
    <div className="text-2xl">✨</div>

    {!isOpen && (
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-primary"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    )}
  </motion.button>
);

export default FloatingChatButton;
