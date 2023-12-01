require('dotenv').config();

const mysql = require('mysql2/promise');

async function createDb() {
  try {
    const dbName = process.env.DB_NAME;
    const connection = await mysql.createConnection({
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    console.info('Checking if the database exists...');

    const [results] = await connection.query(
      `SHOW DATABASES LIKE '${dbName}';`
    );

    if (results.length === 0) {
      // Если база данных не существует, создаем ее
      await connection.query(`CREATE DATABASE ${dbName};`);
      console.info(`Database "${dbName}" successfully created!`);
    } else {
      // Если база данных существует, выводим сообщение об этом
      console.info(`Database "${dbName}" already exists.`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = createDb;
