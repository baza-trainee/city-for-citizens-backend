const ctrlWrapper = require('../../helpers/ctrlWrapper');
const updateEvent = require('../../services/updateEvent');

const updateEventController = ctrlWrapper(async (req, res) => {
  const { id } = req.params;

  const updatedEvent = await updateEvent({ ...req.body, id });

  res.status(201).json(updatedEvent);
});

module.exports = updateEventController;
