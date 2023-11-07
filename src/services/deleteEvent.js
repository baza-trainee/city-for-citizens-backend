const db = require('../models');
const deleteImage = require('./deleteImage');

async function deleteEvent(eventId) {
  const event = await db.Events.findByPk(eventId);

  if (!event) {
    throw new Error('Event not found');
  }

  const successfullyDeletedImage = deleteImage(event.eventImage, {});
  if (!successfullyDeletedImage) {
    throw new Error('Image not found or could not be deleted');
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
