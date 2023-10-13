const catchAsync = require("../../helpers/catchAsync");
const db = require("../../models");
const { getEventsQuery } = require("../../services/getEventsQuery");
const { createEvent } = require("../../services/createEvent");

const getEventsController = catchAsync(async (req, res) => {
  const { query } = req;
  const eventsQuery = getEventsQuery(query);

  const events = await db.Events.findAll(eventsQuery);

  res.status(200).json(events);
});

const createEventController = catchAsync(async (req, res) => {
  const requestData = req.body;

  const newEvent = await createEvent(requestData);

  res.status(201).json(newEvent);
});

module.exports = {
  getEventsController,
  createEventController,
};
