const ctrlWrapper = require('../../helpers/ctrlWrapper');
const { createEvent } = require('../../services/createEvent');

const createEventController = ctrlWrapper(async (req, res) => {
  const requestData = req.body;

  const newEvent = await createEvent(requestData);

  res.status(201).json(newEvent);
});

module.exports = createEventController;
