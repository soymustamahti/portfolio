"use client";

import { motion } from "framer-motion";

interface GlassBadgeProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  icon?: React.ReactNode;
}

export const GlassBadge: React.FC<GlassBadgeProps> = ({
  children,
  className = "",
  animate = false,
  icon,
}) => {
  const content = (
    <div
      className={`inline-flex items-center gap-3 glass px-6 py-3 rounded-full border border-accent/20 ${className}`}
    >
      {icon}
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default GlassBadge;
