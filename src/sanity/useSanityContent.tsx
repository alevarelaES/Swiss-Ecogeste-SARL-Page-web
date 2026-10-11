import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

/**
 * Contenu Sanity disponible dès le premier rendu.
 *
 * - Pré-rendu (Node) : le script de build rend chaque page une première fois pour
 *   collecter les requêtes (`pending`), les exécute, puis rend à nouveau avec les
 *   réponses dans `data`. Le HTML généré contient donc le contenu Sanity.
 * - Navigateur : ces mêmes réponses sont lues depuis `window.__SANITY_DATA__`
 *   (injecté dans la page), ce qui garantit que l'hydratation correspond au HTML.
 *   La requête est ensuite relancée pour afficher les modifications publiées
 *   depuis le dernier build.
 */
export type SanityCache = {
    data: Record<string, unknown>;
    pending?: Map<string, () => Promise<unknown>>;
    /** Clés lues pendant un rendu serveur : seules celles-ci sont injectées dans la page. */
    used?: Set<string>;
};

declare global {
    interface Window {
        __SANITY_DATA__?: Record<string, unknown>;
    }
}

const SanityCacheContext = createContext<SanityCache | null>(null);

export function SanityCacheProvider({ cache, children }: { cache: SanityCache; children: ReactNode }) {
    return <SanityCacheContext.Provider value={cache}>{children}</SanityCacheContext.Provider>;
}

export function browserSanityCache(): SanityCache {
    return { data: (typeof window !== 'undefined' && window.__SANITY_DATA__) || {} };
}

/** Réponse brute d'une requête Sanity identifiée par `key` (undefined tant qu'elle n'est pas connue). */
export function useSanityData<D>(key: string, fetcher: () => Promise<D>): D | undefined {
    const cache = useContext(SanityCacheContext);
    const cached = cache?.data[key] as D | undefined;

    if (typeof window === 'undefined' && cache) {
        cache.used?.add(key);
        if (cache.pending && !(key in cache.data)) cache.pending.set(key, fetcher);
    }

    const [state, setState] = useState<{ key: string; value: D | undefined }>({ key, value: cached });
    const value = state.key === key ? state.value : cached;

    useEffect(() => {
        let cancelled = false;
        fetcher()
            .then((result) => {
                if (cancelled) return;
                if (cache) cache.data[key] = result;
                setState({ key, value: result });
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    return value;
}

/**
 * Contenu d'une section : `fallback` (contenu local) tant que Sanity n'a pas répondu
 * ou si `transform` renvoie null (document vide), sinon le contenu Sanity transformé.
 */
export function useSanityContent<T, D>(
    key: string,
    fetcher: () => Promise<D>,
    fallback: T,
    transform: (data: D, fallback: T) => T | null | undefined
): T {
    const data = useSanityData(key, fetcher);
    if (data === undefined || data === null) return fallback;
    return transform(data, fallback) ?? fallback;
}
