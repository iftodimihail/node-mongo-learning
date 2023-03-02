const express = require('express');
const { protectRoute, restrictTo } = require('../controllers/authentication');
const {
  createReview,
  getReviews,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require('../controllers/reviews');

const reviewsRouter = express.Router({ mergeParams: true });

reviewsRouter
  .route('/:id')
  .get(getReview)
  .delete(deleteReview)
  .patch(updateReview);
reviewsRouter
  .route('/')
  .get(getReviews)
  .post(protectRoute, restrictTo('user'), setTourUserIds, createReview);

module.exports = reviewsRouter;
