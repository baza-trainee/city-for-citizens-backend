const db = require('../models');

async function deleteEvent(eventId) {
  const event = await db.Events.findByPk(eventId);

  if (!event) {
    throw new Error('Event not found');
  }

  await db.EventTypeRelationships.destroy({
    where: {
      eventId: eventId,
    },
  });

  await event.destroy();

  return event;
}

module.exports = { deleteEvent };
