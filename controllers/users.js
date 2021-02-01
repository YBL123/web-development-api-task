const ErrorResponse = require('../middleware/errorResponse')
const { notFound } = require('../lib/errorMessages')
const asyncHandler = require('../middleware/async')
const User = require('../models/user')


// Index / READ
const usersIndex = asyncHandler(async (req, res, next) => {
  const users = await User.find()

  if (!users) {
    return next(new ErrorResponse(notFound, 404))
  }
  res.status(200).json(users)
})

// CREATE
const createUser = asyncHandler(async (req, res, next) => {
  // SPREAD -> COPYING DATA OF REQ.BODY AND STORING IN 'user' VARIABLE
  const user = { ...req.body }

  const newUser = await User.create(user)

  res.status(201).json(newUser)
})


module.exports = {
  index: usersIndex,
  create: createUser
}