# Guide de Correction - Problèmes Sanity

## Problèmes Identifiés

### 1. ✅ Section Partenaires vide
- Manquait le texte "Ils nous font confiance et recommandent nos services"
- Manquait la liste des partenaires
- **CORRIGÉ** dans le script de migration

### 2. ✅ Champs non définis (Unknown fields)
- Des champs comme `delay`, `description`, `features`, `subtitle` n'étaient pas au bon endroit
- Structure des `clientType` incorrecte
- **CORRIGÉ** dans le script de migration

## Solution en 2 Étapes

### Étape 1 : Nettoyer les documents invalides

```bash
npm run clean:sanity
```

Ce script va :
- Supprimer tous les services invalides (sans `cardInfo.title`)
- Supprimer tous les clientTypes invalides (sans `title.fr`)
- Afficher la liste des documents restants

### Étape 2 : Relancer la migration corrigée

```bash
npm run migrate:pages
```

Ce script va recréer :
- 4 clientTypes avec la bonne structure (sans champs en trop)
- 4 services avec la bonne structure
- 5 team members
- 4 pages (homePage, servicesPage, teamPage, aboutPage)
- Section partenaires avec le texte et 4 partenaires

## Changements Apportés

### ClientType - Structure Corrigée

**AVANT** (incorrect) :
```typescript
{
  title: { _type: 'localeString', fr: '...', en: '...', de: '...' },
  subtitle: { _type: 'localeString', ... },
  description: { _type: 'localeText', ... },
  image: { ... } // ← Causait des erreurs
}
```

**APRÈS** (correct) :
```typescript
{
  slug: 'villas',
  title: { fr: '...', en: '...', de: '...' },
  subtitle: { fr: '...', en: '...', de: '...' },
  description: { fr: '...', en: '...', de: '...' },
  link: '/services/villa',
  order: 1
  // Pas d'image - à ajouter manuellement dans Studio
}
```

### Section Partenaires - Ajoutée

**AVANT** :
```typescript
partnersSection: {
  title: { ... },
  list: [] // ← Vide
}
```

**APRÈS** :
```typescript
partnersSection: {
  title: {
    fr: 'Ils nous font confiance et recommandent nos services',
    en: 'They trust us and recommend our services',
    de: 'Sie vertrauen uns und empfehlen unsere Dienstleistungen'
  },
  list: [
    { _key: 'partner-sig', name: 'SIG - Services Industriels de Genève' },
    { _key: 'partner-romande', name: 'Romande Energie' },
    { _key: 'partner-canton', name: 'Canton de Genève' },
    { _key: 'partner-cecb', name: 'CECB' }
  ]
}
```

## Après la Migration

### Tâches Restantes

1. **Ajouter les images dans Sanity Studio** :
   - ClientTypes : 4 images à uploader
   - Hero slides : 4 images à uploader
   - Services : 4 images hero (optionnel)
   - Team members : 5 photos (optionnel)
   - About page : 1 image
   - **Partenaires : 4 logos à uploader**

2. **Vérifier dans Studio** :
   - Ouvrir chaque clientType et uploader l'image correspondante
   - Ouvrir homePage > Partenaires et uploader les logos

### Upload des Logos Partenaires

Dans Sanity Studio, aller dans **Home Page > Partenaires** :

1. **SIG** : Logo Services Industriels de Genève
2. **Romande Energie** : Logo Romande Energie
3. **Canton de Genève** : Logo du Canton
4. **CECB** : Logo CECB

## Vérification

Après avoir exécuté les 2 étapes, vérifiez dans Studio :

✅ **ClientTypes** :
- [ ] 4 documents (regies, villas, entreprises, communes)
- [ ] Chacun a title, subtitle, description en FR/EN/DE
- [ ] Aucun champ "unknown field"

✅ **Services** :
- [ ] 4 documents avec `cardInfo` et `detailPage`
- [ ] Aucun "Service sans titre"
- [ ] Aucun champ "unknown field"

✅ **Home Page** :
- [ ] Section Partenaires a le titre
- [ ] Section Partenaires a 4 items dans la liste
- [ ] Chaque item a un nom (logo à ajouter manuellement)

## En Cas de Problème

Si vous voyez encore des erreurs :

1. **Vérifier les schémas sont déployés** :
   ```bash
   cd studio
   npx sanity deploy
   ```

2. **Supprimer TOUS les documents et recommencer** :
   ```bash
   # Dans Sanity Studio, utiliser Vision:
   # *[_type in ["clientType", "service", "teamMember", "homePage", "servicesPage", "teamPage", "aboutPage"]]
   # Puis supprimer manuellement
   ```

3. **Relancer la migration** :
   ```bash
   npm run migrate:pages
   ```

## Résumé des Commandes

```bash
# 1. Nettoyer les documents invalides
npm run clean:sanity

# 2. Relancer la migration corrigée
npm run migrate:pages

# 3. Vérifier dans Studio
npm run studio
```
