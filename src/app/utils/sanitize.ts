import DOMPurify from 'dompurify';

/**
 * Nettoie du HTML avant de l'injecter dans la page.
 * DOMPurify a besoin du DOM du navigateur : pendant le pré-rendu (Node), le HTML vient
 * uniquement des fichiers du projet (traductions, données locales), il est donc rendu tel quel.
 */
export function sanitizeHtml(html: string, config?: Parameters<typeof DOMPurify.sanitize>[1]): string {
    if (typeof window === 'undefined') return html;
    return DOMPurify.sanitize(html, config) as unknown as string;
}
