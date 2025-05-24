import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './en/translation.json';
import translationKo from './ko/translation.json';
import translationHk from './hk/translation.json';
import translationZh from './zh/translation.json';

const resources = {
  en: {
    translation: translationEn,
  },
  ko: {
    translation: translationKo,
  },
  hk: {
    translation: translationHk,
  },
  zh: {
    translation: translationZh,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
