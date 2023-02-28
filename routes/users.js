const express = require('express');
const {
  protectRoute,
  signUp,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/authentication');

// USER CONTROLLER
const {
  getAllUsers,
  // createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.route('/signup').post(signUp);
userRouter.route('/login').post(login);
userRouter.route('/forgotPassword').post(forgotPassword);
userRouter.route('/resetPassword/:token').patch(resetPassword);

userRouter.route('/').get(protectRoute, getAllUsers);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
