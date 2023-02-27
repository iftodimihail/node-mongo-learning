const User = require('../models/user');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getAllUsers = catchAsync(async (req, res) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .paginate();

  const users = await features.dbQuery;

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const tour = await User.findById(req.params.id);

  if (!tour) {
    return next(new AppError('No user found with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// const createTour = catchAsync(async (req, res) => {
//   const newTour = await Tour.create(req.body);

//   res.status(201).json({
//     status: 'succes',
//     data: {
//       tours: newTour,
//     },
//   });
// });

const updateUser = catchAsync(async (req, res, next) => {
  const tour = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(new AppError('No user found with this ID', 404));
  }

  res.status(200).json({
    status: 'succes',
    data: {
      tour,
    },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const tour = await User.findByIdAndRemove(req.params.id);

  if (!tour) {
    return next(new AppError('No user found with this ID', 404));
  }

  res.status(204).json({
    status: 'succes',
  });
});

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  // createTour
};
