import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  cancelOrder,
} from '../controllers/orderController.js'
import { protect, common } from '../middleware/authMiddleware.js'

router.route('/').post(addOrderItems).get(protect, common, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(getOrderById)
router.route('/:id/pay').put(protect, common, updateOrderToPaid)
router.route('/:id/cancel').put(protect, common, cancelOrder)
router.route('/:id/completed').put(protect, common, updateOrderToDelivered)

export default router