import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)
const menuSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true,
  }
)

const eaterySchema = mongoose.Schema(
  {
      //for refering the eatery account
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    address: {
        type: String,
        required: true,
      },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    menu: [menuSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    payNowEnable: {
      type: Boolean,
      required: true,
      default: true,
    },
    payLaterEnable: {
      type: Boolean,
      required: true,
      default: false,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    isOpen: {
      type: Boolean,
      required: true,
      default: true,
    },
    
   
  },
  {
    timestamps: true,
  }
)

const Eatery = mongoose.model('Eatery', eaterySchema)

export default Eatery
