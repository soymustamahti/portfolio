"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import TiltCard from "../TiltCard";

interface SocialLink {
  href: string;
  icon: string;
  labelKey: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://github.com/soymustamahti",
    icon: "💻",
    labelKey: "common.githubProfile",
  },
  {
    href: "https://www.linkedin.com/in/mustapha-el-hachmi-mahti-2aa122225",
    icon: "🔗",
    labelKey: "common.linkedinProfile",
  },
];

const ProfessionalLinks: React.FC = () => {
  const { t } = useI18n();

  return (
    <TiltCard tiltStrength={8}>
      <motion.div
        className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-xl font-bold text-accent mb-4">
          {t("common.professionalLinks")}
        </h3>

        <div className="space-y-3">
          {SOCIAL_LINKS.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-textSecondary hover:text-accent transition-colors duration-300 group"
              whileHover={{ x: 5 }}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {link.icon}
              </span>
              <span>{t(link.labelKey)}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </TiltCard>
  );
};

export default ProfessionalLinks;
