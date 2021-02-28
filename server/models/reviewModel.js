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
        }

    },
    {
        timestamps: true,
    }
)
const Review = mongoose.model('Review', reviewSchema)

export default Review