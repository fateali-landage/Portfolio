import Timeline from '../models/timelineModel.js'

// @desc    Get all milestones
// @route   GET /api/timeline
// @access  Public
export const getMilestones = async (req, res, next) => {
  try {
    const milestones = await Timeline.find({}).sort({ order: 1, createdAt: 1 })
    res.json(milestones)
  } catch (error) {
    next(error)
  }
}

// @desc    Create a milestone
// @route   POST /api/timeline
// @access  Private/Admin
export const createMilestone = async (req, res, next) => {
  try {
    const { year, title, detail, iconName, order } = req.body

    const milestone = new Timeline({
      year,
      title,
      detail,
      iconName,
      order: order !== undefined ? order : 0
    })

    const createdMilestone = await milestone.save()
    res.status(201).json(createdMilestone)
  } catch (error) {
    next(error)
  }
}

// @desc    Update a milestone
// @route   PUT /api/timeline/:id
// @access  Private/Admin
export const updateMilestone = async (req, res, next) => {
  try {
    const { year, title, detail, iconName, order } = req.body

    const milestone = await Timeline.findById(req.params.id)

    if (milestone) {
      milestone.year = year || milestone.year
      milestone.title = title || milestone.title
      milestone.detail = detail || milestone.detail
      milestone.iconName = iconName !== undefined ? iconName : milestone.iconName
      milestone.order = order !== undefined ? order : milestone.order

      const updatedMilestone = await milestone.save()
      res.json(updatedMilestone)
    } else {
      res.status(404).json({ message: 'Milestone not found' })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Delete a milestone
// @route   DELETE /api/timeline/:id
// @access  Private/Admin
export const deleteMilestone = async (req, res, next) => {
  try {
    const milestone = await Timeline.findById(req.params.id)

    if (milestone) {
      await Timeline.deleteOne({ _id: req.params.id })
      res.json({ message: 'Milestone removed successfully' })
    } else {
      res.status(404).json({ message: 'Milestone not found' })
    }
  } catch (error) {
    next(error)
  }
}
