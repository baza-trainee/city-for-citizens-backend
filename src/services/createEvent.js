const db = require('../models');

const createEvent = async (requestData, imageFilePath) => {
  const eventImage = imageFilePath;
  const {
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

  const eventAddress = await db.EventAddress.create({
    city,
    street,
    notes,
    coordinates,
    locale,
  });

  const eventAddressId = eventAddress.id;

  const eventData = {
    locale,
    eventTitle,
    dateTime: new Date(`${date} ${time}`),
    description,
    eventUrl,
    eventImage,
    eventAddressId: eventAddressId,
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
