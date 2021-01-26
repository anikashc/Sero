import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Eatery from '../models/eateryModel.js'
// import {
//   getProducts,
//   getProductById,
//   deleteProduct,
//   createProduct,
//   updateProduct,
//   createProductReview,
//   getTopProducts,
// } from '../controllers/productController.js'
// import { protect, admin } from '../middleware/authMiddleware.js'

// router.route('/').get(getProducts).post(protect, admin, createProduct)
// router.route('/:id/reviews').post(protect, createProductReview)
// router.get('/top', getTopProducts)
// router
//   .route('/:id')
//   .get(getProductById)
//   .delete(protect, admin, deleteProduct)
//   .put(protect, admin, updateProduct)

router.get('/',asyncHandler(async(req,res)=>{
    const eateries = await Eatery.find({})
    res.json(eateries)
}))
router.get('/:id',asyncHandler(async(req,res)=>{
    const eatery = await Eatery.findById(req.params.id)
    if(eatery){
        res.json(eatery)
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
}))
export default router