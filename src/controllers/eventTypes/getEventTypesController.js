const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');

const getEventTypesController = ctrlWrapper(async (req, res) => {
  const { query = {} } = req;

  const eventTypes = await db.EventTypes.findAll({ where: query });

  res.status(200).json({ eventTypes });
});

module.exports = getEventTypesController;
