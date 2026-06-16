import express from 'express'
import { protectAdmin } from '../middleware/authMiddleware.js'
import { uploadImage, uploadResume, uploadFavicon } from '../middleware/uploadMiddleware.js'
import Settings from '../models/settingsModel.js'

const router = express.Router()

// Endpoint to upload a single project/certificate/profile image
router.post('/image', protectAdmin, uploadImage.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }
  const imageUrl = `/uploads/${req.file.filename}`
  res.status(200).json({ imageUrl })
})

// Endpoint to upload a favicon
router.post('/favicon', protectAdmin, uploadFavicon.single('favicon'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }
    const faviconUrl = `/uploads/favicon.ico`
    let settings = await Settings.findOne()
    if (!settings) {
      settings = new Settings({ faviconUrl })
    } else {
      settings.faviconUrl = faviconUrl
    }
    await settings.save()
    res.status(200).json({ faviconUrl, settings })
  } catch (error) {
    next(error)
  }
})

// Endpoint to upload a resume PDF
router.post('/resume', protectAdmin, uploadResume.single('resume'), async (req, res, next) => {
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

// Public endpoint to retrieve global settings
router.get('/settings', async (req, res, next) => {
  try {
    let settings = await Settings.findOne()
    if (!settings) {
      settings = await Settings.create({})
    }
    res.json(settings)
  } catch (error) {
    next(error)
  }
})

// Private endpoint to update global settings
router.put('/settings', protectAdmin, async (req, res, next) => {
  try {
    let settings = await Settings.findOne()
    if (!settings) {
      settings = new Settings(req.body)
    } else {
      Object.assign(settings, req.body)
    }
    await settings.save()
    res.json(settings)
  } catch (error) {
    next(error)
  }
})

export default router
