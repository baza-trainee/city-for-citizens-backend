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
    eventTypeId,
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

  if (city || street || notes || coordinates) {
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
  }

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

  const eventTypeIdArray = eventTypeId.split(',');

  await db.EventTypeRelationships.destroy({ where: { eventId: id } });

  await Promise.all(
    eventTypeIdArray.map(async eventTypeID => {
      await db.EventTypeRelationships.create({
        eventId: updatedEvent.id,
        eventTypeId: eventTypeID,
      });
    })
  );

  return updatedEvent;
};
module.exports = updateEvent;
