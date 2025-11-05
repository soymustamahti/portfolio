"use client";

import React from "react";
import { useI18n } from "../i18n/I18nProvider";

export default function LocaleToggle() {
  const { locale, setLocale } = useI18n();

  const toggle = () => setLocale(locale === "fr" ? "en" : "fr");

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="px-3 py-2 rounded-full glass border border-white/20 text-sm font-semibold hover:glass-strong hover:border-white/40 transition-colors"
    >
      {locale === "fr" ? "EN" : "FR"}
    </button>
  );
}


