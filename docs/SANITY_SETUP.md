# 🎉 Migration Sanity CMS - Swiss Ecogeste

## ✅ Configuration complète terminée !

Votre projet React/Vite est maintenant prêt à utiliser Sanity CMS. Voici ce qui a été configuré :

---

## 📁 Structure du projet

```
Swiss-Ecogeste-SARL-Page-web/
├── studio/                          # 🎨 Sanity Studio
│   ├── schemaTypes/
│   │   ├── service.ts              # Schéma Services
│   │   ├── teamMember.ts           # Schéma Équipe
│   │   ├── article.ts              # Schéma Blog
│   │   └── settings.ts             # Schéma Paramètres
│   ├── sanity.config.ts
│   └── package.json
│
├── src/
│   ├── sanity/                      # 📦 Client Sanity
│   │   ├── client.ts               # Client + helpers de requêtes
│   │   ├── image.ts                # Helpers images
│   │   └── types.ts                # Types TypeScript
│   │
│   └── app/
│       ├── components/sections/
│       │   ├── ServicesSanity.tsx  # 🆕 Services avec Sanity
│       │   └── TeamSanity.tsx      # 🆕 Équipe avec Sanity
│       └── data/                   # ⚠️ Données statiques (à garder pour référence)
│
└── scripts/
    └── migrate-to-sanity.ts        # 🔄 Script de migration automatique
```

---

## 🚀 Commandes rapides

### Démarrer le Studio Sanity
```bash
cd studio
npm run dev
```
➡️ Ouvre http://localhost:3333

### Démarrer le site React
```bash
npm run dev
```
➡️ Ouvre http://localhost:5173

### Migrer automatiquement les données
```bash
npx tsx scripts/migrate-to-sanity.ts
```
⚠️ Les images devront être uploadées manuellement dans le Studio

---

## 📝 Schémas créés

### 1. Service
- **Multilingue** (FR/EN)
- Champs : titre, sous-titre, description, fullDescription (Portable Text), features, image, icon, link
- Utilisé pour : Villas, Entreprises, Communes, Régies

### 2. Team Member
- **Multilingue** (FR/EN)
- Champs : nom, rôle, initiales, photo, couleur, compétences, email, téléphone
- Ordre d'affichage configurable

### 3. Article
- **Multilingue** (FR/EN)
- Champs : titre, slug, résumé, catégorie, date, temps de lecture, image, contenu (Portable Text)
- Support des tags et articles en vedette

### 4. Settings (Singleton)
- **Multilingue** (FR/EN)
- Paramètres globaux : nom du site, téléphone, email, adresse, réseaux sociaux, horaires
- Logo et favicon

---

## 🔧 Configuration Sanity

### Informations de connexion
- **Project ID** : `btjdqrld`
- **Dataset** : `production`
- **Studio URL** : http://localhost:3333
- **API Version** : `2024-01-01`

### Packages installés
```json
{
  "@sanity/client": "^6.x.x",
  "@sanity/image-url": "^1.x.x"
}
```

---

## 📖 Utilisation dans React

### Exemple : Récupérer les services

```tsx
import { useEffect, useState } from 'react'
import { getServices } from '../sanity/client'
import { Service } from '../sanity/types'
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { i18n } = useTranslation()
  const [services, setServices] = useState<Service[]>([])
  const currentLang = i18n.language as 'fr' | 'en'

  useEffect(() => {
    getServices().then(setServices)
  }, [])

  return (
    <div>
      {services.map(service => (
        <div key={service._id}>
          <h2>{service.title[currentLang]}</h2>
          <p>{service.description[currentLang]}</p>
        </div>
      ))}
    </div>
  )
}
```

### Exemple : Afficher une image

```tsx
import { getImageUrl } from '../sanity/image'

<img 
  src={getImageUrl(service.image, 800, 600)} 
  alt={service.image.alt || ''}
/>
```

---

## 🎯 Plan de migration

### Phase 1 : Ajouter le contenu dans Sanity
1. ✅ Démarrez le Studio : `cd studio && npm run dev`
2. 🔄 Exécutez la migration automatique : `npx tsx scripts/migrate-to-sanity.ts`
3. 📸 Uploadez les images manuellement dans chaque document
4. ✏️ Vérifiez et complétez le contenu

### Phase 2 : Migrer progressivement le frontend
1. **Settings** → Modifiez Footer/Navbar
2. **Services** → Utilisez `ServicesSanity.tsx` au lieu de `Services.tsx`
3. **Team** → Utilisez `TeamSanity.tsx` au lieu de `Team.tsx`
4. **Articles** → Modifiez ArticlesSection et ArticleDetailPage

### Phase 3 : Nettoyer
1. Une fois tout migré, supprimez les fichiers dans `src/app/data/`
2. Supprimez les anciens composants statiques
3. Testez en production

---

## ⚠️ Points importants

### Images
- ❌ **Ne pas utiliser** d'URLs externes (Unsplash, etc.)
- ✅ **Uploader** toutes les images dans Sanity Studio
- ✅ Utiliser `getImageUrl()` pour afficher les images

### Multilingue
- Les contenus sont stockés en FR et EN dans le même document
- Utiliser `service.title[i18n.language]` pour afficher la bonne langue

### Portable Text (contenu riche)
Pour afficher le contenu des articles :
```bash
npm install @portabletext/react
```

```tsx
import { PortableText } from '@portabletext/react'

<PortableText value={article.content[currentLang]} />
```

---

## 🔐 Sécurité & Production

### CORS
Avant de déployer en production, ajoutez votre domaine aux CORS :
```bash
cd studio
npx sanity cors add https://votre-domaine.ch --credentials
```

### Variables d'environnement
Créez un fichier `.env` :
```env
VITE_SANITY_PROJECT_ID=btjdqrld
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

Puis modifiez [src/sanity/client.ts](src/sanity/client.ts):
```ts
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  useCdn: true,
})
```

---

## 📚 Ressources utiles

- [Documentation Sanity](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/query-cheat-sheet)
- [Portable Text](https://github.com/portabletext/react-portabletext)
- [Guide de migration complet](./GUIDE_MIGRATION_SANITY.md)

---

## 🆘 Besoin d'aide ?

### Studio ne démarre pas
```bash
cd studio
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Erreur de schémas
```bash
cd studio
npx sanity@latest schema deploy
```

### Problème de CORS
Ajoutez http://localhost:5173 aux CORS dans Sanity :
```bash
cd studio
npx sanity cors add http://localhost:5173 --credentials
```

---

## ✨ Prochaines étapes

- [ ] Exécuter le script de migration
- [ ] Uploader les images dans Sanity
- [ ] Tester `ServicesSanity.tsx` et `TeamSanity.tsx`
- [ ] Migrer les pages une par une
- [ ] Configurer les CORS pour la production
- [ ] Former le client à utiliser Sanity Studio

**Bon courage avec la migration ! 🚀**
