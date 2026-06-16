import express from 'express'
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillController.js'
import { skillValidator } from '../validations/validators.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .get(getSkills)
  .post(protectAdmin, skillValidator, createSkill)

router.route('/:id')
  .put(protectAdmin, skillValidator, updateSkill)
  .delete(protectAdmin, deleteSkill)

export default router
