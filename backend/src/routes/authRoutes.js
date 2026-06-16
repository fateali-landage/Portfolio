import express from 'express'
import { login, logout, getProfile } from '../controllers/authController.js'
import { loginValidator } from '../validations/validators.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', loginValidator, login)
router.post('/logout', logout)
router.get('/profile', protectAdmin, getProfile)

export default router
