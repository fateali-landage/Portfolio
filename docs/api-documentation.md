# REST API Documentation

This document describes the REST API endpoints available in the portfolio backend.

## Base URL
All API requests should be sent to:
`http://localhost:5000/api`

---

## Authentication Endpoints

### 1. Admin Login
- **Endpoint:** `POST /auth/login`
- **Access:** Public
- **Description:** Authenticates the admin user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "admin@example.com",
    "password": "admin_password"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "email": "admin@example.com",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### 2. Admin Logout
- **Endpoint:** `POST /auth/logout`
- **Access:** Public
- **Description:** Ends session. (Stateless client token destruction).
- **Response (200 OK):**
  ```json
  {
    "message": "Successfully logged out"
  }
  ```

### 3. Get Profile
- **Endpoint:** `GET /auth/profile`
- **Access:** Private (Admin Only)
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Validates token and returns admin info.
- **Response (200 OK):**
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "email": "admin@example.com",
    "role": "admin"
  }
  ```

---

## Projects Endpoints

### 1. Get All Projects
- **Endpoint:** `GET /projects`
- **Access:** Public
- **Description:** Returns all projects in the database.
- **Response (200 OK):**
  ```json
  [
    {
      "_id": "60d0fe4f5311236168a109cb",
      "title": "Batman Theme Navigation",
      "description": "A dark themed dynamic navigator.",
      "image": "/b-navigation.png",
      "githubUrl": "https://github.com/...",
      "demoUrl": "https://...",
      "technologies": ["HTML", "CSS", "JS"],
      "createdAt": "2026-06-15T19:54:25.000Z"
    }
  ]
  ```

### 2. Create Project
- **Endpoint:** `POST /projects`
- **Access:** Private (Admin Only)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "title": "Project Title",
    "description": "Project Description",
    "image": "/path/or/url.png",
    "githubUrl": "https://github.com/...",
    "demoUrl": "https://...",
    "technologies": ["React", "Tailwind"]
  }
  ```
- **Response (201 Created):** Returns the saved project object.

### 3. Update Project
- **Endpoint:** `PUT /projects/:id`
- **Access:** Private (Admin Only)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** Any subset of fields listed in Create Project.
- **Response (200 OK):** Returns the updated project object.

### 4. Delete Project
- **Endpoint:** `DELETE /projects/:id`
- **Access:** Private (Admin Only)
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):**
  ```json
  {
    "message": "Project removed successfully"
  }
  ```

---

## Certificates Endpoints

### 1. Get All Certificates
- **Endpoint:** `GET /certificates`
- **Access:** Public

### 2. Create Certificate
- **Endpoint:** `POST /certificates`
- **Access:** Private (Admin Only)
- **Request Body:**
  ```json
  {
    "title": "Full Stack Dev Certificate",
    "issuer": "Udemy",
    "issueDate": "December 2025",
    "image": "/cert.png"
  }
  ```

### 3. Update Certificate
- **Endpoint:** `PUT /certificates/:id`
- **Access:** Private (Admin Only)

### 4. Delete Certificate
- **Endpoint:** `DELETE /certificates/:id`
- **Access:** Private (Admin Only)

---

## Skills Endpoints

### 1. Get All Skills
- **Endpoint:** `GET /skills`
- **Access:** Public

### 2. Create Skill
- **Endpoint:** `POST /skills`
- **Access:** Private (Admin Only)
- **Request Body:**
  ```json
  {
    "name": "JavaScript",
    "category": "frontend",
    "level": 90,
    "color": "#F7DF1E"
  }
  ```

### 3. Update Skill
- **Endpoint:** `PUT /skills/:id`
- **Access:** Private (Admin Only)

### 4. Delete Skill
- **Endpoint:** `DELETE /skills/:id`
- **Access:** Private (Admin Only)

---

## Social Links Endpoints

### 1. Get All Socials
- **Endpoint:** `GET /social-links`
- **Access:** Public

### 2. Create Social Link
- **Endpoint:** `POST /social-links`
- **Access:** Private (Admin Only)
- **Request Body:**
  ```json
  {
    "platform": "GitHub",
    "url": "https://github.com/...",
    "value": "github.com/username"
  }
  ```

### 3. Update Social Link
- **Endpoint:** `PUT /social-links/:id`
- **Access:** Private (Admin Only)

### 4. Delete Social Link
- **Endpoint:** `DELETE /social-links/:id`
- **Access:** Private (Admin Only)
