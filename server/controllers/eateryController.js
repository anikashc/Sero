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

export {
    
    getEateries, 
    getEateryById
};