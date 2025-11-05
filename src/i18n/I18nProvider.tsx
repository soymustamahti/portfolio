"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { messagesEn } from "./messages/en";
import { messagesFr } from "./messages/fr";

type Locale = "en" | "fr";

type Messages = Record<string, string>;

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "app.locale";

function getMessages(locale: Locale): Messages {
  return locale === "en" ? messagesEn : messagesFr;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Always start with "fr" to avoid hydration mismatch
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [mounted, setMounted] = useState(false);

  // After mount, read from localStorage or browser language
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === "en" || stored === "fr") {
        setLocaleState(stored);
      } else {
        const browser = navigator.language?.toLowerCase() ?? "fr";
        if (browser.startsWith("en")) {
          setLocaleState("en");
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const messages = useMemo(() => getMessages(locale), [locale]);

  const t = useCallback(
    (key: string) => {
      return messages[key] ?? key;
    },
    [messages]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}


