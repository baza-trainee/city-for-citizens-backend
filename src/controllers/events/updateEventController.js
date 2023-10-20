const catchAsync = require('../../helpers/catchAsync');
const updateEvent = require('../../services/updateEvent');

const updateEventController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const updatedEvent = await updateEvent({ ...req.body, id });

  res.status(201).json(updatedEvent);
});

module.exports = updateEventController;
