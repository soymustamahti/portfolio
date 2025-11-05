"use client";

import { useRef, useState } from "react";
import { useScrollAnimations } from "../hooks/useScrollAnimations";
import { useI18n } from "../i18n/I18nProvider";

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { t } = useI18n();

  useScrollAnimations(sectionRef, "fadeIn");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    alert(t("contact.alert"));
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
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          {t("contact.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all duration-300 hover:transform hover:scale-105">
              <h3 className="text-2xl font-bold text-accent mb-6">{t("common.contactInfo")}</h3>

              <div className="space-y-4">
                <a
                  href="mailto:mustaelhachmimahti@gmail.com"
                  className="flex items-center gap-3 text-textSecondary hover:text-accent transition-colors duration-300 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    📧
                  </span>
                  <span>mustaelhachmimahti@gmail.com</span>
                </a>

                <a
                  href="tel:+33750018388"
                  className="flex items-center gap-3 text-textSecondary hover:text-accent transition-colors duration-300 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    📱
                  </span>
                  <span>+33 7 50 01 83 88</span>
                </a>

                <div className="flex items-center gap-3 text-textSecondary">
                  <span className="text-2xl">📍</span>
                  <span>{t("about.location.value")}</span>
                </div>
              </div>
            </div>

            <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all duration-300">
              <h3 className="text-xl font-bold text-accent mb-4">{t("common.professionalLinks")}</h3>

              <div className="space-y-3">
                <a
                  href="/Mustapha_El_Hachmi_Mahti_-_Ingénieur_logicie.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-textSecondary hover:text-accent transition-colors duration-300 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    📄
                  </span>
                  <span>{t("common.downloadCv")}</span>
                </a>

                <a
                  href="https://github.com/mustapha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-textSecondary hover:text-accent transition-colors duration-300 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    💻
                  </span>
                  <span>{t("common.githubProfile")}</span>
                </a>

                <a
                  href="https://linkedin.com/in/mustapha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-textSecondary hover:text-accent transition-colors duration-300 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    🔗
                  </span>
                  <span>{t("common.linkedinProfile")}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20">
            <h3 className="text-2xl font-bold text-accent mb-6">{t("common.sendMessage")}</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
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
              </div>

              <div>
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
              </div>

              <div>
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
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-accent hover:bg-accentHover text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                {t("common.sendMessage")}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-textSecondary text-sm">
          <p>{t("contact.footer")}</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
