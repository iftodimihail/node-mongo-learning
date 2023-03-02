const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const toursRouter = require('./routes/tours');
const usersRouter = require('./routes/users');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errors');
const reviewsRouter = require('./routes/reviews');

const app = express();
/////// MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsers, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Limit requirest from the same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requirest from this IP, please try again in an hour!',
});

app.use('/api', limiter);

// Data sanitization agains NoSQL query injection
app.use(mongoSanitize());

// Data sanitization agains XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['duration', 'difficulty', 'price'],
  })
);

/////// ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);

app.all('*', (req, res, next) => {
  const error = new Error(`Can not find ${req.originalUrl} on this server!`);
  error.status = 'fail';
  error.statusCode = 404;

  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

///// ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
