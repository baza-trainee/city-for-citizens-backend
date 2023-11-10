const ctrlWrapper = require('../../helpers/ctrlWrapper');
const { deleteEvent } = require('../../services/deleteEvent');

const deleteEventController = ctrlWrapper(async (req, res) => {
  const eventId = req.params.id;

  await deleteEvent(eventId, res);

  res.status(200).json({ message: 'Event deleted successfully' });
});

module.exports = deleteEventController;
