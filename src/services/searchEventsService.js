const { Op } = require('sequelize');
const db = require('../models');

const searchEventsService = async (query, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await db.Events.findAndCountAll({
    where: {
      [Op.or]: [
        { eventTitle: { [Op.like]: `%${query}%` } },
        {
          dateTime: {
            [Op.substring]: query,
          },
        },
        { '$eventAddress.city$': { [Op.like]: `%${query}%` } },
        { '$eventTypes.eventType$': { [Op.like]: `%${query}%` } },
      ],
    },
    subQuery: false,
    include: [
      {
        model: db.EventAddress,
        as: 'eventAddress',
        attributes: ['city'],
      },
      {
        model: db.EventTypes,
        as: 'eventTypes',
        attributes: ['eventType'],
      },
    ],
    offset,
    limit,
  });

  return { totalPages: count, page, limit, events: rows };
};

module.exports = searchEventsService;
