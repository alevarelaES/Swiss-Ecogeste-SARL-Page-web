# 🎯 Checklist de Migration Sanity CMS

## ✅ Phase 1 : Configuration (TERMINÉ)

- [x] Installation de Sanity Studio dans `/studio`
- [x] Création des 4 schémas (service, teamMember, article, settings)
- [x] Enregistrement des schémas dans `index.ts`
- [x] Déploiement des schémas vers Sanity Cloud
- [x] Installation des packages frontend (`@sanity/client`, `@sanity/image-url`)
- [x] Configuration du client Sanity
- [x] Création des types TypeScript
- [x] Création du script de migration automatique
- [x] Installation de `@portabletext/react` pour le rendu du contenu

---

## 📋 Phase 2 : Migration des données (À FAIRE)

### Étape 1 : Démarrer Sanity Studio
```bash
npm run studio
# ou
cd studio && npm run dev
```
✅ Le studio s'ouvre sur http://localhost:3333

### Étape 2 : Exécuter la migration automatique
```bash
npm run migrate
```
Cela va créer automatiquement :
- [ ] 4 services (Gérance, Villa, Entreprise, Commune)
- [ ] Tous les membres de l'équipe
- [ ] Les articles de blog
- [ ] Le document Settings

### Étape 3 : Ajouter les images manuellement
⚠️ **IMPORTANT** : Les images doivent être uploadées dans Sanity Studio car les URLs externes (Unsplash) ne fonctionneront pas.

Pour chaque **Service** :
- [ ] Gérance - Upload de l'image
- [ ] Villa - Upload de l'image
- [ ] Entreprise - Upload de l'image
- [ ] Commune - Upload de l'image

Pour chaque **Team Member** :
- [ ] Mohammad SALMAN - Upload de la photo
- [ ] Reem Al AYDI - Upload de la photo
- [ ] Thibault CASIER - Upload de la photo
- [ ] Daniel BADOUX - Upload de la photo
- [ ] (autres membres...)

Pour chaque **Article** :
- [ ] Article 1 - Upload de l'image principale
- [ ] Article 2 - Upload de l'image principale
- [ ] Article 3 - Upload de l'image principale

Pour **Settings** :
- [ ] Upload du logo
- [ ] Upload du favicon
- [ ] Vérifier les coordonnées (tel, email, adresse)

---

## 🔄 Phase 3 : Migration du code React (À FAIRE)

### Étape 1 : Tester les nouveaux composants

#### Test Services
Dans [src/app/pages/Home.tsx](src/app/pages/Home.tsx), remplacez :
```tsx
import { Services } from '../components/sections/Services'
// par
import { ServicesSanity } from '../components/sections/ServicesSanity'
```

Et dans le JSX :
```tsx
<Services />
// par
<ServicesSanity />
```

- [ ] Services s'affichent correctement
- [ ] Images chargent correctement
- [ ] Multilingue fonctionne (FR/EN)

#### Test Team
Dans [src/app/pages/Home.tsx](src/app/pages/Home.tsx), remplacez :
```tsx
import { Team } from '../components/sections/Team'
// par
import { TeamSanity } from '../components/sections/TeamSanity'
```

Et dans le JSX :
```tsx
<Team />
// par
<TeamSanity />
```

- [ ] Équipe s'affiche correctement
- [ ] Photos ou initiales affichées
- [ ] Ordre correct

#### Test Articles
Dans [src/app/App.tsx](src/app/App.tsx), ajoutez la route :
```tsx
import { ArticleDetailPageSanity } from './pages/ArticleDetailPageSanity'

// Dans les routes
<Route path="/conseils/:slug" element={<ArticleDetailPageSanity />} />
```

- [ ] Page article charge
- [ ] Portable Text s'affiche
- [ ] Images dans le contenu fonctionnent

### Étape 2 : Migrer toutes les pages

