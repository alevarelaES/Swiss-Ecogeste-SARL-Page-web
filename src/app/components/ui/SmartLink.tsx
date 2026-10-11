import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';

export const isExternalUrl = (href: string) => /^https?:\/\//i.test(href.trim());

/** Lien interne (chemin du site, préfixé par la langue) ou externe (nouvel onglet). */
export function SmartLink({
    href,
    className,
    onClick,
    children,
}: {
    href: string;
    className?: string;
    onClick?: () => void;
    children: ReactNode;
}) {
    const { getLocalizedPath } = useLocalizedPath();
    const target = href.trim();

    if (isExternalUrl(target)) {
        return (
            <a href={target} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
                {children}
            </a>
        );
    }
    return (
        <Link to={getLocalizedPath(target)} className={className} onClick={onClick}>
            {children}
        </Link>
    );
}

/**
 * Lien du programme d'un service. Accepte aussi une URL saisie dans le champ « note »
 * (cas existant dans Sanity) : elle est alors affichée comme lien et non comme texte.
 */
export function resolveServiceLink(service: { link?: string; note?: string }) {
    const noteIsUrl = !!service.note && isExternalUrl(service.note);
    return {
        link: service.link || (noteIsUrl ? service.note!.trim() : undefined),
        note: noteIsUrl ? undefined : service.note,
    };
}
