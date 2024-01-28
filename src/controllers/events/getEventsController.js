const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');
const { getEventsQuery } = require('../../services/getEventsQuery');

const { API_URL, DIR_IMAGES } = process.env;

const getEventsController = ctrlWrapper(async (req, res) => {
  const { query } = req;

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  query.limit = limit;
  query.offset = (page - 1) * limit;

  const eventsQuery = getEventsQuery(query);

  const { count, rows: events } = await db.Events.findAndCountAll(eventsQuery);

  events.forEach(event => {
    if (event.eventImage) {
      const imagePath = DIR_IMAGES.replace('public/', '');
      event.eventImage = `${API_URL}/${imagePath}/${event.eventImage}`;
    }
  });

  const pageInfo = {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };

  res.status(200).json({ events, ...pageInfo });
});

module.exports = getEventsController;
