# Task Manager

Application web de gestion de tâches avec API REST.

## Auteurs

- Keylian Turbe
- Romain Siame

## Prérequis

- Node.js (v24.11.1 ou supérieur)
- npm (v11.6.2 ou supérieur)
- MariaDB ou MySQL

## Installation

Clonez le dépôt :

```bash
git clone https://github.com/keylian15/Erreur_de_parcours.git
cd Erreur_de_parcours
```

Configurez l'environnement :

```bash
cp backend/.env.example backend/.env
```

Installez les dépendances et initialisez la base de données :

```bash
npm install
npm run db
```

## Si un problème survient

Executez les commandes suivantes:  

```bash
cd frontend
npm install
cd ../backend 
npm install
cd ..
```

Puis coller le contenu du fichier `backend\src\database\schema.sql` dans votre bdd.

## Démarrage

```bash
npm run dev
```

L'API sera accessible sur `http://localhost:3000`

## Documentation

La documentation Swagger est disponible sur : `http://localhost:3000/api-docs`

## Architecture du projet

```
Erreur_de_parcours/
├── backend/
│   ├── app.js              # Point d'entrée de l'application
│   ├── server.js           # Chargement des variables d'environnement
│   ├── docs/               # Documentation Swagger
│   ├── api-collection/     # Collection Bruno pour tester l'API
│   └── src/
│       ├── config/         # Configuration (BDD et Swagger)
│       ├── controllers/    # Logique métier (utilisateurs et tâches)
│       ├── database/       # Script de création de la BDD
│       ├── middlewares/    # Middlewares (authentification)
│       └── routes/         # Définition des routes
│
└── frontend/
    └── src/
        ├── App.vue         # Point d'entrée
        ├── components/     # Composants réutilisables
        ├── router/         # Configuration des routes
        └── views/          # Pages de l'application
```
