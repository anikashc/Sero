import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


// use req.user._id if we want to get the details of a logged in user
// else use req.params.id

// @desc ... Auth user & get token
// @route... GET /api/users/login
// @access... Public
const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            userType: user.userType,
            token: generateToken(user._id),
            eatery: user.eatery
        })
    }
    else {

        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc... Register a user
// @route... POST /api/users
// @access... Public
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, phoneNumber } = req.body

    const userExists = await User.findOne({ email })

    if(userExists) {

        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({

        name,
        email,
        phoneNumber,
        password
    })

    if(user) {

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            userType: user.userType,
            token: generateToken(user._id),
        })
    } else {

        res.status(400)
        throw new Error('Invalid user details')
    }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        userType: updatedUser.userType,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
})

// @desc ... Get user profile
// @route... GET /api/users/profile
// @access ... Private
const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if(user) {

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            userType: user.userType,
        })
    } else {

        res.status(404)
        throw new Error('User not found')
    }
})

// @desc ... Get all users
// @route... GET /api/users
// @access ... Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    //res.send("Success")

    const users = await User.find({})
    res.json(users)

    
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
})

// @desc ... Delete User
// @route... DELETE /api/users/:id
// @access ... Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.userType = req.body.userType || user.userType
        user.eatery = req.body.eatery || user.eatery

        const updatedUser = await user.save()

        res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        userType: updatedUser.userType,
        eatery: updatedUser.eatery
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export { 
    authUser, 
    getUserProfile, 
    registerUser, 
    getUsers, 
    updateUserProfile, 
    deleteUser, 
    getUserById,
    updateUser
}
