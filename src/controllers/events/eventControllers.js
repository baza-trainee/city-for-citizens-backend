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

  res.json(events);
});

module.exports = {
  getEventsController,
};
