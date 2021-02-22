import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true }, 
        price: { type: Number, required: true },
        
      },
    ],
    eatery: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Eatery',
    }, 
    paymentMethod: {
      type: String,
      required: true,
    },
    typeOfPayment: {
        type: Boolean,
        required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
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
      type: Number,
      required: true,
      default: 1
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