#### Pages à modifier :
- [ ] [src/app/pages/Home.tsx](src/app/pages/Home.tsx)
- [ ] [src/app/pages/ServicesPage.tsx](src/app/pages/ServicesPage.tsx)
- [ ] [src/app/pages/TeamPage.tsx](src/app/pages/TeamPage.tsx)
- [ ] [src/app/pages/ConseilsPage.tsx](src/app/pages/ConseilsPage.tsx)
- [ ] [src/app/components/layout/Footer.tsx](src/app/components/layout/Footer.tsx) (Settings)
- [ ] [src/app/components/layout/Navbar.tsx](src/app/components/layout/Navbar.tsx) (Settings)

#### Composants à modifier :
- [ ] `ArticlesSection.tsx` - Utiliser `getArticles()`
- [ ] `ContactSection.tsx` - Utiliser `getSettings()`

---

## 🧪 Phase 4 : Tests (À FAIRE)

### Tests fonctionnels
- [ ] Tous les services s'affichent
- [ ] Toute l'équipe s'affiche
- [ ] Tous les articles s'affichent
- [ ] Navigation fonctionne
- [ ] Images chargent correctement
- [ ] Switch FR/EN fonctionne

### Tests de performance
- [ ] Temps de chargement acceptable
- [ ] Images optimisées (vérifier les tailles)
- [ ] Pas d'erreurs console

### Tests responsive
- [ ] Mobile (< 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)

---

## 🚀 Phase 5 : Préparation Production (À FAIRE)

### Configuration
- [ ] Créer fichier `.env` avec les variables Sanity
- [ ] Modifier `src/sanity/client.ts` pour utiliser les variables d'env
- [ ] Configurer CORS pour le domaine de production :
  ```bash
  cd studio
  npx sanity cors add https://votre-domaine.ch --credentials
  ```

### Build & Déploiement
- [ ] Tester le build : `npm run build`
- [ ] Tester le preview : `npm run preview`
- [ ] Déployer le Studio sur Sanity.io (optionnel)
- [ ] Déployer le site React

### Nettoyage
- [ ] Supprimer les anciens fichiers de données (`src/app/data/`)
- [ ] Supprimer les anciens composants non utilisés
- [ ] Nettoyer les imports non utilisés

---

## 📚 Phase 6 : Formation du client (À FAIRE)

### Préparer la documentation
- [ ] Guide d'utilisation du Studio Sanity
- [ ] Comment ajouter un service
- [ ] Comment ajouter un membre d'équipe
- [ ] Comment publier un article de blog
- [ ] Comment modifier les paramètres du site

### Accès
- [ ] Créer un compte Sanity pour le client
- [ ] L'ajouter au projet avec les droits appropriés
- [ ] Lui envoyer le lien du Studio
- [ ] Planifier une session de formation

---

## ✨ Extras (Optionnel)

### Amélioration de l'expérience
- [ ] Ajouter React Query pour le cache
- [ ] Ajouter des états de chargement globaux
- [ ] Ajouter la prévisualisation en temps réel
- [ ] Configurer Sanity CDN pour de meilleures performances

### SEO
- [ ] Ajouter les meta tags depuis Settings
- [ ] Générer un sitemap dynamique
- [ ] Configurer Open Graph images

### Analytics
- [ ] Intégrer Google Analytics dans Settings
- [ ] Tracking des articles les plus lus

---

## 📝 Notes importantes

### Commandes utiles
```bash
# Démarrer le Studio
npm run studio

# Démarrer le site React
npm run dev

# Migrer les données
npm run migrate

# Déployer les schémas
cd studio && npx sanity@latest schema deploy
```

### Liens
- **Studio local** : http://localhost:3333
- **Site local** : http://localhost:5173
- **Sanity Manage** : https://www.sanity.io/manage
- **Project ID** : btjdqrld

### Ressources
- [SANITY_SETUP.md](./SANITY_SETUP.md) - Guide complet
- [GUIDE_MIGRATION_SANITY.md](./GUIDE_MIGRATION_SANITY.md) - Guide de migration détaillé
- [scripts/migrate-to-sanity.ts](./scripts/migrate-to-sanity.ts) - Script de migration

---

**Statut actuel** : ✅ Configuration terminée, prêt pour la migration des données !
