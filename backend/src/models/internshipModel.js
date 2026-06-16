import mongoose from 'mongoose'

const internshipSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Intern role is required'],
    trim: true
  },
  duration: {
    type: String,
    required: [true, 'Internship duration/dates are required'],
    trim: true
  },
  highlights: {
    type: [String],
    default: []
  },
  certId: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    default: '#a855f7',
    trim: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Internship = mongoose.model('Internship', internshipSchema)
export default Internship
