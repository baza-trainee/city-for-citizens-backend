require('dotenv').config();
const readline = require('readline');
const mysql = require('mysql2/promise');

async function createDb() {
  try {
    const dbName = process.env.DB_NAME;
    const connection = await mysql.createConnection({
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
      await connection.query(`CREATE DATABASE ${dbName};`);

      console.info(`Database "${dbName}" successfully created!`);
    } else {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const answer = await new Promise(resolve => {
        rl.question(
          'Database already exists. Do you want to delete and recreate it? (yes/no): ',
          resolve
        );
      });

      if (answer.toLowerCase() === 'yes') {
        await connection.query(`DROP DATABASE ${dbName};`);

        await connection.query(`CREATE DATABASE ${dbName};`);
        console.info(
          `Database "${dbName}" successfully deleted and recreated!`
        );
      } else {
        console.info('Exit without any changes.');
        process.exit(0);
      }

      rl.close();
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = createDb;
