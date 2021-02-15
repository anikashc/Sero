import asyncHandler from 'express-async-handler'
import Eatery from '../models/eateryModel.js'

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
        numReviews: 0,
        payNowEnable: false,
        payLaterEnable: false,
        isOpen: false,
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
        menu

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
    createEatery
};