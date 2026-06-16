import Certificate from '../models/certificateModel.js'

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
export const getCertificates = async (req, res, next) => {
  try {
    const certificates = await Certificate.find({}).sort({ createdAt: -1 })
    res.json(certificates)
  } catch (error) {
    next(error)
  }
}

// @desc    Create a certificate
// @route   POST /api/certificates
// @access  Private/Admin
export const createCertificate = async (req, res, next) => {
  try {
    const { title, issuer, issueDate, image } = req.body

    const certificate = new Certificate({
      title,
      issuer,
      issueDate,
      image
    })

    const createdCertificate = await certificate.save()
    res.status(201).json(createdCertificate)
  } catch (error) {
    next(error)
  }
}

// @desc    Update a certificate
// @route   PUT /api/certificates/:id
// @access  Private/Admin
export const updateCertificate = async (req, res, next) => {
  try {
    const { title, issuer, issueDate, image } = req.body

    const certificate = await Certificate.findById(req.params.id)

    if (certificate) {
      certificate.title = title || certificate.title
      certificate.issuer = issuer || certificate.issuer
      certificate.issueDate = issueDate || certificate.issueDate
      certificate.image = image !== undefined ? image : certificate.image

      const updatedCertificate = await certificate.save()
      res.json(updatedCertificate)
    } else {
      res.status(404).json({ message: 'Certificate not found' })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Delete a certificate
// @route   DELETE /api/certificates/:id
// @access  Private/Admin
export const deleteCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id)

    if (certificate) {
      await Certificate.deleteOne({ _id: req.params.id })
      res.json({ message: 'Certificate removed successfully' })
    } else {
      res.status(404).json({ message: 'Certificate not found' })
    }
  } catch (error) {
    next(error)
  }
}
