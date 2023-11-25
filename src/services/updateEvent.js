const db = require('../models');

const updateEvent = async requestData => {
  const {
    idIdentifier,
    id,
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

  const existingEvent = await db.Events.findOne({
    where: {
      id,
    },
  });

  if (!existingEvent) {
    throw new Error('Event not found');
  }

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

  const eventAddress = await db.EventAddress.update(
    {
      city,
      street,
      notes,
      coordinates,
    },
    {
      where: {
        id: existingEvent.eventAddressId,
      },
    }
  );

  const updatedEventData = {
    idIdentifier,
    locale,
    eventTitle,
    dateTime: new Date(`${date} ${time} +00:00`),
    description,
    eventUrl,
    eventImage,
  };

  const updatedEvent = await existingEvent.update(updatedEventData);

  await Promise.all(
    existingEventTypes.map(async eventType => {
      await db.EventTypeRelationships.update(
        {
          eventTypeId: eventType.id,
        },
        {
          where: {
            eventId: updatedEvent.id,
          },
        }
      );
    })
  );

  return updatedEvent;
};
module.exports = updateEvent;
