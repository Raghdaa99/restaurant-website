// src/plugins/i18n.ts
import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

export function setupI18n() {
  const storedLocale = localStorage.getItem("locale") || "en"; // Load saved locale

  return createI18n({
    legacy: false,
    globalInjection: true, // Allow direct use of `$t()`
    locale: storedLocale,
    fallbackLocale: "en",
    messages: { en, ar },
  });
}

export default setupI18n;
