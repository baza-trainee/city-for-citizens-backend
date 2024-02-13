const ctrlWrapper = require('../../helpers/ctrlWrapper');
const searchEventsService = require('../../services/searchEventsService');

const searchEventsController = ctrlWrapper(async (req, res) => {
  const { query = '', page, limit } = req.query;
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;

  const events = await searchEventsService(query, pageNumber, limitNumber);

  res.status(200).json(events);
});

module.exports = searchEventsController;
