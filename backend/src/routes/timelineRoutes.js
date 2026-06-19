import express from 'express'
import {
  getMilestones,
  createMilestone,
  updateMilestone,
  deleteMilestone
} from '../controllers/timelineController.js'
import { protectAdmin } from '../middleware/authMiddleware.js'
import { timelineValidator } from '../validations/validators.js'

const router = express.Router()

router.route('/')
  .get(getMilestones)
  .post(protectAdmin, timelineValidator, createMilestone)

router.route('/:id')
  .put(protectAdmin, timelineValidator, updateMilestone)
  .delete(protectAdmin, deleteMilestone)

export default router
