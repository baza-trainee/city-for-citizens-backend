const db = require('../models');

const createEvent = async requestData => {
  const {
    idIdentifier,
    locale,
    eventTitle,
    date,
    time,
    description,
    eventUrl,
    city,
    street,
    notes,
    coordinates,
    eventTypeId,
    eventImage,
  } = requestData;

  const eventTypeIdArray = eventTypeId.split(',');

  const eventAddress = async (coordinates, locale, city, street, notes) => {
    return db.EventAddress.create({
      city,
      street,
      notes,
      coordinates,
      locale,
    });
  };

  const eventAddressId = await eventAddress(
    coordinates,
    locale,
    city,
    street,
    notes
  );

  const eventData = {
    idIdentifier,
    locale,
    eventTitle,
    dateTime: new Date(`${date} ${time} +00:00`),
    description,
    eventUrl,
    eventImage,
    eventAddressId: eventAddressId.id,
  };

  const newEvent = await db.Events.create(eventData);

  await Promise.all(
    eventTypeIdArray.map(async eventTypeID => {
      await db.EventTypeRelationships.create({
        eventId: newEvent.id,
        eventTypeId: eventTypeID,
      });
    })
  );

  return newEvent;
};

module.exports = { createEvent };
