import express from 'express'
const router = express.Router()

import {
  getEateries,
  getEateryById,
  deleteEatery,
  createEatery,
  updateEatery,
  eateryReviews
//   createProductReview,
//   getTopProducts,
} from '../controllers/eateryController.js'
import { protect, admin , common} from '../middleware/authMiddleware.js'

// router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').get(protect, common, eateryReviews)
// router.get('/top', getTopProducts)



router.route('/').get(getEateries).post(protect,admin, createEatery);
//router.route('/:id').get(getEateryById);

router
  .route('/:id')
  .get(getEateryById)
  .delete(protect, admin, deleteEatery)
  .put(protect, common, updateEatery)
export default router