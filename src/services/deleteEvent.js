const db = require('../models');
const deleteImage = require('./deleteImage');

async function deleteEvent(eventId, res) {
  const event = await db.Events.findByPk(eventId);

  if (!event) {
    throw new Error('Event not found');
  }

  const idIdentifier = event.idIdentifier;

  const events = await db.Events.findAll({
    where: {
      idIdentifier,
    },
  });

  const eventTypeRelationships = await db.EventTypeRelationships.findAll({
    where: {
      eventId: {
        [db.Sequelize.Op.in]: events.map(event => event.id),
      },
    },
  });

  const eventAddresses = await db.EventAddress.findAll({
    where: {
      id: {
        [db.Sequelize.Op.in]: events.map(event => event.eventAddressId),
      },
    },
  });

  const eventImages = await db.Events.findAll({
    where: {
      id: {
        [db.Sequelize.Op.in]: events.map(event => event.id),
      },
    },
    attributes: ['eventImage'],
  });

  await Promise.all(
    eventTypeRelationships.map(eventTypeRelationship =>
      eventTypeRelationship.destroy()
    )
  );

  await Promise.all(eventAddresses.map(eventAddress => eventAddress.destroy()));

  await Promise.all(
    eventImages.map(eventImage => deleteImage(eventImage.eventImage, res))
  );

  await Promise.all(events.map(event => event.destroy()));

  return events;
}

module.exports = { deleteEvent };
