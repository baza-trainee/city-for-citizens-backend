const db = require('../models');

const createEvent = async requestData => {
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
    console.log(coordinates, locale)
    const optionalEvent = await db.EventAddress.findOne({
      where: {
        coordinates: coordinates,
        locale: locale,
      },
    });
    if (optionalEvent) {
      return optionalEvent;
    } else {
      return db.EventAddress.create({
        city: city,
        street: street,
        notes: notes,
        coordinates: coordinates,
        locale: locale,
      });
    }
  }
  
  const eventAddressId = await eventAddress(coordinates, locale, city, street, notes);

  const eventData = {
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
