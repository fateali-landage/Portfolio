import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required']
  },
  image: {
    type: String,
    default: null
  },
  githubUrl: {
    type: String,
    required: [true, 'GitHub URL is required'],
    trim: true
  },
  demoUrl: {
    type: String,
    required: [true, 'Demo URL is required'],
    trim: true
  },
  technologies: {
    type: [String],
    required: [true, 'Technologies array is required']
  },
  status: {
    type: String,
    enum: ['Completed', 'In Progress', 'Learning Project'],
    default: 'Completed'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Project = mongoose.model('Project', projectSchema)
export default Project
