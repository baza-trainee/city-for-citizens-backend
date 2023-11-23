const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');
const { getEventsQuery } = require('../../services/getEventsQuery');

const getEventsController = ctrlWrapper(async (req, res) => {
  const { query } = req;
  const eventsQuery = getEventsQuery(query);

  const events = await db.Events.findAll(eventsQuery);
  events.forEach(event => {
    if (event.eventImage) {
      event.eventImage = `${process.env.API_URL}${process.env.DIR_IMAGES}${event.eventImage}`;
    }
  });

  res.status(200).json(events);
});

module.exports = getEventsController;
