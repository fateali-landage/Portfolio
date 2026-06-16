import express from 'express'
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js'
import { projectValidator } from '../validations/validators.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .get(getProjects)
  .post(protectAdmin, projectValidator, createProject)

router.route('/:id')
  .put(protectAdmin, projectValidator, updateProject)
  .delete(protectAdmin, deleteProject)

export default router
