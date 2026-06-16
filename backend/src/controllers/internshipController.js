import Internship from '../models/internshipModel.js'

// @desc    Get all internships
// @route   GET /api/internships
// @access  Public
export const getInternships = async (req, res, next) => {
  try {
    const internships = await Internship.find({}).sort({ order: 1, createdAt: 1 })
    res.json(internships)
  } catch (error) {
    next(error)
  }
}

// @desc    Create an internship
// @route   POST /api/internships
// @access  Private/Admin
export const createInternship = async (req, res, next) => {
  try {
    const { company, role, duration, highlights, certId, color, order } = req.body

    const internship = new Internship({
      company,
      role,
      duration,
      highlights: highlights || [],
      certId,
      color: color || '#a855f7',
      order: order !== undefined ? order : 0
    })

    const createdInternship = await internship.save()
    res.status(201).json(createdInternship)
  } catch (error) {
    next(error)
  }
}

// @desc    Update an internship
// @route   PUT /api/internships/:id
// @access  Private/Admin
export const updateInternship = async (req, res, next) => {
  try {
    const { company, role, duration, highlights, certId, color, order } = req.body

    const internship = await Internship.findById(req.params.id)

    if (internship) {
      internship.company = company || internship.company
      internship.role = role || internship.role
      internship.duration = duration || internship.duration
      internship.highlights = highlights !== undefined ? highlights : internship.highlights
      internship.certId = certId !== undefined ? certId : internship.certId
      internship.color = color || internship.color
      internship.order = order !== undefined ? order : internship.order

      const updatedInternship = await internship.save()
      res.json(updatedInternship)
    } else {
      res.status(404).json({ message: 'Internship not found' })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Delete an internship
// @route   DELETE /api/internships/:id
// @access  Private/Admin
export const deleteInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id)

    if (internship) {
      await Internship.deleteOne({ _id: req.params.id })
      res.json({ message: 'Internship removed successfully' })
    } else {
      res.status(404).json({ message: 'Internship not found' })
    }
  } catch (error) {
    next(error)
  }
}
