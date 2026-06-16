import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'resume') {
      cb(null, 'resume.pdf')
    } else if (file.fieldname === 'favicon') {
      cb(null, 'favicon.ico')
    } else {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`)
    }
  }
})

// File Validation Filters
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|ico|x-icon|svg/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(new Error('Only images, SVG or ICO files are allowed!'))
  }
}

const documentFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase() === '.pdf'
  const mimetype = file.mimetype === 'application/pdf'

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(new Error('Only PDF documents are allowed!'))
  }
}

// Multer Upload Instances
export const uploadImage = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})

export const uploadResume = multer({
  storage: storage,
  fileFilter: documentFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
})
export const uploadFavicon = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
})
