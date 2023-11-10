const db = require('../models');
const deleteImage = require('./deleteImage');

async function deleteEvent(eventId, res) {
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

  const successfullyDeletedImage = deleteImage(event.eventImage, res);
  if (!successfullyDeletedImage) {
    throw new Error('Image not found or could not be deleted');
  }

  return event;
}

module.exports = { deleteEvent };
