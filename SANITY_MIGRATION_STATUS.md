# 📊 État de la Migration Sanity CMS - Swiss Ecogeste

**Date de dernière mise à jour :** 2 février 2026  
**Projet Sanity ID :** btjdqrld  
**Dataset :** production  
**Studio URL (local) :** http://localhost:3333

---

## ✅ Ce qui est FAIT

### 1. Configuration Sanity
- ✅ Studio installé dans `/studio` (monorepo)
- ✅ Client Sanity configuré (`src/sanity/client.ts`)
- ✅ API Token créé et stocké dans `.env`
- ✅ Variables d'environnement configurées

### 2. Schémas Créés (10 types)
Tous les schémas supportent **3 langues : FR/EN/DE**

1. **service.ts** - Services offerts (Villas, Entreprises, Régies, Communes)
2. **teamMember.ts** - Membres de l'équipe
3. **article.ts** - Articles de blog avec Portable Text
4. **settings.ts** - Paramètres globaux du site (singleton)
5. **heroSlide.ts** - Slides du carrousel hero
6. **stat.ts** - Statistiques
7. **whyChooseUs.ts** - Section "Pourquoi nous choisir"
8. **aboutPage.ts** - Page À propos
9. **clientType.ts** - Types de clients
10. **pageContent.ts** - Pages services (Villa/Entreprise/Gérance/Communes)

**Localisation :** `studio/schemaTypes/`  
**Déployés :** ✅ Oui (via `npx sanity schema deploy`)

### 3. Données Migrées (Première Vague)

✅ **4 Services** migrés avec FR/EN/DE  
✅ **5 Membres d'équipe** migrés avec FR/EN/DE  
✅ **3 Articles** migrés avec FR/EN/DE  
✅ **1 Document Settings** migré avec FR/EN/DE  

**⚠️ Images non incluses** - À ajouter manuellement dans le Studio

### 4. Scripts Créés

- `scripts/migrate-to-sanity.ts` - Migration initiale (services, team, articles, settings)
- `scripts/clean-sanity.ts` - Suppression de tous les documents

---

## ❌ Ce qui reste à FAIRE

### 1. Créer le Script de Migration Complet
Fichier à créer : `scripts/migrate-all-content.ts`

**Données à migrer depuis :**
- ❌ `src/app/data/heroSlides.ts` → Type: `heroSlide`
- ❌ `src/app/data/statsData.ts` → Type: `stat`
- ❌ `src/app/data/whyChooseUsContent.ts` → Type: `whyChooseUs`
- ❌ `src/app/data/aboutContent.ts` → Type: `aboutPage`
- ❌ `src/app/data/clientTypes.ts` → Type: `clientType`
- ❌ `src/app/data/villaPageContent.ts` → Type: `pageContent` (pageType: 'villa')
- ❌ `src/app/data/entreprisePageContent.ts` → Type: `pageContent` (pageType: 'entreprise')
- ❌ `src/app/data/gerancePageContent.ts` → Type: `pageContent` (pageType: 'gerance')
- ❌ `src/app/data/communesPageContent.ts` → Type: `pageContent` (pageType: 'communes')

**Fichiers non migrés (à évaluer) :**
- `conseilsPageContent.ts` - Contenu de la page Conseils
- `subventionsContent.ts` - Contenu sur les subventions
- `legalPagesContent.ts` - Mentions légales, confidentialité, etc.

### 2. Ajouter les Images dans Sanity Studio
- Ouvrir http://localhost:3333
- Pour chaque document (services, team, articles, hero slides, etc.)
- Uploader les images appropriées
- **Note :** Les URLs Unsplash dans le code ne fonctionneront pas en production

### 3. Intégration Frontend
- Remplacer les composants statiques par versions Sanity
- Exemples déjà créés :
  - `src/app/components/sections/ServicesSanity.tsx`
  - `src/app/components/sections/TeamSanity.tsx`
  - `src/app/pages/ArticleDetailPageSanity.tsx`
  - `src/app/components/ui/PortableTextRenderer.tsx`

### 4. Tests et Validation
- Tester le changement de langue (FR/EN/DE)
- Vérifier que tous les contenus s'affichent correctement
- Valider les liens et références

### 5. Production
- Configurer CORS pour le domaine de production
- Décider si déployer le Studio sur Sanity.io (`npx sanity deploy`)
- Former le client à l'utilisation du Studio

---

## 🔧 Commandes Importantes

### Démarrer le Studio (local)
```bash
cd studio
npm run dev
```
**URL :** http://localhost:3333

### Démarrer l'application React
```bash
npm run dev
```

### Déployer les schémas
```bash
cd studio
npx sanity schema deploy
```

### Exécuter une migration
```bash
npm run migrate
```

