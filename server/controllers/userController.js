import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc... Auth user & get token
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

export {
    
    authUser,
    registerUser,
    getUserProfile
};