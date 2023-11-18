require('dotenv').config();

const Sequelize = require('sequelize');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: 'mysql',
  host: dbHost,
  useUTC: false, // for reading from database
  timezone: '+00:00', // for writing to database
  logging: false,
});

const { EventAddress, EventTypes, Events, EventTypeRelationships } =
  require('./eventsModels')(sequelize, Sequelize);
const { Users } = require('./usersModel')(sequelize, Sequelize);
const { Tokens } = require('./tokenModel')(sequelize, Sequelize);

Events.belongsToMany(EventTypes, { through: EventTypeRelationships });
EventTypes.belongsToMany(Events, { through: EventTypeRelationships });
Events.belongsTo(EventAddress, { foreignKey: 'eventAddressId' });
Tokens.belongsTo(Users, { foreignKey: 'userId' });
// Events.belongsTo(EventAddress, { onDelete: 'CASCADE' });
// EventAddress.hasMany(Events, { onDelete: 'CASCADE' });

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
}

module.exports = {
  sequelize,
  Sequelize,
  EventAddress,
  EventTypes,
  Events,
  EventTypeRelationships,
  Users,
  Tokens,
  assertDatabaseConnectionOk,
};
