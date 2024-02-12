const { Op } = require('sequelize');
const { Events, EventAddress, EventTypes } = require('../models');

const searchEventsService = async query => {
  const events = await Events.findAll({
    where: {
      [Op.or]: [
        { eventTitle: { [Op.substring]: query } },
        { '$eventAddress.city$': { [Op.substring]: query } },
        { '$eventTypes.eventType$': { [Op.substring]: query } },
        { dateTime: { [Op.substring]: query } },
      ],
    },
    include: [
      { model: EventAddress, as: 'eventAddress', attributes: ['city'] },
      { model: EventTypes, as: 'eventTypes', attributes: ['eventType'] },
    ],
  });

  return events;
};

module.exports = searchEventsService;
