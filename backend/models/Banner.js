import mongoose from 'mongoose'

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Banner image URL is required']
  },
  link: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  bannerType: {
    type: String,
    enum: ['hero', 'support', 'ib', 'account'],
    default: 'hero'
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
})

const Banner = mongoose.model('Banner', bannerSchema)

export default Banner
