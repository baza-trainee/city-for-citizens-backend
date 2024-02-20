const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');
const { Op } = require('sequelize');

const getEventTypesController = ctrlWrapper(async (req, res) => {
  const { id, idIdentifier, eventType, locale, limit, page } = req.query;
  const whereCondition = {};

  if (id) {
    const idsArray = id.split(',').map(id => parseInt(id.trim()));
    whereCondition.id = {
      [Op.in]: idsArray,
    };
  }

  if (idIdentifier) {
    whereCondition.idIdentifier = idIdentifier;
  }
  if (eventType) {
    whereCondition.eventType = eventType;
  }
  if (locale) {
    whereCondition.locale = locale;
  }
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const offset = (pageNumber - 1) * limitNumber;

  const eventTypes = await db.EventTypes.findAll({
    order: [['id', 'DESC']],
    where: whereCondition,
    limit: limitNumber,
    offset: offset,
  });

  res.status(200).json({ eventTypes });
});

const getEventTypesControllerByIdIdentifier = ctrlWrapper(async (req, res) => {
  const { idIdentifier } = req.params;

  const eventTypes = await db.EventTypes.findAll({
    where: {
      idIdentifier: idIdentifier,
    },
    order: [['locale', 'DESC']],
  });

  res.status(200).json({ eventTypes });
});

module.exports = {
  getEventTypesController,
  getEventTypesControllerByIdIdentifier,
};
