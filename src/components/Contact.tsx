"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useScrollAnimations } from "../hooks/useScrollAnimations";
import { useI18n } from "../i18n/I18nProvider";
import TiltCard from "./TiltCard";
import { ToastContainer } from "./Toast";

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { t } = useI18n();

  useScrollAnimations(sectionRef, "fadeIn");

  // Initialize EmailJS on component mount
  useEffect(() => {
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "n_eML9qQKuMnLN30a";
    emailjs.init({
      publicKey: publicKey,
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId =
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_242ew9o";
      const templateId =
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_ru3r95p";

      console.log("Sending email with:", {
        serviceId,
        templateId,
        name: formData.name,
        email: formData.email,
      });

      const response = await emailjs.send(serviceId, templateId, {
        title: "New Contact Form Submission",
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      console.log("EmailJS Success:", response);
      setToast({
        message: t("contact.success") || "Message sent successfully!",
        type: "success",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setToast({
        message:
          t("contact.error") || "Failed to send message. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <ToastContainer toast={toast} onClose={() => setToast(null)} />
      <section
        id="contact"
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-5xl mx-auto w-full">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {t("contact.title")}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
            >
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
                      href="mailto:mustaelhachmimahti@gmail.com"
                      className="flex items-center gap-3 text-textSecondary hover:text-accent transition-colors duration-300 group"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        📧
                      </span>
                      <span>mustaelhachmimahti@gmail.com</span>
                    </motion.a>

                    <motion.a
                      href="tel:+33750018388"
                      className="flex items-center gap-3 text-textSecondary hover:text-accent transition-colors duration-300 group"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        📱
                      </span>
                      <span>+33 7 50 01 83 88</span>
                    </motion.a>

                    <div className="flex items-center gap-3 text-textSecondary">
                      <span className="text-2xl">📍</span>
                      <span>{t("about.location.value")}</span>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>

              <TiltCard tiltStrength={8}>
                <motion.div
                  className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-bold text-accent mb-4">
                    {t("common.professionalLinks")}
                  </h3>

                  <div className="space-y-3">
                    <motion.a
                      href="/Mustapha_El_Hachmi_Mahti_-_Ingénieur_logicie.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-textSecondary hover:text-accent transition-colors duration-300 group"
                      whileHover={{ x: 5 }}
                    ></motion.a>

                    <motion.a
                      href="https://github.com/soymustamahti"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-textSecondary hover:text-accent transition-colors duration-300 group"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        💻
                      </span>
                      <span>{t("common.githubProfile")}</span>
                    </motion.a>

                    <motion.a
                      href="https://www.linkedin.com/in/mustapha-el-hachmi-mahti-2aa122225"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-textSecondary hover:text-accent transition-colors duration-300 group"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        🔗
                      </span>
                      <span>{t("common.linkedinProfile")}</span>
                    </motion.a>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>

            {/* Contact Form */}
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

                  <form onSubmit={handleSubmit} className="space-y-4">
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-primary/50 border border-accent/30 rounded-lg text-textPrimary focus:border-accent focus:outline-none transition-all duration-300 resize-none"
                      ></textarea>
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
          </div>

          {/* Footer */}
          <div className="mt-16 text-center text-textSecondary text-sm">
            <p>{t("contact.footer")}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
