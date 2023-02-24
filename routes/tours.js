const express = require('express');

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

tourRouter.route('/stats').get(getToursStats);
tourRouter.route('/monthly-plan/:year').get(getMonthlyPlan);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
tourRouter.route('/').get(getAllTours).post(createTour);

module.exports = tourRouter;
