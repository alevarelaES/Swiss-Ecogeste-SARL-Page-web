# Swiss Ecogestes – site web

Site vitrine de Swiss Ecogestes Sàrl (efficacité énergétique, Suisse romande), destiné à remplacer le site actuel sur `swissecogestes.ch`.

## Stack

- React 18, TypeScript, Vite 6, Tailwind CSS 4
- `react-router-dom` : URLs préfixées par la langue (`/fr`, `/en`, `/de`)
- i18next : textes dans `public/locales/{fr,en,de}/common.json`
- Sanity (CMS, projet `btjdqrld`) : Studio dans `studio/`, requêtes dans `src/sanity/client.ts`
- Hébergement Vercel, fonction serverless `api/contact.ts` pour le formulaire de contact

## Commandes

```bash
npm install
npm run dev        # serveur de développement (port 4000)
npm run typecheck  # vérification TypeScript
npm run build      # build + pré-rendu SEO (dist/)
npm run studio     # Sanity Studio
```

## SEO : pré-rendu

`npm run build` enchaîne trois étapes :

1. `vite build` : l'application navigateur.
2. `vite build --ssr src/entry-server.tsx` : la même application, exécutable sous Node.
3. `scripts/prerender.ts` : génère un fichier HTML complet par page et par langue
   (`dist/fr.html`, `dist/en/services/villa.html`, …), plus `sitemap.xml` et `robots.txt`.

Google reçoit ainsi le contenu, le titre, la description, les balises `hreflang` et canoniques
sans exécuter de JavaScript. Dans le navigateur, React reprend la main sur ce HTML (hydratation).

- Les pages à pré-rendre sont listées dans `src/app/seo/site.ts` (`STATIC_PAGES`). Toute nouvelle page
  doit y être ajoutée pour figurer dans le sitemap.
- Les balises SEO de chaque page passent par le composant `src/app/components/SEO.tsx`.
- Le pré-rendu utilise le contenu local (`src/app/data`, `public/locales`) : le contenu Sanity
  est chargé ensuite dans le navigateur.
- Le code exécuté pendant le rendu ne doit pas toucher à `window`, `document` ou `localStorage`
  en dehors d'un `useEffect`.

## Formulaire de contact

Le formulaire envoie les demandes à `/api/contact`, qui les transmet par email via le SMTP Infomaniak.
Variables à définir dans Vercel (Settings → Environment Variables) :

| Variable     | Valeur                                              |
|--------------|-----------------------------------------------------|
| `SMTP_USER`  | adresse complète de la boîte d'envoi                |
| `SMTP_PASS`  | mot de passe de la boîte (ou mot de passe d'application) |
| `SMTP_HOST`  | optionnel, défaut `mail.infomaniak.com`             |
| `SMTP_PORT`  | optionnel, défaut `465`                             |
| `CONTACT_TO` | optionnel, destinataire (défaut : `SMTP_USER`)      |

## Variables d'environnement

Voir `.env.example`. Toute variable préfixée `VITE_` est incluse dans le JavaScript public :
ne jamais y mettre de secret (le jeton d'écriture Sanity s'appelle `SANITY_WRITE_TOKEN` et
n'est utilisé que par les scripts de `scripts/`).

## Documentation

Les notes de migration Sanity et le texte de référence du site sont dans `docs/`.
