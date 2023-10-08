const { Op, literal } = require("sequelize");
const catchAsync = require("../../helpers/catchAsync");
const db = require("../../models");

const getEventsController = catchAsync(async (req, res) => {
  const { query } = req;

  const localeQuery = query.locale;
  const citiesQuery = query.city ? query.city.split(",") : [];
  const dates = query.date ? query.date.split(",") : [];
  const dateQuery = dates.map((dateString) => {
    return literal(`DATE(date_time) = DATE('${dateString}')`);
  });
  const eventTypesQuery = query.eventType ? query.eventType.split(",") : [];

  const events = await db.Events.findAll({
    where: {
      ...(localeQuery && {
        locale: localeQuery,
      }),
      ...(dateQuery.length > 0 && {
        date_time: {
          [Op.or]: dateQuery,
        },
      }),
    },
    include: [
      {
        model: db.EventAddress,
        ...(citiesQuery.length > 0 && {
          where: {
            ...(localeQuery && {
              locale: localeQuery,
            }),
            city: {
              [Op.in]: citiesQuery,
            },
          },
        }),
      },
      {
        model: db.EventTypes,
        through: {
          model: db.EventTypeRelationships,
          attributes: [],
        },
        ...(eventTypesQuery.length > 0 && {
          where: {
            ...(localeQuery && {
              locale: localeQuery,
            }),
            event_type: {
              [Op.in]: eventTypesQuery,
            },
          },
        }),
      },
    ],
  });

  res.status(200).json(events);
});

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

module.exports = {
  getEventsController,
  createEventController,
};
