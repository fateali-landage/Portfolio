import express from 'express'
import {
  getMilestones,
  createMilestone,
  updateMilestone,
  deleteMilestone
} from '../controllers/timelineController.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .get(getMilestones)
  .post(protectAdmin, createMilestone)

router.route('/:id')
  .put(protectAdmin, updateMilestone)
  .delete(protectAdmin, deleteMilestone)

export default router
