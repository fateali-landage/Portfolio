import { body, validationResult } from 'express-validator'

// Middleware to handle validation errors
export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

export const loginValidator = [
  body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  validate
]

export const projectValidator = [
  body('title').trim().notEmpty().withMessage('Project title is required'),
  body('description').trim().notEmpty().withMessage('Project description is required'),
  body('githubUrl').trim().isURL().withMessage('Valid GitHub URL is required'),
  body('demoUrl').trim().isURL().withMessage('Valid Demo URL is required'),
  body('technologies').isArray({ min: 1 }).withMessage('Technologies must be a non-empty array of strings'),
  body('image').optional({ nullable: true }).trim(),
  body('status').optional().isIn(['Completed', 'In Progress', 'Learning Project']).withMessage('Status must be Completed, In Progress, or Learning Project'),
  validate
]

export const certificateValidator = [
  body('title').trim().notEmpty().withMessage('Certificate title is required'),
  body('issuer').trim().notEmpty().withMessage('Issuer is required'),
  body('issueDate').trim().notEmpty().withMessage('Issue date is required'),
  body('image').optional({ nullable: true }).trim(),
  validate
]

export const skillValidator = [
  body('name').trim().notEmpty().withMessage('Skill name is required'),
  body('category').isIn(['frontend', 'backend', 'programming', 'database', 'ai-ml', 'cybersecurity', 'tools']).withMessage('Category must be frontend, backend, programming, database, ai-ml, cybersecurity, or tools'),
  body('level').isInt({ min: 0, max: 100 }).withMessage('Level must be an integer between 0 and 100'),
  body('color').trim().notEmpty().withMessage('Color string is required'),
  validate
]

export const socialValidator = [
  body('platform').trim().notEmpty().withMessage('Social platform is required'),
  body('url').trim().isURL().withMessage('Valid platform URL is required'),
  body('value').trim().notEmpty().withMessage('Display value is required'),
  validate
]

export const internshipValidator = [
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('role').trim().notEmpty().withMessage('Role/title is required'),
  body('duration').trim().notEmpty().withMessage('Duration is required'),
  body('highlights').isArray().withMessage('Highlights must be an array of strings'),
  body('certId').optional({ nullable: true, checkFalsy: true }).trim(),
  body('color').optional().trim(),
  body('order').optional().isInt().withMessage('Order must be an integer'),
  validate
]

export const settingsValidator = [
  body('ownerName').optional().trim().notEmpty().withMessage('Owner name cannot be empty'),
  body('headline').optional().trim().notEmpty().withMessage('Headline cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('profileImage').optional().trim(),
  body('aboutBio').optional().trim(),
  body('aboutTitle').optional().trim(),
  body('aboutSubtitle').optional().trim(),
  body('degree').optional().trim(),
  body('institution').optional().trim(),
  body('location').optional().trim(),
  body('duration').optional().trim(),
  body('academicFocus').optional().trim(),
  body('coursework').optional().isArray(),
  body('contactEmail').optional().trim().isEmail().withMessage('Valid contact email is required'),
  body('contactTitle').optional().trim(),
  body('contactDesc').optional().trim(),
  body('cybersecurityItems').optional().isArray(),
  body('achievementsList').optional().isArray(),
  body('seoTitle').optional().trim(),
  body('seoDescription').optional().trim(),
  body('seoKeywords').optional().trim(),
  body('faviconUrl').optional().trim(),
  body('ogTitle').optional().trim(),
  body('ogDescription').optional().trim(),
  body('ogImageUrl').optional().trim(),
  body('primaryColor').optional().trim(),
  body('secondaryColor').optional().trim(),
  body('bgColor').optional().trim(),
  body('aboutCards').optional().isArray(),
  body('offersReceived').optional().isArray(),
  body('learningItems').optional().isArray(),
  validate
]

