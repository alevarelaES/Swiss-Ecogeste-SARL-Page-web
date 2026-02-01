import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['fr', 'en', 'de'],
        fallbackLng: 'fr',
        load: 'languageOnly', // Transform fr-FR to fr
        debug: import.meta.env.DEV,
        defaultNS: 'common', // Default namespace to use

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },

        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupQuerystring: 'lng', // Explicitly define the query param
        }
    });

export default i18n;
