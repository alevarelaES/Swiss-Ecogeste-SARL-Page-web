# Prompt — Continuation migration Sanity CMS · Swiss Ecogeste SARL

> **À coller directement dans un agent IA (GPT ou autre).** Ce document contient tout le contexte nécessaire. L'agent doit avoir accès au système de fichiers du projet.

---

## Contexte du projet

Site web vitrine pour **Swiss Ecogeste SARL**, une entreprise de conseil en énergie en Suisse romande.

- **Stack** : React 18 + Vite + TypeScript + Tailwind CSS 4
- **CMS** : Sanity CMS (Studio déployé sur https://swiss-ecogestes.sanity.studio/)
- **i18n** : i18next, 3 langues : `fr` (défaut), `en`, `de`
- **Routing** : React Router avec chemins localisés
- **Projet ID Sanity** : `btjdqrld` · Dataset : `production`

### Structure du projet

```
Swiss-Ecogeste-SARL-Page-web/
├── src/
│   ├── app/
│   │   ├── pages/           ← Pages React (Home, TeamPage, VillaPage, etc.)
│   │   ├── components/
│   │   │   ├── sections/    ← Sections réutilisables (Hero, About, StatsSection…)
│   │   │   ├── layout/      ← Navbar, Footer, templates
│   │   │   └── animations/  ← Reveal (wrapper framer-motion)
│   │   ├── data/            ← Données hardcodées (fallbacks)
│   │   ├── hooks/           ← Hooks custom (useServicePageContent, etc.)
│   │   └── utils/           ← iconMap.ts (résolution icônes Lucide)
│   └── sanity/
│       └── client.ts        ← Toutes les fonctions de fetch Sanity
└── studio/
    └── schemaTypes/         ← Schémas Sanity
        └── index.ts         ← Enregistrement de tous les schémas
```

---

## Principe de fonctionnement établi (à respecter)

**Pattern obligatoire pour chaque composant connecté à Sanity :**
```tsx
const [data, setData] = useState(getHardcodedFallback(lang));

useEffect(() => {
  setData(getHardcodedFallback(lang)); // reset quand langue change
}, [lang]);

useEffect(() => {
  let cancelled = false;
  fetchFromSanity(lang)
    .then((result: any) => {
      if (cancelled || !result || result.length === 0) return;
      setData(mapResult(result));
    })
    .catch(() => {}); // jamais de crash
  return () => { cancelled = true; };
}, [lang]);
```

**Résolution de langue :**
```ts
const lang = i18n.language.startsWith('de') ? 'de' : i18n.language.startsWith('en') ? 'en' : 'fr';
```

**Dans les queries GROQ, toujours interpoler la langue :**
```ts
`"title": title.${lang}` // retourne directement le string dans la bonne langue
```

**Icônes Lucide stockées comme strings dans Sanity**, résolues via :
```ts
import { resolveIcon } from '../../utils/iconMap';
// resolveIcon("Zap") → composant Lucide <Zap />
```

**Règles absolues :**
- Pas d'emojis dans le code
- Pas de commits/push
- Les labels dans le studio Sanity doivent être en français simple, clairs pour un client non-technique
- Toujours garder les données hardcodées comme fallback

---

## État actuel des schémas Sanity

### Schémas enregistrés (`studio/schemaTypes/index.ts`)

| Schema | Type | Usage |
|--------|------|-------|
| `teamMember` | Collection | Membres de l'équipe (nom, rôle, photo, certifications) |
| `heroSlide` | Collection | Slides du carousel hero (5 slides) |
| `stat` | Collection | Statistiques chiffres clés (4 stats) |
| `clientType` | Collection | Cartes solutions accueil (4 cartes) |
| `partner` | Collection | Logos partenaires |
| `processStep` | Collection | Étapes méthode (4 étapes) |
| `article` | Collection | Articles de blog |
| `whyChooseUs` | Singleton | Section "Pourquoi nous choisir" (1 document) |
| `aboutPage` | Singleton | Section À Propos accueil |
| `servicePage` | Collection | Pages service (villa/gérance/entreprise/communes, 1 doc chacun) |
| `settings` | Singleton | Footer + coordonnées + réseaux sociaux |
| `homePage` | Singleton | Config page d'accueil |
| `contactPage` | Singleton | Photo de la page contact |
| `teamPage` | Singleton | (legacy, peut être ignoré) |
| `localeString` / `localeText` | Types globaux | Champs multilingues fr/en/de |

### Structure des champs multilingues dans les schémas

Les champs multilingues sont des objets inline avec 3 sous-champs :
```ts
{ name: 'fr', type: 'string', title: 'Français' },
{ name: 'en', type: 'string', title: 'English' },
{ name: 'de', type: 'string', title: 'Deutsch' },
```
GROQ : `"title": title.${lang}` → retourne directement le string.

---

## Ce qui est déjà connecté à Sanity (code OK, données à saisir)

| Composant | Query Sanity | Fallback |
|-----------|-------------|---------|
| `Team.tsx` | `getTeamMembers()` | `data/teamMembers.ts` |
| `Hero.tsx` | `getHeroSlides(lang)` | `data/heroSlides.ts` |
| `StatsSection.tsx` | `getSanityStats(lang)` + `getSanityStatsContent(lang)` | `data/statsData.ts` |
| `About.tsx` | `getSanityAboutContent(lang)` | `data/aboutContent.ts` |
| `WhyChooseUs.tsx` | `getSanityWhyChooseUs(lang)` | `data/whyChooseUsContent.ts` |
| `ClientTypeSection.tsx` | `getSanityClientTypes(lang)` | `data/clientTypes.ts` |
| `ProcessSection.tsx` | `getProcessSteps(lang)` | fallback inline dans le composant |
| `Partners.tsx` | `getPartners()` | `FALLBACK_PARTNERS` dans le composant |
| `Footer.tsx` | `getSettings()` | valeurs hardcodées inline |
| `VillaPage` / `GerancePage` / `EntreprisePage` / `CommunesPage` | `getSanityServicePage(slug, lang)` via hook | data files respectifs |

---

## TÂCHES À ACCOMPLIR

### TÂCHE 1 — Connecter ArticlesSection à Sanity (code)

**Fichier** : `src/app/components/sections/ArticlesSection.tsx`

**Problème** : Le composant importe encore `getArticles` depuis `../../data/articles` (hardcodé). Il faut le connecter à Sanity.

**Ce qu'il faut faire** :
1. Importer `getArticles` depuis `../../../sanity/client` (il existe déjà)
2. Appliquer le pattern useState + useEffect avec fallback depuis `data/articles.ts`
3. Mapper la réponse Sanity au format attendu par le composant :
   - `article.title.${lang}` → `title`
   - `article.excerpt.${lang}` → `excerpt`
   - `article.category.${lang}` → `category`
   - `article.publishedAt` → formater en date lisible `"DD MMM YYYY"`
   - `article.readTime` → `readTime`
   - `article.image.asset.url` → `imageUrl`
   - `article.slug.current` → `slug`

**Interface actuelle dans le composant** :
```ts
interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;        // ex: "24 Jan 2026"
    readTime: string;    // ex: "5 min"
    imageUrl: string;
    slug: string;
}
```

**Query GROQ à ajouter dans `src/sanity/client.ts`** :
```ts
export async function getArticles(lang: string = 'fr') {
  return client.fetch(`
    *[_type == "article"] | order(publishedAt desc) {
      _id,
      "title": title.${lang},
      "excerpt": excerpt.${lang},
      "category": category.${lang},
      publishedAt,
      readTime,
      "imageUrl": image.asset->url,
      "slug": slug.current,
      featured
    }
  `)
}
```

**Format date** : Utiliser `new Date(publishedAt).toLocaleDateString('fr-CH', { day: 'numeric', month: 'short', year: 'numeric' })` pour FR, adapter pour EN/DE.

**Fallback** : Utiliser `getArticles(lang)` de `../../data/articles` comme fallback (renommer l'import en `getHardcodedArticles`).

---

### TÂCHE 2 — Connecter ArticleDetailPage à Sanity (code)

**Fichier** : `src/app/pages/ArticleDetailPage.tsx`

Vérifier si la page utilise déjà `getArticleBySlug` de Sanity. Si elle utilise encore le hardcoded, l'adapter de la même manière. La query existe déjà dans `client.ts` :
```ts
getArticleBySlug(slug: string) // retourne l'article avec content en PortableText
```

Le `content` des articles est en **PortableText** (Sanity rich text). Il faut utiliser `@portabletext/react` pour le renderer.

---

### TÂCHE 3 — Créer le schéma `resultatsPage` et connecter la page Résultats (code + schema)

**Fichier page** : `src/app/pages/ResultatsPage.tsx` (page hardcodée existante)

**Ce que contient la page actuellement** :
- Section hero avec titre et sous-titre
- 4 stats d'impact animées : `{ value: number, suffix, label }` (ex: "150+ Audits réalisés")
- 3 études de cas avec : secteur, titre, métrique principale, KPIs (avant/après), avant/après liste
- Section témoignages (si présente)

**Schéma Sanity à créer** dans `studio/schemaTypes/resultatsPage.ts` :

```ts
import { defineField, defineType } from 'sanity'

export const resultatsPage = defineType({
  name: 'resultatsPage',
  title: 'Page Résultats & Impact',
  type: 'document',
  groups: [
    { name: 'hero', title: 'En-tête' },
    { name: 'stats', title: 'Chiffres d\'impact' },
    { name: 'cases', title: 'Études de cas' },
  ],
  fields: [
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'object', fields: [
          {name:'fr', type:'string', title:'Français'},
          {name:'en', type:'string', title:'English'},
          {name:'de', type:'string', title:'Deutsch'},
        ]}),
        defineField({ name: 'description', type: 'object', fields: [
          {name:'fr', type:'text', title:'Français'},
          {name:'en', type:'text', title:'English'},
          {name:'de', type:'text', title:'Deutsch'},
        ]}),
      ]
    }),
    // Hero
    defineField({
      name: 'heroTitle',
      title: 'Titre principal',
      group: 'hero',
      type: 'object',
      fields: [
        {name:'fr', type:'string', title:'Français'},
        {name:'en', type:'string', title:'English'},
        {name:'de', type:'string', title:'Deutsch'},
      ]
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Sous-titre',
      group: 'hero',
      type: 'object',
      fields: [
        {name:'fr', type:'text', title:'Français'},
        {name:'en', type:'text', title:'English'},
        {name:'de', type:'text', title:'Deutsch'},
      ]
    }),
    // Stats d'impact
    defineField({
      name: 'impactStats',
      title: 'Chiffres clés d\'impact',
      group: 'stats',
      type: 'array',
      validation: rule => rule.max(4),
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Valeur numérique', type: 'number' }),
          defineField({ name: 'suffix', title: 'Suffixe (ex: +, %)', type: 'string' }),
          defineField({ name: 'prefix', title: 'Préfixe (ex: ~)', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'object', fields: [
            {name:'fr', type:'string', title:'Français'},
            {name:'en', type:'string', title:'English'},
            {name:'de', type:'string', title:'Deutsch'},
          ]}),
        ],
        preview: { select: { title: 'label.fr', subtitle: 'value' } }
      }]
    }),
    // Études de cas
    defineField({
      name: 'cases',
      title: 'Études de cas',
      group: 'cases',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Étude de cas',
        fields: [
          defineField({ name: 'sector', title: 'Secteur', type: 'object', fields: [
            {name:'fr', type:'string', title:'Français'},
            {name:'en', type:'string', title:'English'},
            {name:'de', type:'string', title:'Deutsch'},
          ]}),
          defineField({ name: 'title', title: 'Titre du cas', type: 'object', fields: [
            {name:'fr', type:'string', title:'Français'},
            {name:'en', type:'string', title:'English'},
            {name:'de', type:'string', title:'Deutsch'},
          ]}),
          defineField({ name: 'mainMetric', title: 'Résultat principal (%)', type: 'number' }),
          defineField({ name: 'mainMetricSuffix', title: 'Suffixe résultat (ex: %)', type: 'string', initialValue: '%' }),
          defineField({ name: 'mainMetricLabel', title: 'Label résultat', type: 'object', fields: [
            {name:'fr', type:'string', title:'Français'},
            {name:'en', type:'string', title:'English'},
            {name:'de', type:'string', title:'Deutsch'},
          ]}),
          defineField({
            name: 'kpis',
            title: 'Indicateurs (KPIs)',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                defineField({ name: 'value', title: 'Valeur', type: 'string' }),
                defineField({ name: 'unit', title: 'Unité', type: 'string' }),
                defineField({ name: 'label', title: 'Label', type: 'object', fields: [
                  {name:'fr', type:'string', title:'Français'},
                  {name:'en', type:'string', title:'English'},
                  {name:'de', type:'string', title:'Deutsch'},
                ]}),
              ],
              preview: { select: { title: 'label.fr', subtitle: 'value' } }
            }]
          }),
          defineField({
            name: 'beforeItems',
            title: 'Situation avant (liste)',
            type: 'object',
            fields: [
              {name:'fr', type:'array', title:'Français', of:[{type:'string'}]},
              {name:'en', type:'array', title:'English', of:[{type:'string'}]},
              {name:'de', type:'array', title:'Deutsch', of:[{type:'string'}]},
            ]
          }),
          defineField({
            name: 'afterItems',
            title: 'Actions réalisées (liste)',
            type: 'object',
            fields: [
              {name:'fr', type:'array', title:'Français', of:[{type:'string'}]},
              {name:'en', type:'array', title:'English', of:[{type:'string'}]},
              {name:'de', type:'array', title:'Deutsch', of:[{type:'string'}]},
            ]
          }),
        ],
        preview: { select: { title: 'title.fr', subtitle: 'sector.fr' } }
      }]
    }),
  ],
  preview: {
    prepare() { return { title: 'Page Résultats & Impact' } }
  }
})
```

**Enregistrer dans** `studio/schemaTypes/index.ts` :
```ts
import { resultatsPage } from './resultatsPage'
// Dans schemaTypes array :
resultatsPage,
```

**Query à ajouter dans** `src/sanity/client.ts` :
```ts
export async function getSanityResultatsPage(lang: string = 'fr') {
  return client.fetch(`
    *[_type == "resultatsPage"][0] {
      "seo": {
        "title": seo.title.${lang},
        "description": seo.description.${lang}
      },
      "heroTitle": heroTitle.${lang},
      "heroSubtitle": heroSubtitle.${lang},
      "impactStats": impactStats[] {
        value,
        suffix,
        prefix,
        "label": label.${lang}
      },
      "cases": cases[] {
        "sector": sector.${lang},
        "title": title.${lang},
        mainMetric,
        mainMetricSuffix,
        "mainMetricLabel": mainMetricLabel.${lang},
        "kpis": kpis[] {
          value,
          unit,
          "label": label.${lang}
        },
        "beforeItems": beforeItems.${lang},
        "afterItems": afterItems.${lang}
      }
    }
  `)
}
```

**Connecter `ResultatsPage.tsx`** : Appliquer le pattern useState + useEffect avec les données hardcodées actuelles comme fallback.

---

### TÂCHE 4 — Améliorer le schéma `settings` pour le Footer

**Fichier** : `studio/schemaTypes/settings.ts`

Le footer utilise déjà `getSettings()` mais le document n'a pas encore de données saisies. Le schéma `settings` existe et couvre :
- `footerInfo.slogan` (multilingue via `localeText`)
- `footerInfo.copyright` (multilingue via `localeString`)
- `contactInfo.address`, `contactInfo.email`, `contactInfo.phone`
- `socialMedia.linkedin`, `socialMedia.instagram`, `socialMedia.facebook`, `socialMedia.twitter`

**Aucune modification de code n'est nécessaire** pour le footer. Il faut juste que le client crée le document `settings` dans le studio et le remplisse.

---

### TÂCHE 5 — Créer le schéma `aProposPage` (fusionner contenu + équipe)

**Contexte** : La page `src/app/pages/TeamPage.tsx` s'appelle maintenant "À propos" et contient :
1. **Hero** avec titre/intro (depuis i18n `team_page.*`)
2. **Mission & Présence** (depuis i18n)
3. **Stats de l'entreprise** : 5 experts, 2 cantons, 6 partenaires, 100% neutre (depuis i18n)
4. **Photo de groupe** (URL placeholder)
5. **Section Team** (composant `Team.tsx` → déjà connecté à Sanity `teamMember`)
6. **Section Valeurs** (depuis i18n `why_us.items.*`)

**Schéma à créer** : `studio/schemaTypes/aProposPage.ts`

Ce schéma est un singleton qui gère le contenu éditorial de la page (pas l'équipe, qui est déjà dans `teamMember`).

```ts
import { defineField, defineType } from 'sanity'

export const aProposPage = defineType({
  name: 'aProposPage',
  title: 'Page À Propos',
  type: 'document',
  groups: [
    { name: 'hero', title: 'En-tête' },
    { name: 'mission', title: 'Mission & Présence' },
    { name: 'stats', title: 'Chiffres entreprise' },
    { name: 'quality', title: 'Processus qualité' },
    { name: 'photo', title: 'Photo de groupe' },
  ],
  fields: [
    // ── Hero ──
    defineField({ name: 'heroLabel', title: 'Badge au-dessus du titre', group: 'hero', type: 'object', fields: [
      {name:'fr', type:'string', title:'Français'},
      {name:'en', type:'string', title:'English'},
      {name:'de', type:'string', title:'Deutsch'},
    ]}),
    defineField({ name: 'heroTitle', title: 'Titre H1', group: 'hero', type: 'object', fields: [
      {name:'fr', type:'string', title:'Français'},
      {name:'en', type:'string', title:'English'},
      {name:'de', type:'string', title:'Deutsch'},
    ]}),
    defineField({ name: 'heroIntro', title: 'Paragraphe d\'introduction', group: 'hero', type: 'object', fields: [
      {name:'fr', type:'text', title:'Français'},
      {name:'en', type:'text', title:'English'},
      {name:'de', type:'text', title:'Deutsch'},
    ]}),
    // ── Mission ──
    defineField({ name: 'missionTitle', title: 'Titre Mission', group: 'mission', type: 'object', fields: [
      {name:'fr', type:'string', title:'Français'},
      {name:'en', type:'string', title:'English'},
      {name:'de', type:'string', title:'Deutsch'},
    ]}),
    defineField({ name: 'missionText', title: 'Texte Mission (paragraphe 1)', group: 'mission', type: 'object', fields: [
      {name:'fr', type:'text', title:'Français'},
      {name:'en', type:'text', title:'English'},
      {name:'de', type:'text', title:'Deutsch'},
    ]}),
    defineField({ name: 'missionText2', title: 'Texte Mission (paragraphe 2)', group: 'mission', type: 'object', fields: [
      {name:'fr', type:'text', title:'Français'},
      {name:'en', type:'text', title:'English'},
      {name:'de', type:'text', title:'Deutsch'},
    ]}),
    defineField({ name: 'presenceTitle', title: 'Titre Présence', group: 'mission', type: 'object', fields: [
      {name:'fr', type:'string', title:'Français'},
      {name:'en', type:'string', title:'English'},
      {name:'de', type:'string', title:'Deutsch'},
    ]}),
    defineField({ name: 'presenceText', title: 'Texte Présence géographique', group: 'mission', type: 'object', fields: [
      {name:'fr', type:'text', title:'Français'},
      {name:'en', type:'text', title:'English'},
      {name:'de', type:'text', title:'Deutsch'},
    ]}),
    // ── Stats entreprise ──
    defineField({
      name: 'companyStats',
      title: 'Chiffres de l\'entreprise (4 max)',
      group: 'stats',
      type: 'array',
      validation: rule => rule.max(4),
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Valeur (ex: 5, 100%)', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'object', fields: [
            {name:'fr', type:'string', title:'Français'},
            {name:'en', type:'string', title:'English'},
            {name:'de', type:'string', title:'Deutsch'},
          ]}),
        ],
        preview: { select: { title: 'value', subtitle: 'label.fr' } }
      }]
    }),
    // ── Processus qualité ──
    defineField({ name: 'qualityTitle', title: 'Titre section Qualité', group: 'quality', type: 'object', fields: [
      {name:'fr', type:'string', title:'Français'},
      {name:'en', type:'string', title:'English'},
      {name:'de', type:'string', title:'Deutsch'},
    ]}),
    defineField({ name: 'qualityText', title: 'Description Qualité', group: 'quality', type: 'object', fields: [
      {name:'fr', type:'text', title:'Français'},
      {name:'en', type:'text', title:'English'},
      {name:'de', type:'text', title:'Deutsch'},
    ]}),
    defineField({
      name: 'qualitySteps',
      title: 'Étapes qualité (badges)',
      description: 'Liste des étapes affichées comme badges (ex: Analyse, Audit, Recommandation…)',
      group: 'quality',
      type: 'object',
      fields: [
        {name:'fr', type:'array', title:'Français', of:[{type:'string'}]},
        {name:'en', type:'array', title:'English', of:[{type:'string'}]},
        {name:'de', type:'array', title:'Deutsch', of:[{type:'string'}]},
      ]
    }),
    // ── Photo de groupe ──
    defineField({
      name: 'groupPhoto',
      title: 'Photo de groupe de l\'équipe',
      group: 'photo',
      type: 'image',
      description: 'Photo affichée au-dessus de la section Équipe',
      options: { hotspot: true }
    }),
    defineField({ name: 'photoTitle', title: 'Titre sur la photo', group: 'photo', type: 'object', fields: [
      {name:'fr', type:'string', title:'Français'},
      {name:'en', type:'string', title:'English'},
      {name:'de', type:'string', title:'Deutsch'},
    ]}),
    defineField({ name: 'photoSubtitle', title: 'Sous-titre sur la photo', group: 'photo', type: 'object', fields: [
      {name:'fr', type:'string', title:'Français'},
      {name:'en', type:'string', title:'English'},
      {name:'de', type:'string', title:'Deutsch'},
    ]}),
  ],
  preview: {
    prepare() { return { title: 'Page À Propos' } }
  }
})
```

**Enregistrer dans** `studio/schemaTypes/index.ts`.

**Query à ajouter dans** `src/sanity/client.ts` :
```ts
export async function getSanityAProposPage(lang: string = 'fr') {
  return client.fetch(`
    *[_type == "aProposPage"][0] {
      "heroLabel": heroLabel.${lang},
      "heroTitle": heroTitle.${lang},
      "heroIntro": heroIntro.${lang},
      "missionTitle": missionTitle.${lang},
      "missionText": missionText.${lang},
      "missionText2": missionText2.${lang},
      "presenceTitle": presenceTitle.${lang},
      "presenceText": presenceText.${lang},
      "companyStats": companyStats[] {
        value,
        "label": label.${lang}
      },
      "qualityTitle": qualityTitle.${lang},
      "qualityText": qualityText.${lang},
      "qualitySteps": qualitySteps.${lang},
      "groupPhotoUrl": groupPhoto.asset->url,
      "photoTitle": photoTitle.${lang},
      "photoSubtitle": photoSubtitle.${lang}
    }
  `)
}
```

**Connecter `TeamPage.tsx`** : Le contenu actuellement géré via i18n (`t('team_page.*')`) doit être remplacé par des données Sanity via le pattern useState/useEffect. Les clés i18n restent comme fallback.

---

### TÂCHE 6 — Améliorer ArticlesSection (déjà partiellement fait)

Le composant `ArticlesSection.tsx` doit aussi :
1. Afficher un état de chargement sobre (pas de spinner complexe, juste les cartes vides ou skeleton)
2. Avoir un lien "Voir tous les articles" qui mène vers `/conseils`
3. Limiter l'affichage à 3 articles (les plus récents)

La query Sanity doit inclure `[0...3]` pour limiter :
```groq
*[_type == "article"] | order(publishedAt desc) [0...3] { ... }
```

---

### TÂCHE 7 — Déployer le studio après les changements de schémas

Après toute modification de schéma dans `studio/schemaTypes/`, redéployer le studio :
```bash
cd studio
npx sanity deploy
```
L'`appId` est déjà configuré dans `studio/sanity.cli.ts`, donc pas de prompt.

---

## Données à saisir dans Sanity Studio (pour le client)

> Ces données ne sont pas du code — elles doivent être créées manuellement dans https://swiss-ecogestes.sanity.studio/ (ou via script de migration si l'agent peut l'automatiser).

### Documents à créer :

1. **Settings (Paramètres & Footer)** — 1 document :
   - Email : `info@swissecogestes.ch`
   - Téléphone : *(à compléter par le client)*
   - Adresse : `Vaud & Genève`
   - LinkedIn : `https://www.linkedin.com/company/swissecogestes/`
   - Instagram : `https://www.instagram.com/swissecogestes/`
   - Slogan FR : "Nous accompagnons les propriétaires, entreprises et collectivités vers une transition énergétique concrète et rentable."

2. **5 Hero Slides** — ordre 1 à 5 :
   - Slide 1 (Principal) : "Réduisez vos coûts énergétiques et passez aux bonnes actions."
   - Slide 2 : "Villas & Maisons" → lien `/services/villa`
   - Slide 3 : "Régies & Immeubles" → lien `/services/gerance`
   - Slide 4 : "Entreprises" → lien `/services/entreprise`
   - Slide 5 : "Communes & GRD" → lien `/services/communes`
   *(Voir `src/app/data/heroSlides.ts` pour le contenu complet FR/EN/DE)*

3. **4 Statistiques** — ordre 1 à 4 :
   - "Jusqu'à 50% De Subventions" (icon: Zap)
   - "10 à 20% D'économies d'énergie" (icon: Leaf)
   - "≈ 2 ans Retour sur investissement" (icon: Users)
   - "Reconnus Partenaires Institutionnels" (icon: Building2)
   *(Voir `src/app/data/statsData.ts`)*

4. **Section "Pourquoi nous choisir"** — 1 document `whyChooseUs` :
   - 4 raisons avec icons : Landmark, FileText, Scale, Handshake
   *(Voir `src/app/data/whyChooseUsContent.ts`)*

5. **4 Types de clients** — ordre 1 à 4 :
   - Régies & Immeubles, Villas & Maisons, Entreprises & PME, Communes & GRD
   *(Voir `src/app/data/clientTypes.ts`)*

6. **4 Étapes du processus** :
   - Analyse → Audit → Recommandations → Accompagnement
   *(Voir `src/app/components/sections/ProcessSection.tsx`, `FALLBACK_STEPS`)*

7. **5 Membres de l'équipe** :
   - Mohammad SALMAN, Reem Al AYDI, Thibault CASIER, Daniel BADOUX, Patrick CASIMIRUS
   *(Voir `src/app/data/teamMembers.ts`)*

8. **Section À Propos** — 1 document `aboutPage` :
   *(Voir `src/app/data/aboutContent.ts`)*

9. **Partenaires** : eco21, SuisseEnergie, Chauffez Renouvelable, PEIK, Canton VD, Canton GE, OCEN
   *(Voir `src/app/components/sections/Partners.tsx`, `FALLBACK_PARTNERS`)*

10. **4 Pages Service** (1 document `servicePage` par slug) :
    - pageSlug: `villa` *(voir `src/app/data/villaPageContent.ts`)*
    - pageSlug: `gerance` *(voir `src/app/data/gerancePageContent.ts`)*
    - pageSlug: `entreprise` *(voir `src/app/data/entreprisePageContent.ts`)*
    - pageSlug: `communes` *(voir `src/app/data/communesPageContent.ts`)*

---

## Option : Script de migration automatique

Si l'agent peut exécuter des scripts Node.js, créer `studio/scripts/migrate.ts` pour peupler automatiquement les collections via le write client Sanity. Le write token est dans `VITE_SANITY_WRITE_TOKEN` (`.env`).

Exemple de structure :
```ts
import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

const client = createClient({
  projectId: 'btjdqrld',
  dataset: 'production',
  token: process.env.VITE_SANITY_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Créer les documents...
await client.create({ _type: 'stat', ... })
```

Les données à migrer se trouvent toutes dans `src/app/data/*.ts`.

---

## Résumé des fichiers à modifier/créer

| Action | Fichier |
|--------|---------|
| MODIFIER | `src/app/components/sections/ArticlesSection.tsx` |
| MODIFIER | `src/app/pages/ArticleDetailPage.tsx` (vérifier) |
| MODIFIER | `src/app/pages/ResultatsPage.tsx` |
| MODIFIER | `src/app/pages/TeamPage.tsx` |
| MODIFIER | `src/sanity/client.ts` (ajouter queries) |
| MODIFIER | `studio/schemaTypes/index.ts` (enregistrer nouveaux schemas) |
| CRÉER | `studio/schemaTypes/resultatsPage.ts` |
| CRÉER | `studio/schemaTypes/aProposPage.ts` |
| CRÉER | `studio/scripts/migrate.ts` (optionnel, peuplement auto) |
| DÉPLOYER | `cd studio && npx sanity deploy` après chaque changement de schema |

---

## Notes importantes pour l'agent

1. **Ne jamais committer ni pusher** le code
2. **Ne pas mettre d'emojis** dans les fichiers
3. **Toujours vérifier** avec `npx tsc --noEmit` après chaque modification
4. **Labels Sanity Studio en français simple** pour le client (pas de jargon technique)
5. **Les fichiers `src/app/data/*.ts` sont les fallbacks** — ne pas les supprimer
6. Le client peut se connecter au studio via : **https://swiss-ecogestes.sanity.studio/**
7. L'`appId` Sanity est `mhp98kz9eqrbqnmzxbpsw85i` (déjà dans `sanity.cli.ts`)
8. Pour redéployer le studio après des changements de schémas : `cd studio && npx sanity deploy`
