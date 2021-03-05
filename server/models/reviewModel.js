import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String},
        rating: { type: Number, required: true },
        comment: { type: String},
        eatery: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Eatery',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    },
    {
        timestamps: true,
    }
)

// Duplicate review with the same payload (phone number and orderId) shall return 409.
reviewSchema.index( { phoneNumber: 1, order: 1 }, {unique:true} )

const Review = mongoose.model('Review', reviewSchema)

export default Review