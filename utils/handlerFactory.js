const APIFeatures = require('./apiFeatures');
const AppError = require('./appError');
const catchAsync = require('./catchAsync');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndRemove(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with this ID', 404));
    }

    res.status(204).json({
      status: 'succes',
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with this ID', 404));
    }

    res.status(200).json({
      status: 'succes',
      data: doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'succes',
      data: doc,
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError('No document foudn with this ID', 404));
    }

    res.status(200).json({
      status: 'succes',
      data: doc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // Hack for review
    const filter = {};

    const { tourId } = req.params;

    if (tourId) {
      filter.tour = tourId;
    }

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .paginate();

    const docs = await features.dbQuery;

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: docs,
    });
  });
