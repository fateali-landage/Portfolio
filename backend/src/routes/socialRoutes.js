import express from 'express'
import {
  getSocials,
  createSocial,
  updateSocial,
  deleteSocial
} from '../controllers/socialController.js'
import { socialValidator } from '../validations/validators.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .get(getSocials)
  .post(protectAdmin, socialValidator, createSocial)

router.route('/:id')
  .put(protectAdmin, socialValidator, updateSocial)
  .delete(protectAdmin, deleteSocial)

export default router
