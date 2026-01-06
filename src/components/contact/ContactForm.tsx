"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import TiltCard from "../TiltCard";
import type { ContactFormData } from "@/types";

interface ContactFormProps {
  formData: ContactFormData;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  isSubmitting,
  onSubmit,
  onChange,
}) => {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.7 }}
    >
      <TiltCard tiltStrength={8}>
        <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20">
          <h3 className="text-2xl font-bold text-accent mb-6">
            {t("common.sendMessage")}
          </h3>

          <form onSubmit={onSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <label
                htmlFor="name"
                className="block text-textSecondary mb-2 text-sm"
              >
                {t("common.name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                className="w-full px-4 py-3 bg-primary/50 border border-accent/30 rounded-lg text-textPrimary focus:border-accent focus:outline-none transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <label
                htmlFor="email"
                className="block text-textSecondary mb-2 text-sm"
              >
                {t("common.email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
                className="w-full px-4 py-3 bg-primary/50 border border-accent/30 rounded-lg text-textPrimary focus:border-accent focus:outline-none transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <label
                htmlFor="message"
                className="block text-textSecondary mb-2 text-sm"
              >
                {t("common.message")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={onChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-primary/50 border border-accent/30 rounded-lg text-textPrimary focus:border-accent focus:outline-none transition-all duration-300 resize-none"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-accent hover:bg-accentHover text-white rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    ⏳
                  </motion.span>
                  {t("common.sending") || "Sending..."}
                </span>
              ) : (
                t("common.sendMessage")
              )}
            </motion.button>
          </form>
        </div>
      </TiltCard>
    </motion.div>
  );
};

export default ContactForm;
