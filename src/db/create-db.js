require("dotenv").config();

const mysql = require("mysql2/promise");

const dbName = process.env.DB_NAME || "city_for_citizens";

mysql
  .createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "12345678",
  })
  .then((connection) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
      console.info("Database successfully created!");
      process.exit(0);
    });
  });
