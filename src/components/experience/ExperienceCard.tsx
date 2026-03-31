"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import TiltCard from "../TiltCard";
import type { ExperienceItem } from "@/types";

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
  onOpen: (experienceId: string) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  index,
  onOpen,
}) => {
  const { t } = useI18n();
  const isEven = index % 2 === 0;
  const previewItems = experience.description.slice(0, 2);
  const stackItems =
    experience.stack
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [];
  const visibleStackItems = stackItems.slice(0, 3);
  const remainingStackCount = stackItems.length - visibleStackItems.length;
  const clampTwoLines =
    "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]";

  return (
    <div
      className={`w-full md:w-5/12 pl-20 pr-2 md:pl-0 md:pr-0 ${
        isEven ? "md:pr-12" : "md:pl-12"
      }`}
    >
      <TiltCard tiltStrength={8} glareEffect className="h-full">
        <motion.button
          type="button"
          onClick={() => onOpen(experience.id)}
          aria-label={`${experience.title} - ${t("common.viewDetails")}`}
          className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all duration-300 hover:shadow-2xl group text-left w-full h-full min-h-[360px] flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.985 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent">
              {experience.period}
            </span>
            <span className="px-3 py-1 rounded-full bg-primary/60 border border-accent/10 text-xs text-textSecondary">
              {experience.location}
            </span>
          </div>

          <div className="space-y-2">
            <motion.h3
              className={`text-2xl font-bold text-accent ${clampTwoLines}`}
              whileHover={{ x: isEven ? -4 : 4 }}
            >
              {experience.title}
            </motion.h3>
            <h4
              className={`text-lg font-semibold text-textPrimary group-hover:text-accent transition-colors duration-300 ${clampTwoLines}`}
            >
              {experience.company}
            </h4>
          </div>

          <div className="mt-5 space-y-3 flex-1">
            {previewItems.map((item, i) => (
              <motion.p
                key={i}
                className={`text-textSecondary text-sm leading-6 ${clampTwoLines}`}
                initial={{
                  opacity: 0,
                  x: isEven ? 16 : -16,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                • {item}
              </motion.p>
            ))}
          </div>

          {visibleStackItems.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {visibleStackItems.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md bg-primary/50 border border-accent/15 text-xs text-textSecondary"
                >
                  {item}
                </span>
              ))}
              {remainingStackCount > 0 && (
                <span className="px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20 text-xs text-accent">
                  +{remainingStackCount}
                </span>
              )}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-accent/20 flex items-center justify-between">
            <span className="text-sm font-medium text-textPrimary">
              {t("common.viewDetails")}
            </span>
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent/10 border border-accent/20 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </div>
        </motion.button>
      </TiltCard>
    </div>
  );
};

export default ExperienceCard;
