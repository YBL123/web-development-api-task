const ErrorResponse = require('../middleware/errorResponse');
const { notFound } = require('../lib/errorMessages');
const asyncHandler = require('../middleware/async');
const User = require('../models/user');

//  READ / ALL USERS / INDEX
const usersIndex = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    return next(new ErrorResponse(notFound, 404));
  }
  res.status(200).json(users);

  // converting timesstamp to unix
  // const ts = new Date()
  // const unix = parseInt(ts.getTime() / 1000)
  // console.log('is this working', unix)
});


// GET SINGLE USER
const singleUser = asyncHandler(async (req, res, next) => {
  // this id is the object id
  // whatever goes into /:id is refereed to as the req.params.id
  const userId = req.params.id;
  // if there's a valid mongo id but it's not a 'currently valid' one it will still error now
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorResponse(notFound, 404));
  }
  res.status(200).json(user);
});

// CREATE
const createUser = asyncHandler(async (req, res, next) => {
  // SPREAD -> COPYING DATA OF REQ.BODY AND STORING IN 'user' VARIABLE
  const user = { ...req.body };

  const newUser = await User.create(user);

  res.status(201).json(newUser);
});

//UPDATE
const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  if (userId === undefined) {
    res.sendStatus(400);
  }

  const user = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    res.sendStatus(400);
  }

  res.status(202).json(user);

});

// DELETE
const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const userToDelete = await User.findById(userId);
  if (!userToDelete) {
    return next(new ErrorResponse(notFound, 404));
  }
  await userToDelete.remove();
  res.sendStatus(204);
});

module.exports = {
  index: usersIndex,
  single: singleUser,
  create: createUser,
  update: updateUser,
  delete: deleteUser,
};
