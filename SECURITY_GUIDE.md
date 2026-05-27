# 🔒 Guide de Sécurité - Fichiers à Protéger

Ce guide liste tous les fichiers que vous devez **absolument sécuriser** pour ne pas exposer vos informations personnelles ou sensibles.

## ⚠️ Fichiers CRITIQUES à ne JAMAIS commiter

### 1. **Fichiers `.env` et variables d'environnement**
Ces fichiers contiennent vos clés API et secrets :

- ✅ `.env` - **DÉJÀ dans .gitignore** ✓
- ✅ `.env.local` - **DÉJÀ dans .gitignore** ✓
- ✅ `.env.development.local` - **DÉJÀ dans .gitignore** ✓
- ✅ `.env.production.local` - **DÉJÀ dans .gitignore** ✓
- ✅ `.env.test.local` - **DÉJÀ dans .gitignore** ✓

**⚠️ ATTENTION :** Votre projet utilise EmailJS et nécessite ces variables :
- `VITE_APP_EMAILJS_SERVICE_ID`
- `VITE_APP_EMAILJS_TEMPLATE_ID`
- `VITE_APP_EMAILJS_PUBLIC_KEY`

**Action requise :**
1. Créez un fichier `.env` à la racine du projet avec :
```env
VITE_APP_EMAILJS_SERVICE_ID=votre_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=votre_template_id
VITE_APP_EMAILJS_PUBLIC_KEY=votre_public_key
```

2. **NE COMMITEZ JAMAIS** ce fichier `.env` (il est déjà dans .gitignore)

### 2. **Fichiers de dépendances**
- ✅ `node_modules/` - **DÉJÀ dans .gitignore** ✓
- ✅ `package-lock.json` - Peut être commité (pas sensible)
- ✅ `package.json` - Peut être commité (pas sensible)

### 3. **Fichiers de build**
- ✅ `dist/` - **DÉJÀ dans .gitignore** ✓
- ✅ `build/` - **DÉJÀ dans .gitignore** ✓

### 4. **Fichiers système et éditeurs**
- ✅ `.DS_Store` (macOS) - **DÉJÀ dans .gitignore** ✓
- ✅ `.vscode/` - **DÉJÀ dans .gitignore** ✓
- ✅ `.idea/` - **DÉJÀ dans .gitignore** ✓

## 📋 Fichiers à VÉRIFIER avant de commiter

### 1. **Fichiers de configuration personnels**
Vérifiez que ces fichiers ne contiennent pas d'informations sensibles :

- `src/constants/index.js` - Vérifiez les liens GitHub/LinkedIn
- `src/pages/Contact.jsx` - Utilise des variables d'environnement (✅ OK)
- Tous les fichiers `.jsx` et `.js` - Vérifiez qu'il n'y a pas de clés API hardcodées

### 2. **Fichiers de log**
- ✅ Tous les fichiers `*.log` - **DÉJÀ dans .gitignore** ✓

## ✅ Votre .gitignore est déjà bien configuré !

Votre fichier `.gitignore` couvre déjà tous les fichiers sensibles principaux. C'est excellent ! 👍

## 🛡️ Bonnes pratiques de sécurité

### 1. **Vérifiez avant chaque commit**
```bash
git status
```
Assurez-vous qu'aucun fichier `.env` n'apparaît dans la liste.

### 2. **Si vous avez accidentellement commité un fichier sensible**
Si vous avez déjà commité un fichier `.env` par erreur :

```bash
# Retirer le fichier de Git (mais le garder localement)
git rm --cached .env

# Commit la suppression
git commit -m "Remove sensitive .env file"

# Si vous avez déjà push, vous devrez forcer le push
# ⚠️ ATTENTION : Cela réécrit l'historique Git
git push --force
```

### 3. **Créez un fichier .env.example**
Créez un fichier `.env.example` (qui peut être commité) pour documenter les variables nécessaires :

```env
# EmailJS Configuration
VITE_APP_EMAILJS_SERVICE_ID=your_service_id_here
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 4. **Ne hardcodez JAMAIS de secrets dans le code**
❌ **MAUVAIS :**
```javascript
const API_KEY = "sk_live_1234567890abcdef";
```

✅ **BON :**
```javascript
const API_KEY = import.meta.env.VITE_APP_API_KEY;
```

## 🔍 Comment vérifier si vous avez des secrets dans votre code

Recherchez dans votre code :
- Mots-clés : `password`, `secret`, `key`, `token`, `api`, `auth`
- Patterns : `sk_`, `pk_`, `AIza`, `ghp_` (exemples de préfixes de clés API)

## 📝 Checklist avant de publier sur GitHub

- [ ] Aucun fichier `.env` dans le dépôt
- [ ] Aucune clé API hardcodée dans le code
- [ ] Tous les secrets sont dans des variables d'environnement
- [ ] Le fichier `.gitignore` est à jour
- [ ] Vous avez testé que le projet fonctionne avec les variables d'environnement

## 🆘 En cas de problème

Si vous avez accidentellement exposé des clés API :

1. **Régénérez immédiatement** toutes les clés exposées
2. **Retirez** le fichier du dépôt Git (voir section ci-dessus)
3. **Vérifiez** l'historique Git pour voir si d'autres commits contiennent des secrets

---

**Rappel important :** Une fois qu'un secret est commité dans Git, même si vous le supprimez ensuite, il reste dans l'historique Git. C'est pourquoi il est crucial de vérifier AVANT de commiter.

