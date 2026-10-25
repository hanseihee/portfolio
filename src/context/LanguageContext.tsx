"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  useEffect,
  type ReactNode,
} from "react";
import { type Locale, type Translation, getTranslation } from "@/lib/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

let fallbackLocale: Locale = "ko";

function subscribe(callback: () => void) {
  window.addEventListener("portfolio-locale", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("portfolio-locale", callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Locale {
  try {
    const saved = localStorage.getItem("locale");
    if (saved === "ko" || saved === "en") return saved;
  } catch {
    /* Keep language switching available when storage is disabled. */
  }
  return fallbackLocale;
}

function setLocale(locale: Locale) {
  fallbackLocale = locale;
  try {
    localStorage.setItem("locale", locale);
  } catch {
    /* Use the in-memory preference. */
  }
  window.dispatchEvent(new Event("portfolio-locale"));
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => "ko" as Locale,
  );
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = getTranslation(locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
