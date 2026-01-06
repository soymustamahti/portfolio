"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { MAX_VISIBLE_TECHNOLOGIES } from "@/constants";
import TiltCard from "../TiltCard";
import type { ProjectConfig } from "@/types";

interface TechBadgeProps {
  tech: string;
}

const TechBadge: React.FC<TechBadgeProps> = ({ tech }) => (
  <span className="px-2 py-1 bg-primary/50 text-textSecondary text-xs rounded border border-accent/30 hover:border-accent hover:text-textPrimary transition-all duration-300 h-fit">
    {tech}
  </span>
);

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => (
  <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
    {category}
  </span>
);

interface StatusBadgeProps {
  label: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ label }) => (
  <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-3 py-1 rounded-full flex items-center gap-1">
    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
    {label}
  </span>
);

interface ProjectCardProps {
  projectConfig: ProjectConfig;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectConfig,
  onClick,
}) => {
  const { t } = useI18n();

  const title = t(`project.${projectConfig.key}.title`);
  const description = t(`project.${projectConfig.key}.description`);
  const category = t(`project.${projectConfig.key}.category`);
  const impact = t(`project.${projectConfig.key}.impact`);

  const visibleTechnologies = projectConfig.technologies.slice(
    0,
    MAX_VISIBLE_TECHNOLOGIES
  );
  const remainingCount =
    projectConfig.technologies.length - MAX_VISIBLE_TECHNOLOGIES;

  return (
    <TiltCard className="h-full" tiltStrength={10} glareEffect>
      <motion.div
        className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all duration-300 hover:shadow-2xl group cursor-pointer h-full flex flex-col"
        whileHover={{ scale: 1.02 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        onClick={onClick}
      >
        {/* Badges */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <CategoryBadge category={category} />
          {projectConfig.liveDemo && (
            <StatusBadge label={t("common.liveDemo")} />
          )}
          {projectConfig.images && <StatusBadge label={t("common.images")} />}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-textPrimary mb-3 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-textSecondary text-sm mb-4 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Impact */}
        {impact && (
          <p className="text-accent text-sm font-semibold mb-4">📊 {impact}</p>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4 min-h-[64px]">
          {visibleTechnologies.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
          {remainingCount > 0 && (
            <span className="px-2 py-1 text-accent text-xs font-semibold h-fit">
              +{remainingCount} more
            </span>
          )}
        </div>

        {/* View Details Link */}
        <div className="mt-auto pt-4 border-t border-accent/20">
          <div className="flex items-center justify-between text-accent group-hover:text-accentHover transition-colors duration-300">
            <span className="text-sm font-semibold">
              {t("common.viewDetails")}
            </span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
};

export default ProjectCard;
