import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Skill category is required'],
    enum: ['frontend', 'backend', 'programming', 'database', 'ai-ml', 'cybersecurity', 'tools']
  },
  level: {
    type: Number,
    min: [0, 'Level must be at least 0'],
    max: [100, 'Level cannot exceed 100'],
    default: 80
  },
  color: {
    type: String,
    default: '#ffffff'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Skill = mongoose.model('Skill', skillSchema)
export default Skill
