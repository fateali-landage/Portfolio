import Skill from '../models/skillModel.js'

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find({})
    res.json(skills)
  } catch (error) {
    next(error)
  }
}

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private/Admin
export const createSkill = async (req, res, next) => {
  try {
    const { name, category, level, color } = req.body

    const skill = new Skill({
      name,
      category,
      level,
      color
    })

    const createdSkill = await skill.save()
    res.status(201).json(createdSkill)
  } catch (error) {
    next(error)
  }
}

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private/Admin
export const updateSkill = async (req, res, next) => {
  try {
    const { name, category, level, color } = req.body

    const skill = await Skill.findById(req.params.id)

    if (skill) {
      skill.name = name || skill.name
      skill.category = category || skill.category
      skill.level = level !== undefined ? level : skill.level
      skill.color = color || skill.color

      const updatedSkill = await skill.save()
      res.json(updatedSkill)
    } else {
      res.status(404).json({ message: 'Skill not found' })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id)

    if (skill) {
      await Skill.deleteOne({ _id: req.params.id })
      res.json({ message: 'Skill removed successfully' })
    } else {
      res.status(404).json({ message: 'Skill not found' })
    }
  } catch (error) {
    next(error)
  }
}
