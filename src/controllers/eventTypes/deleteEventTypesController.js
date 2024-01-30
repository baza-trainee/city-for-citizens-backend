const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');

const deleteEventTypesController = ctrlWrapper(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Invalid event type ID' });
  }

  const existingEventType = await db.EventTypes.findByPk(id);

  if (!existingEventType) {
    return res.status(404).json({ message: 'Event type not found' });
  }

  await db.EventTypes.destroy({ where: { id } });

  res.status(200).json({ message: 'Successfully deleted' });
});

module.exports = deleteEventTypesController;
