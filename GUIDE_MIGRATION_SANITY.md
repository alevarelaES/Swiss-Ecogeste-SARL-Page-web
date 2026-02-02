# Guide de migration vers Sanity CMS

## ✅ Étape 1 : Configuration terminée

Les schémas Sanity ont été créés et déployés avec succès ! Voici ce qui a été mis en place :

### Schémas créés :
- **service.ts** : Services (Villas, Entreprises, Communes, Régies)
- **teamMember.ts** : Membres de l'équipe avec photos
- **article.ts** : Articles de blog avec Portable Text
- **settings.ts** : Paramètres globaux (tel, email, réseaux sociaux)

### Client Sanity configuré :
- `src/sanity/client.ts` : Client Sanity avec helpers de requêtes
- `src/sanity/image.ts` : Helpers pour les images optimisées
- `src/sanity/types.ts` : Types TypeScript pour toutes les données

---

## 📝 Étape 2 : Ajouter du contenu dans Sanity Studio

### 1. Démarrer le Studio Sanity

```bash
cd studio
npm run dev
```

Le studio sera accessible sur **http://localhost:3333**

### 2. Créer vos premiers documents

#### Services
Créez 4 services en utilisant les données de `src/app/data/services.ts` :
- Gérance (id: gerance)
- Villa (id: villa)
- Entreprise (id: entreprise)
- Commune (id: commune)

**Exemple de service "Villa" :**
- ID: `villa`
- Number: `02`
- Icon: `Home`
- Titre (FR): `Propriétaires de Villas`
- Titre (EN): `Villa Owners`
- Sous-titre (FR): `Particuliers`
- Sous-titre (EN): `Individuals`
- Description courte (FR): Copier depuis services.ts
- Image: Télécharger une image + ajouter le texte alternatif
- Features (FR): Ajouter chaque fonctionnalité une par une

#### Membres de l'équipe
Créez les membres de l'équipe depuis `src/app/data/teamMembers.ts`

**Exemple - Mohammad SALMAN :**
- Nom: `Mohammad SALMAN`
- Rôle (FR): `Conseiller en énergie`
- Rôle (EN): `Energy Consultant`
- Initiales: `MS`
- Color: `from-[var(--primary)] to-emerald-600`
- Items (FR): 
  - Expert "Chauffez renouvelable"
  - Concessionnaire IDC Genève
  - Expert éclairage SIG
  - Conseiller villa/entreprises
- Order: `1`

#### Articles
Créez 2-3 articles de test depuis `src/app/data/articles.ts`

**Exemple - Article sur l'électricité :**
- Titre (FR): `Comment réduire sa facture d'électricité de 20% ?`
- Slug: Générer depuis le titre
- Category (FR): `Conseils`
- Date de publication: `2026-01-24`
- Temps de lecture: `5 min`
- Image: Télécharger + alt text
- Contenu: Utiliser l'éditeur Portable Text pour le contenu HTML

#### Paramètres du site
Créez **un seul document "Settings"** :
- Site Name (FR): `Swiss Ecogeste`
- Phone: `+41 22 XXX XX XX`
- Email: `contact@swiss-ecogeste.ch`
- Address: Remplir les champs
- Social Media: Ajouter vos URLs

---

## 🔄 Étape 3 : Migrer le code React pour utiliser Sanity

### Exemple : Page Services

#### Avant (données statiques)
```tsx
// src/app/pages/ServicesPage.tsx
import { servicesFr, servicesEn } from '../data/services'

function ServicesPage() {
  const services = i18n.language === 'fr' ? servicesFr : servicesEn
  // ...
}
```

#### Après (données Sanity)
```tsx
// src/app/pages/ServicesPage.tsx
import { useEffect, useState } from 'react'
import { getServices } from '../../sanity/client'
import { Service } from '../../sanity/types'
import { useTranslation } from 'react-i18next'

function ServicesPage() {
  const { i18n } = useTranslation()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getServices().then(data => {
      setServices(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {services.map(service => (
        <div key={service._id}>
          <h2>{service.title[i18n.language as 'fr' | 'en']}</h2>
          <p>{service.description[i18n.language as 'fr' | 'en']}</p>
        </div>
      ))}
    </div>
  )
}
```

### Exemple : Afficher une image Sanity

```tsx
import { getImageUrl } from '../../sanity/image'

// Dans votre composant
<img 
  src={getImageUrl(service.image, 800, 600)} 
  alt={service.image.alt || service.title.fr}
/>
```

---

## 🎯 Étape 4 : Migration progressive

### Plan recommandé :

1. **Commencez par Settings** (le plus simple)
   - Créez le document dans Sanity
   - Modifiez le Footer/Navbar pour utiliser `getSettings()`

2. **Migrez les Services**
   - Créez les 4 services dans Sanity
   - Modifiez `Services.tsx`, `ServicesPage.tsx`
   - Testez l'affichage

3. **Migrez l'équipe**
   - Créez les membres dans Sanity
   - Modifiez `Team.tsx`, `TeamPage.tsx`

4. **Migrez les articles**
   - Créez 2-3 articles dans Sanity
   - Modifiez `ArticlesSection.tsx`, `ArticleDetailPage.tsx`
   - Installez `@portabletext/react` pour le rendu du contenu

```bash
npm install @portabletext/react
```

```tsx
import { PortableText } from '@portabletext/react'

// Dans ArticleDetailPage
<PortableText value={article.content[i18n.language]} />
```

---

## 🚀 Commandes utiles

### Studio
```bash
cd studio
npm run dev          # Lancer le studio sur localhost:3333
npm run build        # Build du studio
npx sanity@latest schema deploy  # Déployer les schémas
```

### Frontend
```bash
npm run dev          # Lancer le site React
```

---

## 📚 Ressources

- **Sanity Studio** : http://localhost:3333
- **Documentation Sanity** : https://www.sanity.io/docs
- **GROQ Cheat Sheet** : https://www.sanity.io/docs/query-cheat-sheet
- **Portable Text** : https://github.com/portabletext/react-portabletext

---

## ⚠️ Important

1. **Ne supprimez pas encore** les fichiers dans `src/app/data/` - gardez-les comme référence pendant la migration
2. **Testez chaque section** avant de passer à la suivante
3. **Les images** doivent être uploadées dans Sanity Studio (elles ne peuvent pas pointer vers Unsplash)
4. **Le client peut modifier le contenu** sans toucher au code React

---

## 🎨 Prochaines étapes suggérées

1. Ajouter un composant de chargement global
2. Gérer le cache avec React Query ou SWR
3. Ajouter la prévisualisation en temps réel
4. Configurer les CORS pour le domaine de production
5. Activer CDN Sanity pour de meilleures performances
