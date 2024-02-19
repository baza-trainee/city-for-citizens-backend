const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');
const { v4: uuidv4 } = require('uuid');

const createEventTypesController = ctrlWrapper(async (req, res) => {
  const { eventTypeUkr, eventTypeEng } = req.body;

  const idIdentifier = uuidv4();

  const newEventTypeUkr = await db.EventTypes.create({
    idIdentifier,
    eventType: eventTypeUkr,
    locale: 'uk_UA',
  });

  const newEventTypeEng = await db.EventTypes.create({
    idIdentifier,
    eventType: eventTypeEng,
    locale: 'en_US',
  });

  res.status(201).json({ status: 'success', newEventTypeUkr, newEventTypeEng });
});

module.exports = createEventTypesController;
