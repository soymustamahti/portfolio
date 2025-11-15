"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HowItsMadeButton() {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.push("/how-its-made")}
      className="fixed top-4 left-4 z-50 w-12 h-12 bg-accent/20 hover:bg-accent/30 backdrop-blur-sm border border-accent/40 hover:border-accent rounded-full flex items-center justify-center text-accent font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-accent/50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="How this portfolio was made"
    >
      ?
    </motion.button>
  );
}
