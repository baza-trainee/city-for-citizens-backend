const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');

const updateEventTypesController = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { eventType } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Invalid event type ID' });
  }

  const existingEventType = await db.EventTypes.findByPk(id);

  if (!existingEventType) {
    return res.status(404).json({ message: 'Event type not found' });
  }

  await db.EventTypes.update({ eventType }, { where: { id } });

  res.status(200).json({ message: 'Successfully updated' });
});

module.exports = updateEventTypesController;
