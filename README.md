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
