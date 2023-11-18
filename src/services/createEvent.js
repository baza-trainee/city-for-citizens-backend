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
    eventType,
    eventImage,
  } = requestData;

  const eventTypesArray = eventType.split(',');
  const existingEventTypes = await Promise.all(
    eventTypesArray.map(async eventTypeName => {
      const existingEventType = await db.EventTypes.findOne({
        where: {
          eventType: eventTypeName,
          locale,
        },
      });

      if (existingEventType) {
        return existingEventType;
      } else {
        return db.EventTypes.create({
          eventType: eventTypeName,
          locale,
        });
      }
    })
  );

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
    dateTime: new Date(`${date} ${time}`),
    description,
    eventUrl,
    eventImage,
    eventAddressId: eventAddressId.id,
  };

  const newEvent = await db.Events.create(eventData);

  await Promise.all(
    existingEventTypes.map(async eventType => {
      await db.EventTypeRelationships.create({
        eventTypeId: eventType.id,
        eventId: newEvent.id,
      });
    })
  );

  return newEvent;
};

module.exports = { createEvent };
