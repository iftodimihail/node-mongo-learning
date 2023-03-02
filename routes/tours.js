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

tourRouter.route('/stats').get(protectRoute, getToursStats);
tourRouter.route('/monthly-plan/:year').get(protectRoute, getMonthlyPlan);

tourRouter
  .route('/:id')
  .get(protectRoute, getTour)
  .patch(protectRoute, updateTour)
  .delete(protectRoute, restrictTo('admin', 'lead-guide'), deleteTour);
tourRouter.route('/').get(getAllTours).post(createTour);

module.exports = tourRouter;
