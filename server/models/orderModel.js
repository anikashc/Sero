import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    
    eatery: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Eatery',
    }, 
    customerMeta: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String },
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true }, 
        cost: { type: Number, required: true },
        category: { type: String, required: true },
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    paymentType:{
      type: String,
      required: true,
    },
    isPaid:{
      type: Boolean,
      default: false,
    },
    
    paidAt: {
      type: Date,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false
    },
    completedAt: {
      type: Date
    },

    cancelled: {
      type: Boolean,
      default: false
    },
    isReviewed:{
      type: Boolean,
      default: false,
    },
    reviewedAt: {
      type: Date
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
