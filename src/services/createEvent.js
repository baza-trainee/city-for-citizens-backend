const db = require("../models");

const createEvent = async (requestData) => {
  const {
    locale,
    event_title,
    date,
    time,
    description,
    event_url,
    event_image,
    city,
    street,
    notes,
    coordinates,
    event_type,
  } = requestData;

  const eventTypesArray = event_type.split(",");
  const existingEventTypes = await Promise.all(
    eventTypesArray.map(async (eventTypeName) => {
      const existingEventType = await db.EventTypes.findOne({
        where: {
          event_type: eventTypeName,
          locale,
        },
      });

      if (existingEventType) {
        return existingEventType;
      } else {
        return db.EventTypes.create({
          event_type: eventTypeName,
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
    event_title,
    date_time: new Date(`${date} ${time}`),
    description,
    event_url,
    event_image,
    event_address_id: eventAddressId,
  };

  const newEvent = await db.Events.create(eventData);

  await Promise.all(
    existingEventTypes.map(async (eventType) => {
      await db.EventTypeRelationships.create({
        eventTypeId: eventType.id,
        eventId: newEvent.id,
      });
    })
  );

  return newEvent;
};

module.exports = { createEvent };
