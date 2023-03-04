import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import PTBR from './locales/pt/pt-BR.json';
import ENUS from './locales/en/en-US.json';
import ESES from './locales/es/es-ES.json';

const resources = {
  'pt-BR': PTBR,
  'en-US': ENUS,
  'es-ES': ESES,
};

i18n.use(initReactI18next).init({
  resources,
  lng: navigator.language,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
