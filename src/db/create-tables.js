const {
  EventAddress,
  EventTypes,
  Events,
  EventTypeRelationships,
  Users,
  Tokens,
} = require('../models');

async function createTables() {
  try {
    console.info('Starting to create tables... Wait...');
    await EventAddress.sync({ force: false });
    await EventTypes.sync({ force: false });
    await Events.sync({ force: false });
    await EventTypeRelationships.sync({ force: false });
    await Users.sync({ force: false });
    await Tokens.sync({ force: false });
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

exports.createTables = createTables;
