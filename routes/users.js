const express = require('express');
const { protectRoute } = require('../controllers/authentication');

// USER CONTROLLER
const {
  getAllUsers,
  // createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.route('/').get(protectRoute, getAllUsers);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
