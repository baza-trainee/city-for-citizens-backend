const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');
const { getEventsQuery } = require('../../services/getEventsQuery');

const getEventsController = ctrlWrapper(async (req, res) => {
  const { query } = req;

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  query.limit = limit;
  query.offset = (page - 1) * limit;

  const eventsQuery = getEventsQuery(query);

  const { count, rows: events } = await db.Events.findAndCountAll(eventsQuery);

  const pageInfo = {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };

  res.status(200).json({ events, ...pageInfo });
});

module.exports = getEventsController;
