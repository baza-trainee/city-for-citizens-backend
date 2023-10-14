const catchAsync = require("../../helpers/catchAsync");
const db = require("../../models");
const utcDateToYMD = require("../../helpers/utcDateToYMD");

const getFiltersController = catchAsync(async (req, res) => {
  const { query } = req;

  const eventTypesAll = await db.EventTypes.findAll({
    attributes: ["event_type"],
    where: {
      locale: query.locale,
    },
  });
  const eventTypes = [...new Set(eventTypesAll.map((item) => item.event_type))];

  const EventCitiesAll = await db.EventAddress.findAll({
    attributes: ["city"],
    where: {
      locale: query.locale,
    },
  });
  const eventCities = [...new Set(EventCitiesAll.map((item) => item.city))];

  const EventDatesAll = await db.Events.findAll({
    attributes: ["date_time"],
    where: {
      locale: query.locale,
    },
  });

  const eventDates = [
    ...new Set(EventDatesAll.map((item) => utcDateToYMD(item.date_time))),
  ];

  res.json({ eventCities, eventDates, eventTypes });
});

module.exports = getFiltersController;
