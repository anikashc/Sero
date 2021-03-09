import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    eateryId,
    orderItems,
    customerMeta,
    paymentMethod,
    paymentType,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
        eatery: eateryId,
        orderItems,
        customerMeta,
        paymentMethod,
        paymentType,
        itemsPrice,
        taxPrice,
        totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

const editOrderItems = asyncHandler(async (req, res) => {
  const {
    eateryId,
    orderId,
    orderItems,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body

  const order = await Order.findById(req.params.id)

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else if(order) {
      if(order.eatery!=eateryId){
        res.status(403)
        throw new Error('Eatery is different')
      }
      else{

        order.totalPrice = Number(totalPrice)+Number(order.totalPrice)
        order.itemsPrice = Number(itemsPrice)+Number(order.itemsPrice)
        order.taxPrice = Number(taxPrice)+Number(order.taxPrice)
        order.orderItems = order.orderItems.concat(orderItems)
    
        const updatedOrder = await order.save()
    
        res.json(updatedOrder)
      }
  }
  else{
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private Admin and Eatery
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to completed
// @route   GET /api/orders/:id/complete
// @access  Private/Admin/Eatery
const updateOrderToCompleted = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.completed = true
    order.completedAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to cancelled
// @route   GET /api/orders/:id/cancel
// @access  Private/Admin/Eatery
const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.cancelled = true
    order.completed = true
    order.completedAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to customer paid
// @route   PUT /api/orders/:id/customerPayment
// @access  Public
const updateOrderToCustomerPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.paymentMethod = req.body.paymentMethod || order.paymentMethod

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get eatery orders
// @route   GET /api/orders/myorders
// @access  Private Eateries
const getMyOrders = asyncHandler(async (req, res) => {
  
  const orders = await Order.find({ eatery: req.user.eatery })
  
  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToCompleted,
  getMyOrders,
  getOrders,
  cancelOrder,
  updateOrderToCustomerPaid,
  editOrderItems
}
