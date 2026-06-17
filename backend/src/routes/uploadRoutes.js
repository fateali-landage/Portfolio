import express from 'express'
import { protectAdmin } from '../middleware/authMiddleware.js'
import { uploadImage, uploadResume, uploadFavicon } from '../middleware/uploadMiddleware.js'
import { uploadImageController, uploadFaviconController } from '../controllers/uploadController.js'
import { uploadResumeController } from '../controllers/resumeController.js'
import { getSettings, updateSettings } from '../controllers/settingsController.js'

const router = express.Router()

// Endpoint to upload a single project/certificate/profile image
router.post('/image', protectAdmin, uploadImage.single('image'), uploadImageController)

// Endpoint to upload a favicon
router.post('/favicon', protectAdmin, uploadFavicon.single('favicon'), uploadFaviconController)

// Endpoint to upload a resume PDF
router.post('/resume', protectAdmin, uploadResume.single('resume'), uploadResumeController)

// Public endpoint to retrieve global settings
router.get('/settings', getSettings)

// Private endpoint to update global settings
router.put('/settings', protectAdmin, updateSettings)

export default router

