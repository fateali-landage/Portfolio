import mongoose from 'mongoose'

const socialSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: [true, 'Social platform name is required'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'Social link URL is required'],
    trim: true
  },
  value: {
    type: String,
    required: [true, 'Social link handle value is required'],
    trim: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Social = mongoose.model('Social', socialSchema)
export default Social
