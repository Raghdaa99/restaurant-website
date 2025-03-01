import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export const useLanguageStore = defineStore("language", () => {
  const locale = ref(localStorage.getItem("locale") || "en"); 
  const dir = ref(locale.value === "ar" ? "rtl" : "ltr");
  const { locale: i18nLocale } = useI18n();

  const setLanguage = (lang: string) => {
    locale.value = lang;
    i18nLocale.value = lang;
    dir.value = lang === "ar" ? "rtl" : "ltr"; 
    localStorage.setItem("locale", lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir.value); 
  };

  watch(locale, (newLocale) => {
    dir.value = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir.value);
  });

  return { locale, dir, setLanguage };
});
