const express = require('express');
const {
  protectRoute,
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  restrictTo,
} = require('../controllers/authentication');

// USER CONTROLLER
const {
  getAllUsers,
  // createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.route('/signup').post(signUp);
userRouter.route('/login').post(login);
userRouter.route('/forgotPassword').post(forgotPassword);
userRouter.route('/resetPassword/:token').patch(resetPassword);

userRouter.route('/updateMyPassword').patch(protectRoute, updatePassword);
userRouter.route('/updateMe').patch(protectRoute, updateMe);
userRouter.route('/deleteMe').delete(protectRoute, deleteMe);

userRouter.route('/').get(protectRoute, getAllUsers);
userRouter
  .route('/:id')
  .get(protectRoute, getUser)
  .patch(protectRoute, updateUser)
  .delete(protectRoute, restrictTo('admin'), deleteUser);

module.exports = userRouter;
