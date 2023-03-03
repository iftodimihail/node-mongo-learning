const express = require('express');
const { protectRoute, restrictTo } = require('../controllers/authentication');
const reviewsRouter = require('./reviews');

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  getToursStats,
  getMonthlyPlan,
} = require('../controllers/tours');

const tourRouter = express.Router();

tourRouter.use('/:tourId/reviews', reviewsRouter);

tourRouter.route('/stats').get(getToursStats);
tourRouter
  .route('/monthly-plan/:year')
  .get(
    protectRoute,
    restrictTo('admin', 'lead-guide', 'guide'),
    getMonthlyPlan
  );

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(protectRoute, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protectRoute, restrictTo('admin', 'lead-guide'), deleteTour);
tourRouter
  .route('/')
  .get(getAllTours)
  .post(protectRoute, restrictTo('admin', 'lead-guide'), createTour);

module.exports = tourRouter;
