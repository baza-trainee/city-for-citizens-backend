const ctrlWrapper = require('../../helpers/ctrlWrapper');
const searchEventsService = require('../../services/searchEventsService');

const searchEventsController = ctrlWrapper(async (req, res) => {
  const { query } = req.query;

  const events = await searchEventsService(query);

  res.status(200).json({ events });
});

module.exports = searchEventsController;
