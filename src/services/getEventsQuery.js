const { Op, literal } = require("sequelize");
const db = require("../models");

const getEventsQuery = (query, tableAttributes = {}) => {
  const localeQuery = query.locale;
  const citiesQuery = query.city ? query.city.split(",") : [];
  const dates = query.date ? query.date.split(",") : [];
  const dateQuery = dates.map((dateString) => {
    return literal(`DATE(date_time) = DATE('${dateString}')`);
  });
  const eventTypesQuery = query.eventType ? query.eventType.split(",") : [];

  return {
    attributes: tableAttributes.eventsAttributes || [],
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
        attributes: tableAttributes.eventAddressAttributes || [],
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
        attributes: tableAttributes.eventTypesAttributes || [],
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
  };
};

module.exports = { getEventsQuery };
