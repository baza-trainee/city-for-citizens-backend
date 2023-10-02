const Sequelize = require("sequelize");

const dbName = process.env.DB_NAME || "city_for_citizens";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "12345678";
const dbHost = process.env.DB_HOST || "localhost";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "mysql",
  host: dbHost,
  logging: false,
});

const eventAddressModel = require("../models/eventAddressModel")(sequelize);
const eventModel = require("../models/eventModel")(
  sequelize,
  eventAddressModel
);
const eventTypeModel = require("../models/eventTypeModel")(sequelize);
const eventTypeRelationshipModel =
  require("../models/eventTypeRelationshipModel")(sequelize);

eventAddressModel.sync({ force: false });
eventModel.sync({ force: false });
eventTypeModel.sync({ force: false });
eventTypeRelationshipModel.sync({ force: false });

console.info("Tables in DB successfully created!");
