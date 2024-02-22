const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');

const analyticsEventsController = ctrlWrapper(async (req, res) => {
  const eventsCountByType = await db.EventTypeRelationships.findAll({
    attributes: ['eventTypeId', [db.sequelize.fn('COUNT', '*'), 'count']],
    include: [
      {
        model: db.EventTypes,
        attributes: ['eventType'],
      },
    ],
    group: ['eventTypeId'],
  });

  const formattedResult = eventsCountByType.map(event => ({
    eventTypeId: event.eventTypeId,
    eventType: event.eventType.eventType,
    count: event.dataValues.count,
  }));

  return res.json({ status: 'success', code: 200, data: formattedResult });
});

module.exports = analyticsEventsController;
