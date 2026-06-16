import express from 'express'
import {
  getInternships,
  createInternship,
  updateInternship,
  deleteInternship
} from '../controllers/internshipController.js'
import { protectAdmin } from '../middleware/authMiddleware.js'
import { internshipValidator } from '../validations/validators.js'

const router = express.Router()

router.route('/')
  .get(getInternships)
  .post(protectAdmin, internshipValidator, createInternship)

router.route('/:id')
  .put(protectAdmin, internshipValidator, updateInternship)
  .delete(protectAdmin, deleteInternship)


export default router
