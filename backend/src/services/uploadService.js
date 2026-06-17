import cloudinary from '../config/cloudinary.js'
import fs from 'fs'

/**
 * Uploads a local file to Cloudinary and deletes it locally afterwards.
 * @param {string} filePath - Absolute path to the local file
 * @param {string} folder - Target folder in Cloudinary
 * @param {string} resourceType - Cloudinary resource type ('auto', 'image', 'raw', etc.)
 * @returns {Promise<object>} Cloudinary upload result
 */
export const uploadToCloudinary = async (filePath, folder = 'portfolio', resourceType = 'auto') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: resourceType
    })
    
    // Asynchronously delete local file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete temporary file ${filePath}:`, err)
      }
    })
    
    return result
  } catch (error) {
    // Attempt cleanup even on failure
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete temporary file ${filePath} after upload error:`, err)
      }
    })
    throw error
  }
}
