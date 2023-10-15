const utcDateToYMD = require('../helpers/utcDateToYMD');

const databaseDataForFilters = events => {
  const eventCities = [];
  const eventDates = [];
  const eventTypes = [];

  events.forEach(event => {
    eventCities.push(event.eventAddress.city);
    eventDates.push(utcDateToYMD(event.dateTime));
    eventTypes.push(event.eventTypes[0].eventType);
  });

  const uniqueEventCities = Array.from(new Set(eventCities));
  const uniqueEventDates = Array.from(new Set(eventDates));
  const uniqueEventTypes = Array.from(new Set(eventTypes));

  const result = {
    eventCities: uniqueEventCities,
    eventDates: uniqueEventDates,
    eventTypes: uniqueEventTypes,
  };

  return result;
};

module.exports = { databaseDataForFilters };
