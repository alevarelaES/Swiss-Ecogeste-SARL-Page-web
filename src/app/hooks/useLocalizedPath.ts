import { useTranslation } from 'react-i18next';

/**
 * Hook to handle localized routing paths
 */
export const useLocalizedPath = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language.split('-')[0]; // Handle cases like fr-CH

    /**
     * Returns a localized path from a base path
     * @param path The relative path (e.g., "/contact")
     * @returns The localized path (e.g., "/en/contact")
     */
    const getLocalizedPath = (path: string) => {
        // If the path already has a language prefix, don't double it
        if (path.startsWith('/fr/') || path.startsWith('/en/') || path.startsWith('/de/') ||
            path === '/fr' || path === '/en' || path === '/de') {
            return path;
        }

        // Handle external links or anchors
        if (path.startsWith('http') || path.startsWith('#')) {
            return path;
        }

        // Clean leading slash for consistency
        const cleanPath = path.startsWith('/') ? path : `/${path}`;

        // Don't prefix if it's already localized (safety check)
        return `/${currentLang}${cleanPath === '/' ? '' : cleanPath}`;
    };

    return { getLocalizedPath, currentLang };
};
