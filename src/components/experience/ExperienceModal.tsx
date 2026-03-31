"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";
import { useBodyScrollLock, useKeyPress } from "@/hooks";
import type { ExperienceItem } from "@/types";

interface ExperienceModalProps {
  experience: ExperienceItem | null;
  onClose: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({
  experience,
  onClose,
}) => {
  const { t } = useI18n();
  const isOpen = Boolean(experience);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const detailTabs = experience?.detailsTabs ?? [];
  const fallbackSections = experience?.detailsSections?.length
    ? experience.detailsSections
    : experience
      ? [
          {
            title: t("experience.highlights"),
            items: experience.description,
          },
        ]
      : [];
  const activeTab =
    detailTabs.find((tab) => tab.id === activeTabId) ?? detailTabs[0] ?? null;
  const detailSections = activeTab?.sections ?? fallbackSections;
  const relatedLink = activeTab?.relatedLink ?? experience?.relatedLink ?? null;
  const stackItems =
    experience?.stack
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [];

  useBodyScrollLock(isOpen);
  useKeyPress("Escape", onClose, isOpen);

  useEffect(() => {
    if (!experience?.detailsTabs?.length) {
      setActiveTabId(null);
      return;
    }

    setActiveTabId(experience.detailsTabs[0].id);
  }, [experience]);

  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!experience) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[160] bg-black/70 backdrop-blur-md p-4 md:p-6"
        onClick={handleBackdropClick}
      >
        <div className="w-full h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl border border-accent/25 bg-secondary/95 backdrop-blur-xl shadow-2xl shadow-black/40"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-accent/15 p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent">
                      {experience.period}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary/60 border border-accent/10 text-xs text-textSecondary">
                      {experience.location}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-textPrimary leading-tight">
                    {experience.title}
                  </h2>
                  <p className="mt-2 text-base md:text-lg text-accent font-medium">
                    {experience.company}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t("common.close")}
                  className="shrink-0 w-11 h-11 rounded-full border border-accent/20 bg-primary/40 text-textSecondary hover:text-textPrimary hover:border-accent/50 hover:bg-accent/10 transition-colors duration-200"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mx-auto"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="max-h-[calc(90vh-160px)] overflow-y-auto p-6 md:p-8">
              {detailTabs.length > 0 && (
                <div
                  className="mb-8 rounded-3xl border border-accent/15 bg-primary/20 p-2"
                  role="tablist"
                  aria-label="Experience missions"
                >
                  <div className="grid gap-3 md:grid-cols-2">
                    {detailTabs.map((tab) => {
                      const isActive = tab.id === activeTab?.id;

                      return (
                        <motion.button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setActiveTabId(tab.id)}
                          whileHover={{ y: -2, scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`group flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all duration-200 cursor-pointer ${
                            isActive
                              ? "border-accent bg-gradient-to-r from-accent to-accentHover text-white shadow-lg shadow-accent/25"
                              : "border-accent/15 bg-secondary/40 text-textPrimary hover:border-accent/45 hover:bg-secondary/70"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-200 ${
                                isActive
                                  ? "border-white/30 bg-white/15 text-white"
                                  : "border-accent/20 bg-accent/10 text-accent group-hover:border-accent/40"
                              }`}
                            >
                              {tab.id === "mission-1" ? "01" : "02"}
                            </span>
                            <div>
                              <p
                                className={`text-base font-semibold ${
                                  isActive ? "text-white" : "text-textPrimary"
                                }`}
                              >
                                {tab.label}
                              </p>
                              <p
                                className={`text-xs ${
                                  isActive
                                    ? "text-white/80"
                                    : "text-textSecondary"
                                }`}
                              >
                                {isActive
                                  ? t("experience.tabActive")
                                  : t("experience.tabOpen")}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
                              isActive
                                ? "border-white/30 bg-white/15 text-white"
                                : "border-accent/20 bg-primary/30 text-accent group-hover:border-accent/40 group-hover:bg-accent/10"
                            }`}
                          >
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
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-5">
                {detailSections.map((section, sectionIndex) => (
                  <section
                    key={`${experience.id}-${section.title}`}
                    className="rounded-3xl border border-accent/10 bg-primary/15 p-5 md:p-6"
                  >
                    <div className="grid gap-4 xl:grid-cols-[220px_minmax(0,1fr)] xl:gap-4">
                      <div className="xl:pr-4 xl:border-r xl:border-accent/10">
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent/65">
                          {String(sectionIndex + 1).padStart(2, "0")}
                        </p>
                        <h3 className="text-lg md:text-xl font-semibold text-textPrimary leading-tight">
                          {section.title}
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {section.items.map((item, index) => (
                          <motion.div
                            key={`${experience.id}-${sectionIndex}-${index}`}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04 }}
                            className="flex items-start gap-3"
                          >
                            <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-accent" />
                            <p className="text-sm md:text-base leading-7 text-textSecondary">
                              {item}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
                ))}

                {stackItems.length > 0 && (
                  <section className="rounded-3xl border border-accent/10 bg-primary/15 p-5 md:p-6">
                    <h3 className="text-lg font-semibold text-accent mb-4">
                      {t("labels.stack")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {stackItems.map((item) => (
                        <span
                          key={`${experience.id}-${item}`}
                          className="px-3 py-2 rounded-xl bg-primary/50 border border-accent/15 text-sm text-textPrimary"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {relatedLink && (
                  <section className="rounded-3xl border border-accent/15 bg-gradient-to-r from-accent/10 via-blue-500/10 to-accent/10 p-5 md:p-6">
                    <p className="text-sm font-medium text-textSecondary mb-2">
                      {relatedLink.eyebrow}
                    </p>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-textPrimary">
                          {relatedLink.title}
                        </h3>
                        <p className="text-sm text-textSecondary mt-1">
                          {relatedLink.description}
                        </p>
                      </div>

                      <Link
                        href={relatedLink.href}
                        onClick={onClose}
                        target={relatedLink.external ? "_blank" : undefined}
                        rel={relatedLink.external ? "noreferrer" : undefined}
                        className="inline-flex items-center gap-2 self-start rounded-xl border border-accent/25 bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accentHover"
                      >
                        {relatedLink.ctaLabel}
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
                      </Link>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExperienceModal;
