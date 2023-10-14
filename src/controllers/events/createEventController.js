const catchAsync = require("../../helpers/catchAsync");
const db = require("../../models");

const createEventController = catchAsync(async (req, res) => {
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
  } = req.body;

  // Перебираем массив типов событий и создаем/получаем существующие
  const eventTypesArray = event_type.split(","); // Предполагаем, что типы событий разделены запятой
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
        // Если тип не существует, создаем новый
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

  // Создаем связи между событием и типами событий
  await Promise.all(
    existingEventTypes.map(async (eventType) => {
      await db.EventTypeRelationships.create({
        eventTypeId: eventType.id,
        eventId: newEvent.id,
      });
    })
  );

  res.status(201).json(newEvent);
});

module.exports = createEventController;
