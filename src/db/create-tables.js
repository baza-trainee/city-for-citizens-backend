const {
  EventAddress,
  EventTypes,
  Events,
  EventTypeRelationships,
} = require('../models');

async function createTables() {
  console.info('Starting to create tables... Wait...');
  await EventAddress.sync({ force: false });
  await EventTypes.sync({ force: false });
  await Events.sync({ force: false });
  await EventTypeRelationships.sync({ force: false });
}

createTables()
  .then(() => {
    console.log('All tables have been created.');
  })
  .catch(error => {
    console.error('Error creating tables:', error);
  });
