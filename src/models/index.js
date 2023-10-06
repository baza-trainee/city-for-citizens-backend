require("dotenv").config();

const Sequelize = require("sequelize");

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "mysql",
  host: dbHost,
  logging: false,
});

const { EventAddress, EventTypes, Events, EventTypeRelationships } =
  require("./eventsModels")(sequelize, Sequelize);

Events.belongsToMany(EventTypes, { through: EventTypeRelationships });
EventTypes.belongsToMany(Events, { through: EventTypeRelationships });

module.exports = {
  sequelize,
  Sequelize,
  EventAddress,
  EventTypes,
  Events,
  EventTypeRelationships,
};
