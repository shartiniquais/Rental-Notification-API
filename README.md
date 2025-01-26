# Rental Notification API
## Description
Ce projet implémente une API backend pour une entreprise de location de films. Elle inclut la gestion des clients, des locations, et des notifications automatiques pour rappeler aux clients leurs échéances de retour.

## Installation

### Cloner le dépôt :

```
git clone git@github.com:shartiniquais/Rental-Notification-API.git
cd rental-notification
```

## Installer les dépendances :
```
npm install
```

## Configurer la base de données :

Créez une base PostgreSQL nommée sakila.
Importez les fichiers SQL dans le dossier sql/ :
```
psql -U postgres -d sakila -f sql/new schema.sql
psql -U postgres -d sakila -f sql/new data.sql
```
## Configurer le fichier .env : 
Ajoutez vos informations de base de données :
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=sakila
```

## Lancer l'application :
```
npm run start:dev
```

## Fonctionnalités
### Gestion des clients :

* Ajouter ou modifier un client.
* Vérifier l'existence d'un client par email.

### Gestion des locations :

* Ajouter une location pour un client.
* Vérifier si une location a été notifiée (J-5, J-3).

### Notifications planifiées :

* Tâches automatiques pour envoyer des notifications à J-5 et J-3.
* Envoyer des notifications manuellement pour un client spécifique.

### API :

* Tester et lister les tâches planifiées.
* Afficher l'état des notifications par email.

---
---

# Journal de bord
### Étape 1 : Découverte de l'exercice
1. J'ai inspecté l'élément de la page donnée et ai trouvé un commentaire bizarre :
```
<!--
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.Vm9pY2kgbGUgY29kZSBkJ2FjY8OocyA9PiA5MzRiMWVlNS00YzczLTRkM2QtOTNiOS0zY2NiYmY5NjRlOWQsIHR1IGRvaXMgbWFpbnRlbmFudCByw6ljdXDDqXJlciBsJ2V4ZXJjaWNlIMOgIHBhcnRpciBkZSBjZSBjb2RlIGQnYWNjw6hzIChJbmRpY2U6IHBhcmFtcyk.zNNOb1ObZvdCA-yyvMplMn_D1tuLh1o6n0tnwwocHgg
-->
```
Ça ressemble à un web token JSON.

2. J'utilise jwt.io pour le "traduire" et j'ai ce message :
>Voici le code d'accès => 934b1ee5-4c73-4d3d-93b9-3ccbbf964e9d, tu dois maintenant récupérer l'exercice à partir de ce code d'accès (Indice: params).

3. Je teste d'ajouter le code à l'URL de l'exercice : https://djob-website-test.nw.r.appspot.com/934b1ee5-4c73-4d3d-93b9-3ccbbf964e9d, ça marche.

4. L'exercice est affiché:
---
## ***Bien joué, t'as réussi à afficher l'exercice***
### ***Contexte***
En tant que développeur backend dans une entreprise de location de films, nous voulons améliorer la gestion des retours en rappelant aux clients la date d'échéance de leur location.
    
### Objectif
    
Afin de rappeler aux clients la date d'échéance de leur location et d'éviter les retards, nous souhaitons mettre en place un système de tâches planifiées qui enverrait des notifications par email à J-5 (à 12h) et J-3 (à 12h) avant la date de retour pour chaque location. Implémentez un service de planification qui utilise les fuseaux horaires des clients pour envoyer des notifications aux moments appropriés.
      
### Pré-requis fonctionnels
    
1. Un client (Customer) a la possibilité d'effectuer des locations (Rental) de films.
2. Chaque location est représentée par une date de début et une date de retour, qui peuvent être choisies par le client.
3. La durée d'une location est d'au minimum 1 semaine et ne doit pas excéder 3 semaines.
4. Les dates de début et de retour des locations sont définies en fonction du fuseau horaire (timezone) du client (les tables doivent être modifiées en conséquence).
5. Une location en cours n'est pas modifiable.
    
    
### Pré-requis techniques
    
1. Installer la base de données "Sakila" en version PostgreSQL disponible sur ce lien : https://github.com/jOOQ/sakila/tree/main/postgres-sakila-db (installer schéma + données).
2. Initialiser un projet NestJS avec les entités Customer, Film et Rental (en utilisant TypeORM ou Prisma).
3. Deux tâches planifiées doivent être mises en place :
  - Une tâche planifiée qui envoie un email à J-5 à 12h00 avant la date de retour de chaque location.
  - Une tâche planifiée qui envoie un email à J-3 à 12h00 avant la date de retour de chaque location.
4. Créer une API permettant de :
  - Ajouter/Modifier un client.
  - Effectuer une location.
  - Lister toutes les tâches planifiées.
  - Lancer une tâche planifiée manuellement.
  - Vérifier l'état d'exécution d'une tâche planifiée.
5. Tips :
  - La modification du schéma actuel de "Sakila" est autorisée.
  - Utiliser le package `@nestjs/schedule` pour gérer les tâches planifiées.
  - Le service de mail peut être simulé par une simple log  
---

### Étape 2 : Mise en place du projet
5. Je crée un dossier et j'ouvre VSCode pour commencer :
```
git clone https://github.com/jOOQ/sakila.git
cd sakila/postgres-sakila-db
```
6. Je crée une base de données sakila:
```
psql -U postgres
CREATE DATABASE sakila;
```
7. J'importe le schéma et les données :
```
psql -U postgres -d sakila -f postgres-sakila-schema.sql
psql -U postgres -d sakila -f postgres-sakila-insert-data.sql
```
8. J'installe Node.js et npm, car ils ne sont pas installés sur mon ordinateur.
9. Je crée un nouveau projet NestJS :
```
npm i -g @nestjs/cli
nest new rental-notification
cd rental-notification
```
10. Pour la base de données avec TypeORM :
```
npm install @nestjs/typeorm typeorm pg
```
11. Pour gérer les tâches planifiées :
```
npm install @nestjs/schedule
npm install --save-dev @types/node
```

### Étape 3 : Développement des fonctionnalités

12. Configuration des entités :
    * Création des fichiers customer.entity.ts, film.entity.ts et rental.entity.ts
    * Ajout des colonnes is_notified_j5, is_notified_j3, start_date, et due_date dans la table rental.
13. Gestion des notifications :
    * Ajout d'un service notification.service.ts pour gérer les notifications.
    * Implémentation de la gestion des fuseaux horaires avec moment-timezone.
14. Création des routes :
    * Ajout des routes pour :
      * Créer ou modifier un client.
      * Ajouter une location.
      * Tester les notifications planifiées

### Étape 4 : Tests et validation

15. Tests avec Postman :
    * Vérification des routes avec différentes données.
    * Ajout des en-têtes nécessaires (Content-Type: application/json).
16. Améliorations :
    * Ajout de DTOs pour valider les données.
    * Ajout de routes pour lister les tâches planifiées et vérifier les notifications d'un client.
---
## Résumé des routes principales
### Gestion des clients :
* **POST** */customers* : Ajouter ou modifier un client.
### Gestion des locations :
* **POST** */rentals* : Ajouter une location.
### Notifications :
* **GET** */notifications/planned-tasks* : Lister toutes les tâches planifiées.
* **GET** */notifications/send-by-email* : Envoyer une notification à un client spécifique.
* **GET** */notifications/status* : Vérifier les notifications d'un client.
---
## Notes
1. La base de données PostgreSQL doit être configurée correctement avant de lancer l'application.
2. Le service de mail est simulé par des logs dans la console.
3. Les tâches planifiées utilisent le fuseau horaire des clients pour les notifications à J-5 et J-3.












