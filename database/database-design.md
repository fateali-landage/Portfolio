# Database Design

This document specifies the MongoDB collections and Mongoose schemas used by the portfolio backend.

## Entity Relationship Diagrams & Models

```
 ┌──────────────┐       ┌─────────────────┐       ┌─────────────────┐
 │    Users     │       │    Projects     │       │  Certificates   │
 ├──────────────┤       ├─────────────────┤       ├─────────────────┤
 │ email        │       │ title           │       │ title           │
 │ password     │       │ description     │       │ issuer          │
 │ role         │       │ image           │       │ issueDate       │
 └──────────────┘       │ githubUrl       │       │ image           │
                        │ demoUrl         │       └─────────────────┘
                        │ technologies[]  │
                        └─────────────────┘

 ┌──────────────┐       ┌─────────────────┐
 │    Skills    │       │  Social Links   │
 ├──────────────┤       ├─────────────────┤
 │ name         │       │ platform        │
 │ category     │       │ url             │
 │ level        │       │ value           │
 │ color        │       └─────────────────┘
 └──────────────┘
```

---

## Mongoose Schema Layouts

### 1. User
- **Collection Name:** `users`
- **Fields:**
  - `email` (String, required, unique, lowercase, trimmed)
  - `password` (String, required, min length 6, hashed with bcrypt)
  - `role` (String, enum: `['admin']`, default: `'admin'`)

### 2. Project
- **Collection Name:** `projects`
- **Fields:**
  - `title` (String, required, trimmed)
  - `description` (String, required)
  - `image` (String, default: null)
  - `githubUrl` (String, required, URL trimmed)
  - `demoUrl` (String, required, URL trimmed)
  - `technologies` (Array of Strings, required)

### 3. Certificate
- **Collection Name:** `certificates`
- **Fields:**
  - `title` (String, required, trimmed)
  - `issuer` (String, required, trimmed)
  - `issueDate` (String, required)
  - `image` (String, default: null)

### 4. Skill
- **Collection Name:** `skills`
- **Fields:**
  - `name` (String, required, trimmed)
  - `category` (String, required, enum: `['frontend', 'backend', 'tools']`)
  - `level` (Number, default: 80, range 0-100)
  - `color` (String, default: `#ffffff`)

### 5. Social Link
- **Collection Name:** `socials`
- **Fields:**
  - `platform` (String, required, trimmed)
  - `url` (String, required, trimmed)
  - `value` (String, required, trimmed)
