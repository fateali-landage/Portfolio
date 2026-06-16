# Deployment Guide

Follow these steps to deploy the portfolio project to production.

---

## 1. Database Setup: MongoDB Atlas

1. Sign up/log in at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new project and provision a free **M0 Sandbox Cluster**.
3. Under **Network Access**, add IP address `0.0.0.0/0` (to allow access from hosting platforms).
4. Under **Database Access**, create a user with read/write roles.
5. Go to your cluster dashboard, click **Connect**, select **Drivers**, and copy the connection string.
   - Example: `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/portfolio?retryWrites=true&w=majority`

---

## 2. Backend Deployment: Render or Railway

### Deploying to Render
1. Push your codebase to a GitHub repository.
2. Sign in to [Render](https://render.com) and click **New > Web Service**.
3. Link your GitHub repository.
4. Set the following parameters:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node src/server.js`
5. Click **Advanced** and add these Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A long, random cryptographic string.
   - `JWT_EXPIRE`: `30d`
   - `NODE_ENV`: `production`
   - `ADMIN_EMAIL`: Your secure admin email address.
   - `ADMIN_PASSWORD`: Your secure admin password.
6. Deploy the web service. Note the live URL (e.g. `https://portfolio-backend.onrender.com`).

---

## 3. Frontend Deployment: Vercel

1. Install Vercel CLI globally or use the Vercel Dashboard at [Vercel](https://vercel.com).
2. If using the Vercel Dashboard, select **Add New > Project**, link your GitHub repo.
3. In the project settings, configure:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add the following Environment Variable:
   - `VITE_API_URL`: Your live backend API URL (e.g. `https://portfolio-backend.onrender.com/api`).
5. Click **Deploy**. Vercel will build and serve your static single page app with push-state routing fallbacks as configured in `vercel.json`.
