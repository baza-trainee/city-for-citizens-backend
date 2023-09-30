const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DBHOST || "localhost",
  port: process.env.DBPORT || 3306,
  database: process.env.DB || "city_for_citizens",
  username: process.env.DBUSER || "root",
  password: process.env.DBPASSWORD || "",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
