const createDb = require('./create-db');
const { createTables } = require('./create-tables');
const { insertData } = require('./upload-testdata');

async function setup() {
  try {
    await createDb();
    await createTables();
    await insertData();
    console.log('All done!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }

  process.exit(0);
}

setup();
