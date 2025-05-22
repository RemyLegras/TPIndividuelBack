# TPIndividuelBack

## Lancer l’API Node.js

### Prérequis
- Node.js installé
- MongoDB en fonctionnement (local ou distant)
- Créer un fichier `.env` à la racine avec la variable `JWT_SECRET`

### Installation

1. Installe les dépendances :
npm install

2. Configure la base de données dans `app.js` si besoin.

3. Lance le serveur :
npm start

4. L’API sera accessible sur [http://localhost:8080](http://localhost:8080)

### Remarques

- Les routes principales sont :
  - `/users` pour la gestion des utilisateurs
  - `/publication` pour la gestion des publications
- Les fichiers uploadés sont stockés dans le dossier `uploads/`
- Le frontend doit pointer sur `http://localhost:8080` pour les requêtes API