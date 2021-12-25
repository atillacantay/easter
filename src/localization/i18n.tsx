import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getCurrentLanguage } from "utils/i18n";
import translationEN from "./en.json";
import translationTR from "./tr.json";

i18n.use(initReactI18next).init({
  lng: getCurrentLanguage(),
  fallbackLng: ["en", "tr"],
  debug: true,
  resources: {
    en: {
      label: "English",
      translation: translationEN,
    },
    tr: {
      label: "Turkish",
      translation: translationTR,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
