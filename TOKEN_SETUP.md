# 🔑 Guide de Configuration du Token API Sanity

## Étape 1 : Créer un Token API

1. **Ouvrez la console Sanity** :
   ```bash
   cd studio
   npx sanity manage
   ```
   
   Ou allez directement sur : https://www.sanity.io/manage/project/btjdqrld

2. **Naviguez vers "API" → "Tokens"** dans le menu de gauche

3. **Cliquez sur "Add API token"**

4. **Configurez le token** :
   - **Name** : `Migration Script` (ou le nom de votre choix)
   - **Permissions** : Sélectionnez **"Editor"**
   - **Laissez les autres options par défaut**

5. **Cliquez sur "Add token"**

6. **IMPORTANT : Copiez le token immédiatement !** 
   Il ne sera affiché qu'une seule fois.

---

## Étape 2 : Ajouter le Token au fichier .env

1. **Ouvrez le fichier `.env`** à la racine du projet

2. **Remplacez `VOTRE_TOKEN_ICI`** par le token que vous venez de copier :

   ```env
   SANITY_WRITE_TOKEN=skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

3. **Sauvegardez le fichier**

---

## Étape 3 : Lancer la Migration

```bash
npm run migrate
```

Cela va créer automatiquement dans Sanity :
- ✅ Tous les services (Gérance, Villa, Entreprise, Commune)
- ✅ Tous les membres de l'équipe
- ✅ Tous les articles de blog
- ✅ Le document Settings

---

## ⚠️ Important : Sécurité

- ❌ **NE JAMAIS commiter le fichier `.env` sur Git**
- ❌ **NE JAMAIS partager votre token publiquement**
- ✅ Le fichier `.env` est déjà dans `.gitignore`
- ✅ Utilisez `.env.example` comme modèle sans valeurs sensibles

---

## 🎯 Après la Migration

1. **Vérifiez les données** sur http://localhost:3333

2. **Uploadez les images manuellement** :
   - Les URLs externes (Unsplash) ne fonctionneront pas en production
   - Allez dans chaque document et uploadez les images

3. **Testez le frontend** :
   ```bash
   npm run dev
   ```

4. **Utilisez les nouveaux composants Sanity** dans vos pages React

---

## 🆘 En cas de problème

### Token invalide ?
- Vérifiez que le token est bien copié dans `.env`
- Assurez-vous qu'il n'y a pas d'espaces avant/après
- Le token doit commencer par `sk`

### Permission insuffisante ?
- Créez un nouveau token avec les permissions "Editor" ou "Administrator"

### Documents déjà existants ?
- Si vous relancez la migration, vous aurez des doublons
- Pour nettoyer : allez sur le Studio et supprimez les documents en trop
