const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');
const { getEventsQuery } = require('../../services/getEventsQuery');
const { timezoneHandler } = require('../../services/timezoneHandler');

const getEventsController = ctrlWrapper(async (req, res) => {
  const { query } = req;
  const eventsQuery = getEventsQuery(query);

  const events = await db.Events.findAll(eventsQuery);

  const preparedEvents = timezoneHandler(
    events.map(event => {
      return event.dataValues;
    })
  );

  res.status(200).json(preparedEvents);
});

module.exports = getEventsController;
