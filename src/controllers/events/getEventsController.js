const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');
const { getEventsQuery } = require('../../services/getEventsQuery');

const getEventsController = ctrlWrapper(async (req, res) => {
  const { query } = req;

  const eventsQuery = getEventsQuery(query);

  const events = await db.Events.findAll(eventsQuery);

  res.status(200).json({ events });
});

// getEventsById
const getEventsById = ctrlWrapper(async (req, res) => {
  const { id } = req.params;

  const event1 = await db.Events.findOne({
    where: { id },
    include: [{ model: db.EventAddress }, { model: db.EventTypes }],
  });

  if (!event1) {
    return res.status(404).json({ message: 'Event not found' });
  }

  const event2 = await db.Events.findOne({
    where: {
      idIdentifier: event1.idIdentifier,
      id: { [db.Sequelize.Op.ne]: event1.id },
    },
    include: [{ model: db.EventAddress }, { model: db.EventTypes }],
  });

  if (!event2) {
    return res.status(404).json({ message: 'Second event not found' });
  }

  return res.json([event1, event2]);
});

module.exports = { getEventsController, getEventsById };
