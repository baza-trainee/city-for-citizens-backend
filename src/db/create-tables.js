// const Sequelize = require("sequelize");

// const dbName = process.env.DB_NAME || "city_for_citizens";
// const dbUser = process.env.DB_USER || "root";
// const dbPassword = process.env.DB_PASSWORD || "12345678";
// const dbHost = process.env.DB_HOST || "localhost";

// const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
//   dialect: "mysql",
//   host: dbHost,
//   logging: false,
// });

const {
  EventAddress,
  EventTypes,
  Events,
  EventTypeRelationships,
} = require("../models");

async function createTables() {
  console.info("Starting to create tables... Wait...");
  await EventAddress.sync({ force: false });
  await EventTypes.sync({ force: false });
  await Events.sync({ force: false });
  await EventTypeRelationships.sync({ force: false });
}

createTables()
  .then(() => {
    console.log("All tables have been created.");
  })
  .catch((error) => {
    console.error("Error creating tables:", error);
  });
