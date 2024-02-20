const { Op, literal } = require('sequelize');
const db = require('../models');

const getEventsQuery = (query, tableAttributes = {}) => {
  const idQuery = query.id ? query.id.split(',') : [];
  const localeQuery = query.locale;
  const citiesQuery = query.city ? query.city.split(',') : [];
  const dates = query.date ? query.date.split(',') : [];
  const dateQuery = dates.map(dateString => {
    return literal(`DATE(dateTime) = DATE('${dateString}')`, db.Sequelize.DATE);
  });
  const eventTypesQuery = query.eventType ? query.eventType.split(',') : [];

  return {
    order: [['id', 'DESC']],
    attributes: tableAttributes.eventsAttributes || null,

    where: {
      ...(localeQuery && {
        locale: localeQuery,
      }),
      ...(idQuery.length > 0 && {
        id: idQuery,
      }),
      ...(dateQuery.length > 0 && {
        dateTime: {
          [Op.or]: dateQuery,
        },
      }),
    },
    include: [
      {
        model: db.EventAddress,
        attributes: tableAttributes.eventAddressAttributes || null,
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
        attributes: tableAttributes.eventTypesAttributes || null,
        ...(eventTypesQuery.length > 0 && {
          where: {
            ...(localeQuery && {
              locale: localeQuery,
            }),
            eventType: {
              [Op.in]: eventTypesQuery,
            },
          },
        }),
      },
    ],
  };
};

module.exports = { getEventsQuery };
