const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { promisify } = require('util');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const signUp = catchAsync(async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    user,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exists
  if (!(email && password)) {
    return next(new AppError('Please provide the email and password!', 400));
  }

  // Check if user exists
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password!'));
  }

  // Create the JWT
  const token = signToken(user._id);

  res.status(200).json({
    status: 'succes',
    token,
  });
});

const protectRoute = catchAsync(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }

  // Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError('User beloging for the token no longer exists', 401)
    );
  }

  // If user changed password if JWT was issued

  next();
});

module.exports = {
  signUp,
  login,
  protectRoute,
};
