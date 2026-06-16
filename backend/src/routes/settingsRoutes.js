import express from 'express'
import { getSettings, updateSettings } from '../controllers/settingsController.js'
import { protectAdmin } from '../middleware/authMiddleware.js'
import { settingsValidator } from '../validations/validators.js'

const router = express.Router()

router.route('/')
  .get(getSettings)
  .put(protectAdmin, settingsValidator, updateSettings)

export default router
