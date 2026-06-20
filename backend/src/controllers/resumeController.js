import { uploadToCloudinary, deleteFromCloudinary } from '../services/uploadService.js'
import Settings from '../models/settingsModel.js'

// @desc    Upload resume PDF to Cloudinary
// @route   POST /api/upload/resume
// @access  Private/Admin
export const uploadResumeController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }
    
    // Upload PDF to Cloudinary folder 'portfolio/resumes' using resource_type 'auto' (since it is a PDF)
    const result = await uploadToCloudinary(req.file.path, 'portfolio/resumes', 'auto')
    const resumeUrl = result.secure_url
    
    let settings = await Settings.findOne()
    if (!settings) {
      settings = new Settings({ resumeUrl })
    } else {
      if (settings.resumeUrl) {
        await deleteFromCloudinary(settings.resumeUrl)
      }
      settings.resumeUrl = resumeUrl
    }
    await settings.save()
    
    res.status(200).json({ resumeUrl, settings })
  } catch (error) {
    next(error)
  }
}


