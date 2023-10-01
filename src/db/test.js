console.info("Test start");

const db = require("../db");

async function t02() {
  const result = await db.eventTypeModel.findAll();
  result.forEach((element) => {
    console.log(element.event_type);
  });
}

t02();
