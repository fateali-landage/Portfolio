import Settings from '../models/settingsModel.js'
import { deleteFromCloudinary } from '../services/uploadService.js'

// @desc    Get global settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne()
    if (!settings) {
      settings = await Settings.create({})
    }
    res.json(settings)
  } catch (error) {
    next(error)
  }
}

// @desc    Update global settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne()
    if (!settings) {
      settings = new Settings(req.body)
    } else {
      // Check for replaced assets to delete from Cloudinary
      if (req.body.profileImage !== undefined && req.body.profileImage !== settings.profileImage) {
        if (settings.profileImage) await deleteFromCloudinary(settings.profileImage)
      }
      if (req.body.ogImageUrl !== undefined && req.body.ogImageUrl !== settings.ogImageUrl) {
        if (settings.ogImageUrl) await deleteFromCloudinary(settings.ogImageUrl)
      }
      if (req.body.faviconUrl !== undefined && req.body.faviconUrl !== settings.faviconUrl) {
        if (settings.faviconUrl) await deleteFromCloudinary(settings.faviconUrl)
      }
      if (req.body.resumeUrl !== undefined && req.body.resumeUrl !== settings.resumeUrl) {
        if (settings.resumeUrl) await deleteFromCloudinary(settings.resumeUrl)
      }
      
      Object.assign(settings, req.body)
    }
    const updatedSettings = await settings.save()
    res.json(updatedSettings)
  } catch (error) {
    next(error)
  }
}
