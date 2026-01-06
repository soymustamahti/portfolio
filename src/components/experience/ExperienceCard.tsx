"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import TiltCard from "../TiltCard";
import type { ExperienceItem } from "@/types";

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  index,
}) => {
  const { t } = useI18n();
  const isEven = index % 2 === 0;

  return (
    <div
      className={`w-full md:w-5/12 pl-20 pr-2 md:pl-0 md:pr-0 ${
        isEven ? "md:text-right md:pr-12" : "md:pl-12"
      }`}
    >
      <TiltCard tiltStrength={8} glareEffect>
        <motion.div
          className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all duration-300 hover:shadow-2xl group"
          whileHover={{ scale: 1.02 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <motion.h3
            className="text-2xl font-bold text-accent mb-2"
            whileHover={{ x: isEven ? -5 : 5 }}
          >
            {experience.title}
          </motion.h3>
          <h4 className="text-xl font-semibold text-textPrimary mb-1 group-hover:text-accent transition-colors duration-300">
            {experience.company}
          </h4>
          <p className="text-textSecondary text-sm mb-4">
            {experience.location} | {experience.period}
          </p>

          <ul className={`space-y-2 mb-4 ${isEven ? "md:text-right" : ""}`}>
            {experience.description.map((item, i) => (
              <motion.li
                key={i}
                className="text-textSecondary text-sm"
                initial={{
                  opacity: 0,
                  x: isEven ? 20 : -20,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                • {item}
              </motion.li>
            ))}
          </ul>

          {experience.stack && (
            <motion.div
              className="pt-4 border-t border-accent/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xs text-textSecondary">
                <span className="font-semibold text-accent">
                  {t("labels.stack")}:{" "}
                </span>
                {experience.stack}
              </p>
            </motion.div>
          )}
        </motion.div>
      </TiltCard>
    </div>
  );
};

export default ExperienceCard;
