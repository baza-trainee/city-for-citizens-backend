const catchAsync = require("../../helpers/catchAsync");
const db = require("../../models");
const { getEventsQuery } = require("../../services/getEventsQuery");

const getEventsController = catchAsync(async (req, res) => {
  const { query } = req;
  const eventsQuery = getEventsQuery(query);

  const events = await db.Events.findAll(eventsQuery);

  res.status(200).json(events);
});

module.exports = getEventsController;
