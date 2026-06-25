🚀 Fatheali Landage Portfolio CMS

A modern full-stack portfolio platform with a secure admin dashboard, dynamic content management, Cloudinary media storage, and MongoDB-powered backend.

🌐 Live Demo

Portfolio: https://portfolio-plum-iota-82.vercel.app

📌 Overview

This project is a production-ready portfolio CMS that allows content management through an admin dashboard without modifying source code.

The platform supports:

- Dynamic project management
- Skills management
- Internship management
- Timeline management
- Certificates management
- Social links management
- Resume upload
- Profile image upload
- Secure admin authentication
- Cloudinary-powered media storage

---

🛠 Tech Stack

Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Axios

Backend

- Node.js
- Express.js
- JWT Authentication
- Multer

Database

- MongoDB Atlas
- Mongoose ODM

Cloud Services

- Cloudinary
- Render
- Vercel

---

✨ Features

Public Portfolio

- Responsive modern UI
- Dynamic portfolio content
- Resume download
- Project showcase
- Skills section
- Internship timeline
- Certifications section
- Contact information

Admin Dashboard

- Secure login authentication
- Manage projects
- Manage certificates
- Manage skills
- Manage internships
- Manage social links
- Manage timeline entries
- Upload profile picture
- Upload resume PDF

Media Management

- Cloudinary image storage
- Cloudinary PDF storage
- Persistent file hosting
- Automatic media URL generation

---

🔐 Authentication

The application uses:

- JWT-based authentication
- Protected admin routes
- Secure password hashing using bcrypt
- Role-based admin access

---

☁ Deployment Architecture

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

Media Storage → Cloudinary

---

📂 Project Structure

Portfolio/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── services/
│   └── package.json
│
└── README.md

🚀 Installation

Clone Repository

git clone https://github.com/fateali-landage/Portfolio.git
cd Portfolio

Backend Setup

cd backend
npm install
npm run dev

Frontend Setup

cd frontend
npm install
npm run dev

🔧 Environment Variables

Backend (.env)

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

---

📈 Key Achievements

- Built a complete MERN portfolio CMS
- Implemented secure JWT authentication
- Integrated MongoDB Atlas cloud database
- Migrated file storage to Cloudinary
- Deployed frontend on Vercel
- Deployed backend on Render
- Added dynamic admin content management
- Optimized portfolio loading with caching

---

👨‍💻 Author

Fatheali Landage

BCA Student (2026)

Frontend Developer | Python Learner | AI & Cybersecurity Enthusiast

GitHub: https://github.com/fateali-landage

LinkedIn: https://www.linkedin.com/in/fatealilandage

Email: fatealilandage@gmail.com

---

⭐ If you like this project, consider giving it a star on GitHub.
=======
# Portfolio CMS & Developer Portfolio

A production-grade, secure, and highly optimized developer portfolio and Content Management System (CMS) designed to showcase projects, skills, certificates, and achievements in a visually stunning interface.

## Project Structure

```text
portfolio/
├── backend/            # Express.js REST API with mongoose schemas, controllers, and seeding
├── frontend/           # React.js application styled with Tailwind CSS (Vite build system)
├── database/           # Auxiliary database seeders and scripts
└── docker-compose.yml  # Docker Compose config for local multi-container environments
```

---

## Installation & Local Setup

### 1. Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas cluster)
- **Cloudinary Account** (for asset uploads)

### 2. Backend Configuration

Navigate to the `backend/` directory, install dependencies, and set up your environment variables.

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` based on the provided `backend/.env.example`:

```env
# Admin Credentials (Required for database seeding only)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password_min_8_characters

# Database Configuration (Required)
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority

# Security (Required)
JWT_SECRET=your_secure_jwt_secret_key_at_least_32_chars

# Cloudinary Storage Configuration (Required)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Database Seeding

Seeding initializes your database collections (projects, skills, social links, certificates, timelines, internships) and registers the Admin login user.

> [!WARNING]
> Database seeding will clear any existing collections in the target database.

Run the seed script from the `backend/` directory:

```bash
npm run seed
```

Or from the root directory using the auxiliary seeder:

```bash
cd database
npm install
npm run seed
```

Seeding requires both `ADMIN_EMAIL` and `ADMIN_PASSWORD` to be set in the environment and validates that they meet formatting requirements.

### 4. Running the Backend Server

Start the backend server in development mode:

```bash
cd backend
npm run dev
```

The backend server runs on `http://localhost:5000` by default. It validates that all required runtime variables (`MONGO_URI`, `JWT_SECRET`, and Cloudinary variables) are configured before starting.

---

## Frontend Setup

Navigate to the `frontend/` directory, install dependencies, and run the development server.

```bash
cd frontend
npm install
npm run dev
```

The frontend application runs on `http://localhost:5173` (or `http://localhost:3000`).

---

## Deployment Guidelines

### Backend (Render Deployment)

1. Connect your GitHub repository to Render and create a **Web Service**.
2. Set the build command to `npm install` and start command to `node src/server.js` (or configure a start script).
3. Under **Environment Variables**, define:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `PORT=10000`
4. Add `ADMIN_EMAIL` and `ADMIN_PASSWORD` only if you plan to trigger database seeding.

### Frontend (Vercel Deployment)

1. Connect your repository to Vercel and create a new project targeting the `frontend/` directory.
2. Ensure Vercel uses the **Vite** build preset.
3. Configure the output directory to `dist`.
4. Deploy the project. The frontend communicates with the backend API automatically.

---

## Security Practices

- **Zero Hardcoded Secrets**: All keys, secrets, and admin credentials reside exclusively in environment variables and are never committed.
- **Git Safety**: The `.gitignore` configuration explicitly excludes all `.env` files and environment variants from version tracking.
- **Validation-First Seeding**: The seeding scripts perform strict format validation for the admin email and a length check for the admin password, preventing account creation with weak or missing parameters.
- **Independent Contact Email**: Public contact email (`settings.contactEmail`) is stored in the database and manageable through the CMS Dashboard, keeping it separate from the administrative account (`ADMIN_EMAIL`).
faebbbc (Refactor secret management and harden application security)

