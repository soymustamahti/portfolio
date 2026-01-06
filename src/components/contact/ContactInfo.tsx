"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { CONTACT_INFO } from "@/constants";
import TiltCard from "../TiltCard";

const ContactInfo: React.FC = () => {
  const { t } = useI18n();

  return (
    <TiltCard tiltStrength={8}>
      <motion.div
        className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-2xl font-bold text-accent mb-6">
          {t("common.contactInfo")}
        </h3>

        <div className="space-y-4">
          <motion.a
            href={`mailto:${CONTACT_INFO.email}`}
            className="flex items-center gap-3 text-textSecondary hover:text-accent transition-colors duration-300 group"
            whileHover={{ x: 5 }}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
              📧
            </span>
            <span>{CONTACT_INFO.email}</span>
          </motion.a>

          <motion.a
            href={`tel:${CONTACT_INFO.phoneRaw}`}
            className="flex items-center gap-3 text-textSecondary hover:text-accent transition-colors duration-300 group"
            whileHover={{ x: 5 }}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
              📱
            </span>
            <span>{CONTACT_INFO.phone}</span>
          </motion.a>

          <div className="flex items-center gap-3 text-textSecondary">
            <span className="text-2xl">📍</span>
            <span>{t("about.location.value")}</span>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
};

export default ContactInfo;
