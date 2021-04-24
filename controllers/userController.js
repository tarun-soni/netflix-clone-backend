import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
//@desc   Auth user & get token
//route   POST /api/user
//access  PUBLIC
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPasswords(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})

//@desc   get user by ID
//route   GET /api/users/:id
//access  PRIVATE
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

//@desc   register a new user
//route   POST /api/users
//access  PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already Exists!')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data!')
  }
})

export { authUser, getUserById, registerUser }
