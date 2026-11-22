# IdeaVault – Startup Idea Sharing Platform

IdeaVault is a web-based platform where users can share startup ideas, explore ideas from others, and interact with the startup community.

The platform allows users to publish their ideas, discover interesting projects, and connect with other people through likes and comments.

## Features

- User registration and login with Firebase Authentication
- Browse and explore startup ideas
- Search and filter ideas
- View detailed information about startup ideas
- Add new startup ideas
- Edit and delete your own ideas
- Like and unlike ideas
- Add, edit, and delete comments
- View your own ideas and interactions
- Trending ideas section
- Responsive user interface
- Budget display in Bangladeshi Taka (BDT)

## Technologies Used

**Frontend:**
- React
- Vite
- Tailwind CSS
- DaisyUI
- React Router
- Firebase Authentication
- Lucide React
- React Toastify

**Backend integration:**
- REST API
- Node.js and Express.js
- MongoDB

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/tasnimnova-28/IdeaVault-Client.git
```

### 2. Navigate to the project directory

```bash
cd IdeaVault-Client
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a file named `.env.local` in the client root directory.

Add your Firebase configuration and backend API URL:

```env
VITE_API_URL=http://localhost:5000/api

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Replace the placeholder values with your own Firebase project configuration.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal to view the application.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the application for production |
| `npm run preview` | Previews the production build |
| `npm run lint` | Runs ESLint |

## Backend Requirements

IdeaVault requires its backend server and MongoDB database to be running for API-based features to work.

Make sure the backend is configured and running before using the application.

## Authentication

Firebase Authentication is used for user registration and login. Protected API operations use Firebase ID tokens for authentication and authorization.

## Author

**IdeaVault – Startup Idea Sharing Platform**

Developed as a course project.