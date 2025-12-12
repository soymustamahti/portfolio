"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="relative">
          {/* Spinning loader */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-20 h-20 border-4 border-accent/30 border-t-accent rounded-full mx-auto mb-6"
          />
          {/* Pulsing center dot */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-8 bg-accent rounded-full"
          />
        </div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-textPrimary text-xl font-semibold"
        >
          Loading project details...
        </motion.p>
        <p className="text-textSecondary text-sm mt-2">
          Preparing comprehensive information
        </p>
      </motion.div>
    </div>
  );
}
