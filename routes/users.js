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
  getMe,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.route('/signup').post(signUp);
userRouter.route('/login').post(login);
userRouter.route('/forgotPassword').post(forgotPassword);
userRouter.route('/resetPassword/:token').patch(resetPassword);

userRouter.use(protectRoute);

userRouter.route('/updateMyPassword').patch(updatePassword);
userRouter.route('/updateMe').patch(updateMe);
userRouter.route('/deleteMe').delete(deleteMe);
userRouter.route('/me').get(getMe, getUser);

userRouter.use(restrictTo('admin'));

userRouter.route('/').get(getAllUsers);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
