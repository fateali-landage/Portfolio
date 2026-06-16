import mongoose from 'mongoose'

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Certificate title is required'],
    trim: true
  },
  issuer: {
    type: String,
    required: [true, 'Issuer is required'],
    trim: true
  },
  issueDate: {
    type: String,
    required: [true, 'Issue date is required']
  },
  image: {
    type: String,
    default: null
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Certificate = mongoose.model('Certificate', certificateSchema)
export default Certificate
