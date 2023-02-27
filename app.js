const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tours');
const userRouter = require('./routes/users');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errors');
const { signUp, login } = require('./controllers/authentication');

const app = express();

/////// MIDDLEWARES
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

/////// ROUTES
userRouter.route('/signup').post(signUp);
userRouter.route('/login').post(login);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  const error = new Error(`Can not find ${req.originalUrl} on this server!`);
  error.status = 'fail';
  error.statusCode = 404;

  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

///// ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
