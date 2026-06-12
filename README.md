# Lumely Radiance - Site e-commerce de cosmétiques 


## Présentation

Lumely Radiance est une application web e-commerce dédiée à la vente de cosmétiques de luxe.  
Le projet évolue d'un site vitrine statique vers une application dynamique complète avec gestion des utilisateurs et des commandes en base de données.

**Site en ligne (version statique) :** https://fatoumata-w.github.io/LumelyRadiance/  
**Dépôt GitHub :** https://github.com/Fatoumata-w/LumelyRadiance

---

## Fonctionnalités

- Catalogue de 8 produits cosmétiques
- Panier dynamique (ajout, suppression, modification des quantités)
- Simulation de paiement sécurisé
- Inscription et connexion utilisateur (mot de passe hashé)
- Enregistrement des commandes en base de données MySQL
- Historique des commandes par utilisateur
- Formulaire de contact
- Design responsive (mobile et desktop)

---

## Technologies utilisées

| Côté | Technologies |
|------|-------------|
| Front-end | HTML5, CSS3, JavaScript |
| Back-end | PHP 8 |
| Base de données | MySQL (phpMyAdmin) |
| Versioning | Git / GitHub |
| Hébergement statique | GitHub Pages |
| Environnement local | WAMP |

---

## Structure des fichiers

```
LumelyRadiance/
├── index.html        → Version statique (GitHub Pages)
├── index.php         → Version dynamique avec sessions PHP
├── inscription.php   → Création de compte utilisateur
├── connexion.php     → Authentification utilisateur
├── deconnexion.php   → Destruction de session
├── commandes.php     → Historique des commandes
├── commander.php     → Enregistrement commande en BDD (AJAX)
├── config.php        → Connexion à la base de données
├── database.sql      → Script de création des tables MySQL
├── style.css         → Feuille de style complète
├── panier.js         → Gestion du panier et paiement
└── images/           → Visuels des produits
```

---

## Base de données

Le script `database.sql` crée les tables suivantes :

- **utilisateurs** : stocke les comptes (id, prénom, email, mot de passe hashé)
- **produits** : catalogue des 8 produits (nom, description, prix, image)
- **commandes** : historique des achats (id, utilisateur, total, date)

---

## Installation en local (WAMP)

1. Copier le dossier dans `C:\wamp64\www\LumelyRadiance\`
2. Ouvrir **phpMyAdmin** → créer une base `lumely`
3. Importer le fichier `database.sql`
4. Ouvrir dans le navigateur : `http://localhost/LumelyRadiance/`

---

## Choix techniques

**Pourquoi deux versions (HTML et PHP) ?**  
GitHub Pages ne supporte pas PHP. Le fichier `index.html` est conservé pour l'hébergement en ligne, tandis que `index.php` est utilisé en local avec WAMP pour démontrer les fonctionnalités dynamiques.

**Sécurité**  
Les mots de passe sont hashés avec `password_hash()` (PHP). Les données utilisateur sont échappées avec `htmlspecialchars()` pour éviter les injections XSS. Les requêtes SQL utilisent des requêtes préparées (PDO) pour prévenir les injections SQL.

---

## Auteur

**Fatoumata Batouly BA**  
Étudiante en BTS SIO option SLAM — 2ème année  
GitHub : https://github.com/Fatoumata-w  

