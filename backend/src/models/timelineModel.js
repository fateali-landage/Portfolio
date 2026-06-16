import mongoose from 'mongoose'

const timelineSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, 'Milestone year is required'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Milestone title is required'],
    trim: true
  },
  detail: {
    type: String,
    required: [true, 'Milestone detail description is required'],
    trim: true
  },
  iconName: {
    type: String,
    default: 'FiAward',
    trim: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Timeline = mongoose.model('Timeline', timelineSchema)
export default Timeline
