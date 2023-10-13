const catchAsync = require("../../helpers/catchAsync");
const db = require("../../models");
const { getEventsQuery } = require("../../services/getEventsQuery");
const {
  databaseDataForFilters,
} = require("../../services/databaseDataForFilters");

const getFiltersController = catchAsync(async (req, res) => {
  const { query } = req;
  const tableAttributes = {
    eventsAttributes: ["date_time"],
    eventAddressAttributes: ["city"],
    eventTypesAttributes: ["event_type"],
  };

  const eventsQuery = getEventsQuery(query, tableAttributes);

  const events = databaseDataForFilters(await db.Events.findAll(eventsQuery));

  res.status(200).json(events);
});

module.exports = {
  getFiltersController,
};
