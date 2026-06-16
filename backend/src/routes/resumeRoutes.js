import express from 'express'
import { protectAdmin } from '../middleware/authMiddleware.js'
import { uploadResume } from '../middleware/uploadMiddleware.js'
import Settings from '../models/settingsModel.js'

const router = express.Router()

// @desc    Upload resume PDF
// @route   POST /api/resume
// @access  Private/Admin
router.post('/', protectAdmin, uploadResume.single('resume'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }
    const resumeUrl = `/uploads/resume.pdf`
    let settings = await Settings.findOne()
    if (!settings) {
      settings = new Settings({ resumeUrl })
    } else {
      settings.resumeUrl = resumeUrl
    }
    await settings.save()
    res.status(200).json({ resumeUrl, settings })
  } catch (error) {
    next(error)
  }
})

// @desc    Get active resume URL
// @route   GET /api/resume
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const settings = await Settings.findOne()
    const resumeUrl = settings?.resumeUrl || '/uploads/resume.pdf'
    res.status(200).json({ resumeUrl })
  } catch (error) {
    next(error)
  }
})

export default router