### Supprimer tous les documents
```bash
npx tsx scripts/clean-sanity.ts
```

### Gérer le projet Sanity
```bash
cd studio
npx sanity manage
```

---

## 📁 Structure du Projet

```
Swiss-Ecogeste-SARL-Page-web/
├── studio/                          # Sanity Studio
│   ├── schemaTypes/
│   │   ├── service.ts              ✅ Déployé
│   │   ├── teamMember.ts           ✅ Déployé
│   │   ├── article.ts              ✅ Déployé
│   │   ├── settings.ts             ✅ Déployé
│   │   ├── heroSlide.ts            ✅ Déployé
│   │   ├── stat.ts                 ✅ Déployé
│   │   ├── whyChooseUs.ts          ✅ Déployé
│   │   ├── aboutPage.ts            ✅ Déployé
│   │   ├── clientType.ts           ✅ Déployé
│   │   ├── pageContent.ts          ✅ Déployé
│   │   └── index.ts                ✅ Mis à jour
│   ├── sanity.config.ts
│   └── sanity.cli.ts
├── src/
│   ├── sanity/
│   │   ├── client.ts               ✅ Client configuré
│   │   ├── image.ts                ✅ Image helpers
│   │   └── types.ts                ✅ TypeScript interfaces
│   └── app/data/                   📂 Sources de données
│       ├── services.ts             ✅ Migré
│       ├── teamMembers.ts          ✅ Migré
│       ├── articles.ts             ✅ Migré
│       ├── heroSlides.ts           ❌ À migrer
│       ├── statsData.ts            ❌ À migrer
│       ├── whyChooseUsContent.ts   ❌ À migrer
│       ├── aboutContent.ts         ❌ À migrer
│       ├── clientTypes.ts          ❌ À migrer
│       ├── villaPageContent.ts     ❌ À migrer
│       ├── entreprisePageContent.ts ❌ À migrer
│       ├── gerancePageContent.ts   ❌ À migrer
│       └── communesPageContent.ts  ❌ À migrer
├── scripts/
│   ├── migrate-to-sanity.ts        ✅ Première migration
│   └── clean-sanity.ts             ✅ Nettoyage
└── .env                            ✅ Token configuré
```

---

## 🔐 Informations Sensibles

**API Token (Editor)** - Stocké dans `.env`
```
SANITY_WRITE_TOKEN=skQa942pGRCkAzGnPQTqXAskUly7GWsUKGmARChPbbiv30ziG1g3Qo1q8qbTk63SLHZ89fRFnSYSTeg3X763WhTMkgjfIvYAvYdc4xFHQqt3e3zS6AUCDqyuk1lsF4inix2wXS0cezrlp99whNAnNtV7p7VDJ99zu5frPhky3RAZkoLNNOYA
```

**⚠️ Ne jamais commiter le fichier `.env` !**

---

## 📝 Prochaines Étapes Recommandées

1. **Créer le script de migration complet**
   - Copier la structure de `scripts/migrate-to-sanity.ts`
   - Ajouter les fonctions pour chaque type de contenu
   - Importer les getters depuis les fichiers TypeScript

2. **Exécuter la migration**
   ```bash
   npm run migrate-all  # À configurer dans package.json
   ```

3. **Ajouter les images manuellement**
   - Ouvrir http://localhost:3333
   - Uploader images pour chaque document

4. **Intégrer le frontend**
   - Remplacer progressivement les composants statiques
   - Tester avec i18n (changement de langue)

5. **Former le client**
   - Montrer comment utiliser le Studio
   - Expliquer la structure des contenus multilingues

---

## 🆘 Dépannage

### Le Studio ne démarre pas
```bash
cd studio
rm -rf node_modules
npm install
npm run dev
```

### Les schémas ne sont pas à jour
```bash
cd studio
npx sanity schema deploy
```

### Erreur de permission lors de la migration
- Vérifier que `SANITY_WRITE_TOKEN` est bien dans `.env`
- Vérifier que le token a les permissions Editor

### Les images ne s'affichent pas
- Les URLs Unsplash ne fonctionnent que temporairement
- Uploader les vraies images dans Sanity Studio

---

## 📚 Documentation Utile

- **Sanity Documentation :** https://www.sanity.io/docs
- **GROQ Documentation :** https://www.sanity.io/docs/groq
- **Portable Text :** https://portabletext.org/
- **Sanity TypeScript :** https://www.sanity.io/docs/typescript

---

## 👤 Contacts Projet

**Développeur :** Alexandre Varela  
**Client :** Swiss Ecogeste SARL  
**Projet :** Site web multilingue (FR/EN/DE)

---

**🎯 Objectif Final :** Permettre au client de modifier tout le contenu du site (textes, images, équipe, services, articles) via Sanity Studio sans toucher au code.
