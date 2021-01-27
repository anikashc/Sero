import express from 'express'
const router = express.Router()

import {
  getEateries,
  getEateryById
//   deleteProduct,
//   createProduct,
//   updateProduct,
//   createProductReview,
//   getTopProducts,
} from '../controllers/eateryController.js'
// import { protect, admin } from '../middleware/authMiddleware.js'

// router.route('/').get(getProducts).post(protect, admin, createProduct)
// router.route('/:id/reviews').post(protect, createProductReview)
// router.get('/top', getTopProducts)
// router
//   .route('/:id')
//   .get(getProductById)
//   .delete(protect, admin, deleteProduct)
//   .put(protect, admin, updateProduct)


router.route('/').get(getEateries);
router.route('/:id').get(getEateryById);
export default router