import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import eateries from './data/eatery.js'
import reviews from './data/reviews.js'
import User from './models/userModel.js'
import Eatery from './models/eateryModel.js'
import Order from './models/orderModel.js'
import Review from './models/reviewModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    //await Order.deleteMany()
    //await Eatery.deleteMany()
    //await User.deleteMany()
    await Review.deleteMany()
    // console.log(reviews)
    // const createdUsers = await User.insertMany(users)
    

    // const adminUser = createdUsers[0]._id

    // const sampleEateries = eateries.map((eatery) => {
    //   return { ...eatery, user: adminUser }
    // })

    // await Eatery.insertMany(sampleEateries)
    await Review.insertMany(reviews)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Eatery.deleteMany()
    await User.deleteMany()
    await Review.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}