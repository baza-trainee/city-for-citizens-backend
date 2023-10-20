const catchAsync = require('../../helpers/catchAsync');

const createImageController = catchAsync(async (req, res) => {
  res.status(201).json({ message: 'createImageController' });
});

module.exports = createImageController;
