const { Op } = require('sequelize');
const db = require('../models');

const searchEventsService = async (query, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await db.Events.findAndCountAll({
    order: [['id', 'DESC']],
    where: {
      [Op.or]: [
        { eventTitle: { [Op.like]: `%${query}%` } },
        { dateTime: { [Op.substring]: query } },
      ],
    },
    include: [
      { model: db.EventAddress, attributes: ['city'] },
      {
        model: db.EventTypes,
        through: {
          model: db.EventTypeRelationships,
          attributes: [],
        },
        attributes: ['eventType'],
      },
    ],
    offset,
    limit,
    distinct: true,
  });

  return {
    limit,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    totalEvents: count,
    events: rows,
  };
};

module.exports = searchEventsService;
