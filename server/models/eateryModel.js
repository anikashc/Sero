import mongoose from 'mongoose'


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
    menu: [menuSchema],
    rating: {
      type: Number,
   
      default: 0,
    },
    payNowEnable: {
      type: Boolean,

      default: true,
    },
    payLaterEnable: {
      type: Boolean,
     
      default: false,
    },
    numReviews: {
      type: Number,
     
      default: 0,
    },
    isOpen: {
      type: Boolean,
     
      default: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    paytm: {
      type: Number,
      default: 0
    },
    upi: {
      type: String,
      default: 0
    } 
  },
  {
    timestamps: true,
  }
)

const Eatery = mongoose.model('Eatery', eaterySchema)

export default Eatery
