console.info("Test reading events start");

const db = require("../models");

async function t02() {
  const result = await db.Events.findAll();
  result.forEach((element) => {
    console.log(element.id, element.event_title);
  });
}

t02();
