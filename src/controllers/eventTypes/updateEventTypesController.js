const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');

const updateEventTypesController = ctrlWrapper(async (req, res) => {
  const { idIdentifier } = req.params;
  const { eventTypeUkr, eventTypeEng } = req.body;

  const existingEventTypes = await db.EventTypes.findAll({
    where: {
      idIdentifier: idIdentifier,
    },
  });

  if (existingEventTypes.length === 0) {
    return res
      .status(404)
      .json({ error: 'No event types found for the provided idIdentifier' });
  }

  await Promise.all(
    existingEventTypes.map(async eventType => {
      if (eventType.locale === 'uk_UA') {
        await eventType.update({ eventType: eventTypeUkr });
      } else if (eventType.locale === 'en_US') {
        await eventType.update({ eventType: eventTypeEng });
      }
    })
  );

  res
    .status(200)
    .json({ status: 'success', message: 'Event types updated successfully' });
});

module.exports = updateEventTypesController;
