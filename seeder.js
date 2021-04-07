import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/user.js'
import User from './models/userModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    console.log('createdUsers :>> ', createdUsers)
    console.log('Data Imported')
    process.exit()
  } catch (error) {
    console.error(`ERROR in seeder.js ${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()

    console.log('Data Destroyed')
    process.exit()
  } catch (error) {
    console.error(`ERROR in seeder.js ${error}`)
    process.exit(1)
  }
}

//For running from console
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
