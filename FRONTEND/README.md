# **RNA FRONTEND**  

## **📦 Installation**  

Assurez-vous d'avoir [Node.js](https://nodejs.org/) (v18 ou supérieure) installé.  

1. **Cloner le dépôt**  
   ```sh
   git clone https://github.com/GroupeRNA/frontend-save.git
   ```
    **Copier et coller les deux commande suivants dans votre terminale pour accéder au projet **  
   ```sh
   cd frontend-save
   ```
   ```sh
    cd FRONTEND
   ```

2. **Installer les dépendances nécessaires**  
   ```sh
   npm install
   ```

3. **Lancer l'environnement de développement**  
   ```sh
   npm run dev
   ```
   L'application sera disponible sur [http://localhost:5173](http://localhost:5173).  

---


# Plateforme de Transcription Audio

Une application de transcription audio avec authentification utilisateur, utilisant Whisper (OpenAI) pour la transcription.

## Fonctionnalités

### 1. Gestion des Utilisateurs (Auth)
- **Inscription** : Création d'un compte utilisateur
- **Connexion** : Authentification avec génération de token JWT

### 2. Gestion des Audios
- **Upload d'un audio** : Enregistrement d'un fichier audio avec un titre
- **Liste des audios** : Récupération de tous les enregistrements audio
- **Récupérer un audio par utilisateur** : Obtenir l'audio lié à l'utilisateur connecté
- **Supprimer un audio** : Suppression d'un enregistrement audio

### 3. Gestion des Transcriptions
- **Créer une transcription** : Utilise Whisper (OpenAI) pour transcrire un audio en texte
- **Lister toutes les transcriptions** : Affiche toutes les transcriptions disponibles
- **Obtenir une transcription** : Récupère une transcription spécifique par son ID
- **Mettre à jour une transcription** : Modification du titre ou du texte
- **Supprimer une transcription** : Suppression d'une transcription

## API Endpoints

### Authentification
| Méthode | Endpoint    | Description                                  |
|---------|-------------|----------------------------------------------|
| POST    | `/register` | Crée un nouvel utilisateur                   |
| POST    | `/login`    | Connecte un utilisateur et retourne un token JWT |

### Gestion des Audios (Requiert Authentification)
| Méthode | Endpoint                   | Description                                  |
|---------|----------------------------|----------------------------------------------|
| POST    | `/create_audio/`           | Upload un fichier audio                      |
| GET     | `/list_audio/`             | Liste tous les audios                        |
| GET     | `/get_audio_by_user/`      | Récupère l'audio de l'utilisateur connecté   |
| DELETE  | `/delete_audio/<audio_id>/`| Supprime un audio spécifique                 |

### Gestion des Transcriptions (Requiert Authentification)
| Méthode | Endpoint                               | Description                                  |
|---------|----------------------------------------|----------------------------------------------|
| POST    | `/create_transcription/`               | Crée une transcription depuis un audio       |
| GET     | `/list_transcription/`                 | Liste toutes les transcriptions              |
| GET     | `/get_transcription/<transcription_id>/` | Récupère une transcription spécifique      |
| PUT     | `/update_transcription/<transcription_id>/` | Met à jour une transcription            |
| DELETE  | `/delete_transcription/<transcription_id>/` | Supprime une transcription            |

## Schéma de la Base de Données

### User
- `id` (PK)
- `user_name`
- `user_mail`
- `user_password`

### Audio
- `audio_id` (PK)
- `file`
- `audio_title`
- `uploaded_at`
- `user` (FK → User)

### Transcription
- `transcription_id` (PK)
- `text`
- `created_at`
- `transcription_title`
- `audio` (FK → Audio)


