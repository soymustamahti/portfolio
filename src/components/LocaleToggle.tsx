"use client";

import React from "react";
import { useI18n } from "../i18n/I18nProvider";

export default function LocaleToggle() {
  const { locale, setLocale, t } = useI18n();

  const toggle = () => setLocale(locale === "fr" ? "en" : "fr");

  return (
    <div className="relative group">
      <button
        onClick={toggle}
        aria-label="Toggle language"
        className="px-3 py-2 rounded-full glass border border-white/20 text-sm font-semibold hover:glass-strong hover:border-white/40 transition-colors"
      >
        {locale === "fr" ? "EN" : "FR"}
      </button>

      {/* Tooltip */}
      <div className="absolute right-0 top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        <div className="bg-gradient-to-br from-primary/95 to-secondary/95 backdrop-blur-xl border-2 border-accent/40 rounded-lg px-3 py-2 shadow-xl">
          <span className="text-sm text-textPrimary font-semibold">
            {t("tooltip.languageToggle")}
          </span>
        </div>
      </div>
    </div>
  );
}


