"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useScrollAnimations } from "@/hooks";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionTitle } from "./ui";
import { ToastContainer } from "./Toast";

import ContactInfo from "./contact/ContactInfo";
import ProfessionalLinks from "./contact/ProfessionalLinks";
import ContactForm from "./contact/ContactForm";

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
          <SectionTitle>{t("contact.title")}</SectionTitle>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
            >
              <ContactInfo />
              <ProfessionalLinks />
            </motion.div>

            {/* Contact Form */}
            <ContactForm
              formData={formData}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onChange={handleChange}
            />
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
