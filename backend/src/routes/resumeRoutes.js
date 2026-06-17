import express from 'express'
import { protectAdmin } from '../middleware/authMiddleware.js'
import { uploadResume } from '../middleware/uploadMiddleware.js'
import { uploadResumeController, getResumeController } from '../controllers/resumeController.js'

const router = express.Router()

// @desc    Upload resume PDF
// @route   POST /api/resume
// @access  Private/Admin
router.post('/', protectAdmin, uploadResume.single('resume'), uploadResumeController)

// @desc    Get active resume URL
// @route   GET /api/resume
// @access  Public
router.get('/', getResumeController)

export default router

