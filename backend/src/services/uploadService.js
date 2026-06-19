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

/**
 * Deletes a file from Cloudinary given its secure URL.
 * @param {string} url - Cloudinary secure URL
 */
export const deleteFromCloudinary = async (url) => {
  if (!url || !url.includes('cloudinary.com')) return
  try {
    const parts = url.split('/upload/')
    if (parts.length < 2) return

    const pathPart = parts[1]
    const pathParts = pathPart.split('/')
    if (pathParts[0].startsWith('v') && !isNaN(pathParts[0].substring(1))) {
      pathParts.shift()
    }

    const fullPublicId = pathParts.join('/')
    const lastDotIndex = fullPublicId.lastIndexOf('.')
    const publicId = lastDotIndex > -1 ? fullPublicId.substring(0, lastDotIndex) : fullPublicId

    let resourceType = 'image'
    if (url.includes('/raw/upload/') || url.endsWith('.pdf')) {
      resourceType = 'raw'
    } else if (url.includes('/video/upload/')) {
      resourceType = 'video'
    }

    console.log(`Deleting from Cloudinary: public_id=${publicId}, resourceType=${resourceType}`)
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
  } catch (error) {
    console.error(`Failed to delete Cloudinary asset at ${url}:`, error)
  }
}
