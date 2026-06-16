import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import connectDB from './config/db.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// Route Imports
import authRoutes from './routes/authRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import certificateRoutes from './routes/certificateRoutes.js'
import skillRoutes from './routes/skillRoutes.js'
import socialRoutes from './routes/socialRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import timelineRoutes from './routes/timelineRoutes.js'
import internshipRoutes from './routes/internshipRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load Environment Variables
dotenv.config()

// Connect to database
connectDB()

const app = express()

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))

// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://portfolio-plum-iota-82.vercel.app'
  ],
  credentials: true
}))

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests from this IP, please try again after 15 minutes.' }
})
app.use('/api/', apiLimiter)

// Parse JSON request body
app.use(express.json())

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Base URL welcome message
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running...' })
})

// Route Mappings
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/certificates', certificateRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/social-links', socialRoutes)
app.use('/api/socials', socialRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/timeline', timelineRoutes)
app.use('/api/internships', internshipRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/resume', resumeRoutes)

// Error Handling Middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
})
