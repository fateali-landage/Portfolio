import { uploadToCloudinary } from '../services/uploadService.js'
import Settings from '../models/settingsModel.js'

// @desc    Upload an image to Cloudinary
// @route   POST /api/upload/image
// @access  Private/Admin
export const uploadImageController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }
    
    // Upload image to Cloudinary folder 'portfolio/images'
    const result = await uploadToCloudinary(req.file.path, 'portfolio/images', 'image')
    
    res.status(200).json({ imageUrl: result.secure_url })
  } catch (error) {
    next(error)
  }
}

// @desc    Upload a favicon to Cloudinary
// @route   POST /api/upload/favicon
// @access  Private/Admin
export const uploadFaviconController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }
    
    const result = await uploadToCloudinary(req.file.path, 'portfolio/favicons', 'image')
    const faviconUrl = result.secure_url
    
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
}
