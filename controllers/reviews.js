const Review = require('../models/review');
const handlerFactory = require('../utils/handlerFactory');

const setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

const getReviews = handlerFactory.getAll(Review);
const getReview = handlerFactory.getOne(Review);
const createReview = handlerFactory.createOne(Review);
const updateReview = handlerFactory.updateOne(Review);
const deleteReview = handlerFactory.deleteOne(Review);

module.exports = {
  getReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
};
