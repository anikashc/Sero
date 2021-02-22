import asyncHandler from 'express-async-handler'
import Eatery from '../models/eateryModel.js'
import Review from '../models/reviewModel.js'
import User from '../models/userModel.js'

// @desc... Fetch all eateries
// @route... GET /api/eateries
// @access... Public
const getEateries = asyncHandler(async(req, res) => {

    const eateries = await Eatery.find({})
    
    if (eateries) {

        res.json(eateries)
    } else {

        res.status(404)
        throw new Error('Eateries not found')
    }
}) 

// @desc... Fetch single eatery
// @route... GET /api/eateries/:id
// @access... Public
const getEateryById = asyncHandler(async(req, res) => {

    const eatery = await Eatery.findById(req.params.id)
    
    if(eatery) {

        res.json(eatery)
    } else {
        
        res.status(404)
        throw new Error('Eatery not found')
    }
})

// @desc... Fetch eatery reviews
// @route... GET /api/eateries/:id/reviews
// @access... Private/Common(Admin and Eatery)
const eateryReviews = asyncHandler(async(req, res) => {

    // if admin, show all reviews
    if(req.user.userType===1){
        const reviews = await Review.find({})
        //console.log(reviews)

        const reviewInfo = reviews.map(asyncHandler(async(review)=>{
            const eatery = await Eatery.findById(review.eatery)
            console.log(eatery)
            return {...review}
        })) 
        
        res.json(reviewInfo) 
    }
    else{
        const reviews = await Review.find({"eatery": req.params.id})

        /* All this check is being done to prevent any other logged in user
        *   to view reviews of any other eatery. First found the eatery id from
        *   the reviews and then matched this id with the user who has that eatery
        *   assigned to itself. Finally checked that whether this user id and the
        *   current logged in user id match with each other.
        */
        // eatery id
        const eateryid = reviews[0].eatery
        //console.log(eateryid)
        const eateryUser = await User.find({"eatery": eateryid}).select('-password')
        //console.log(eateryUser)
        const eateryUserId= eateryUser[0]._id

        if(reviews && (req.user._id.toString() == eateryUserId.toString() || req.user.userType===1)) {

            res.json(reviews)

        } else {
            
            res.status(404)
            throw new Error('Reviews not found')
        }
    }
    
})

// @desc    Delete an eatery
// @route   DELETE /api/eateries/:id
// @access  Private/Admin
const deleteEatery = asyncHandler(async (req, res) => {
    const eatery = await Eatery.findById(req.params.id)

    if (eatery) {
        await eatery.remove()
        res.json({ message: 'Eatery removed' })
    } else {
        res.status(404)
        throw new Error('Eatery not found')
    }
})

// @desc    Create an eatery
// @route   POST /api/eateries
// @access  Private/Admin
const createEatery = asyncHandler(async (req, res) => {
    const eatery = new Eatery({
        name: 'Sample name',
        address: 'Sample Address',
        user: req.user._id,
        image: '/images/sample.jpg',
        category: 'Sample category',
        description: 'Sample description',
    })

    const createdEatery = await eatery.save()
    res.status(201).json(createdEatery)
}) 
// @desc    Update an eatery
// @route   PUT /api/eateries/:id
// @access  Private/Admin/Eatery
const updateEatery = asyncHandler(async (req, res) => {

    const {
        name,
        address,
        description,
        category,
        image,
        payNowEnable,
        payLaterEnable,
        isOpen,
        menu,
        active

    } = req.body
    const eatery = await Eatery.findById(req.params.id)
    if(eatery){

        eatery.name=name || eatery.name
        eatery.address=address || eatery.address
        eatery.description=description || eatery.description
        eatery.category=category || eatery.category
        eatery.image=image || eatery.image
        eatery.payNowEnable=payNowEnable
        eatery.payLaterEnable=payLaterEnable
        eatery.isOpen=isOpen
        eatery.active=active
        eatery.menu=menu || eatery.menu

        const updatedEatery = await eatery.save()
        res.json(updatedEatery)
    }
    else{
        res.status(404);
        throw new Error('Eatery not found')
    }
    

}) 
export {
    
    getEateries, 
    getEateryById,
    deleteEatery,
    updateEatery,
    createEatery,
    eateryReviews
};