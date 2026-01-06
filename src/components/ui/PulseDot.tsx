"use client";

import { motion } from "framer-motion";

interface PulseDotProps {
  color?: "green" | "accent" | "red" | "yellow";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const colorClasses = {
  green: "bg-green-500",
  accent: "bg-accent",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
};

const sizeClasses = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

export const PulseDot: React.FC<PulseDotProps> = ({
  color = "green",
  size = "sm",
  className = "",
}) => {
  return (
    <motion.div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full ${className}`}
      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
  );
};

export default PulseDot;
