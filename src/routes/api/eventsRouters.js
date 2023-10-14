const express = require("express");

const router = express.Router();

const {
  getEventsController,
  createEventController,
} = require("../../controllers/events");

router.route("/").get(getEventsController).post(createEventController);

module.exports = router;
