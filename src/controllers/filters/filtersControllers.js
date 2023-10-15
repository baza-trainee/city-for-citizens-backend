const catchAsync = require('../../helpers/catchAsync');
const db = require('../../models');
const { getEventsQuery } = require('../../services/getEventsQuery');
const {
  databaseDataForFilters,
} = require('../../services/databaseDataForFilters');

const getFiltersController = catchAsync(async (req, res) => {
  const { query } = req;
  const tableAttributes = {
    eventsAttributes: ['date_time'],
    eventAddressAttributes: ['city'],
    eventTypesAttributes: ['eventType'],
  };

  const eventsQuery = getEventsQuery(query, tableAttributes);

  const events = databaseDataForFilters(await db.Events.findAll(eventsQuery));

  if (
    events.eventCities.length === 0 &&
    events.eventDates.length === 0 &&
    events.eventTypes.length === 0
  ) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(events);
});

module.exports = {
  getFiltersController,
};
