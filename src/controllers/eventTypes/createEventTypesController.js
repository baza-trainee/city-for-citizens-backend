const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');

const createEventTypesController = ctrlWrapper(async (req, res) => {
  const { eventType, locale } = req.body;

  const newEventType = await db.EventTypes.create({ eventType, locale });

  res.status(201).json({ newEventType });
});

module.exports = createEventTypesController;
