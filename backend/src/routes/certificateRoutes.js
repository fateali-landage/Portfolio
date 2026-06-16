import express from 'express'
import {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate
} from '../controllers/certificateController.js'
import { certificateValidator } from '../validations/validators.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .get(getCertificates)
  .post(protectAdmin, certificateValidator, createCertificate)

router.route('/:id')
  .put(protectAdmin, certificateValidator, updateCertificate)
  .delete(protectAdmin, deleteCertificate)

export default router
