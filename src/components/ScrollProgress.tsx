"use client";

import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 transform-origin-left z-50"
        style={{ scaleX }}
      />

      {/* Glowing effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 transform-origin-left z-50 blur-sm opacity-50"
        style={{ scaleX }}
      />
    </>
  );
};

export default ScrollProgress;
