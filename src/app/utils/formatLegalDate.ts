const LOCALES: Record<string, string> = { fr: 'fr-CH', en: 'en-GB', de: 'de-CH' };

/** Date de mise à jour des pages légales, dans la langue de la page (fuseau UTC pour que le pré-rendu et le navigateur concordent). */
export const formatLegalDate = (isoDate: string, lang: string) =>
    new Date(isoDate).toLocaleDateString(LOCALES[lang] ?? 'fr-CH', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });
