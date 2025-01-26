Rental Notification API
Description
Ce projet implémente une API backend pour une entreprise de location de films. Elle inclut la gestion des clients, des locations, et des notifications automatiques pour rappeler aux clients leurs échéances de retour.

Installation
Cloner le dépôt :

bash
Copier
Modifier
git clone git@github.com:shartiniquais/Rental-Notification-API.git
cd rental-notification
Installer les dépendances :

bash
Copier
Modifier
npm install
Configurer la base de données :

Créez une base PostgreSQL nommée sakila.
Importez les fichiers SQL dans le dossier sql/ :
bash
Copier
Modifier
psql -U postgres -d sakila -f sql/new schema.sql
psql -U postgres -d sakila -f sql/new data.sql
Configurer le fichier .env : Ajoutez vos informations de base de données :

env
Copier
Modifier
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=sakila
Lancer l'application :

bash
Copier
Modifier
npm run start:dev
Fonctionnalités
Gestion des clients :

Ajouter ou modifier un client.
Vérifier l'existence d'un client par email.
Gestion des locations :

Ajouter une location pour un client.
Vérifier si une location a été notifiée (J-5, J-3).
Notifications planifiées :

Tâches automatiques pour envoyer des notifications à J-5 et J-3.
Envoyer des notifications manuellement pour un client spécifique.
API :

Tester et lister les tâches planifiées.
Afficher l'état des notifications par email.
Journal de bord
Voici les étapes suivies pour développer ce projet :

Découverte de l'exercice
Inspection du site pour trouver un commentaire contenant un token JWT.
Décodage du token pour trouver un code d'accès à l'exercice.
Récupération de l'exercice via une URL construite avec le code.
Mise en place du projet
Création d'une base sakila PostgreSQL et importation des schémas et données.
Initialisation d'un projet NestJS avec TypeORM et le module @nestjs/schedule pour les tâches planifiées.
Configuration des entités Customer, Film, et Rental.
Développement des fonctionnalités
Gestion des clients :

Ajout d'une API pour créer ou modifier un client.
Validation des données avec DTO et ValidationPipe.
Gestion des locations :

Ajout d'une API pour créer une location.
Modification du schéma pour inclure des colonnes is_notified_j5, is_notified_j3, etc.
Notifications :

Ajout de tâches planifiées pour envoyer des notifications automatiques.
API pour envoyer des notifications manuelles à un client spécifique.
Tests :

Utilisation de Postman pour vérifier chaque route.
Validation des données avec DTO.