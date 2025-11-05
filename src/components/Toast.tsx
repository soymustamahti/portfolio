"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === "success" ? "bg-green-500/90" : "bg-red-500/90";
  const icon = type === "success" ? "✓" : "✕";

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`fixed top-8 right-8 z-[9999] ${bgColor} backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-2xl border border-white/20 max-w-md`}
    >
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg"
        >
          {icon}
        </motion.div>
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors duration-200"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
        style={{ transformOrigin: "left", width: "100%" }}
      />
    </motion.div>
  );
};

interface ToastContainerProps {
  toast: { message: string; type: "success" | "error" } | null;
  onClose: () => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toast,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={onClose} />
      )}
    </AnimatePresence>
  );
};

export default Toast;
