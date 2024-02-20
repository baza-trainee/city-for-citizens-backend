const ctrlWrapper = require('../../helpers/ctrlWrapper');
const db = require('../../models');

const deleteEventTypesControllerByIdIdentifier = ctrlWrapper(
  async (req, res) => {
    const { idIdentifier } = req.params;

    const events = await db.Events.findAll({
      where: {
        idIdentifier: idIdentifier,
      },
      attributes: ['id'],
    });

    if (events.length > 0) {
      const eventIds = events.map(event => event.id);
      return res.status(400).json({
        error: 'Some events are associated with the specified eventType',
        eventIds,
      });
    }

    await db.EventTypes.destroy({
      where: {
        idIdentifier: idIdentifier,
      },
    });

    res
      .status(200)
      .json({ status: 'success', message: 'Event types deleted successfully' });
  }
);

module.exports = deleteEventTypesControllerByIdIdentifier;
