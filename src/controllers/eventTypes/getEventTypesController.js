const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');
const { Op } = require('sequelize');

const getEventTypesController = ctrlWrapper(async (req, res) => {
  const { id, idIdentifier, eventType, locale } = req.query;
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

  const eventTypes = await db.EventTypes.findAll({
    order: [['id', 'DESC']],
    where: whereCondition,
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
