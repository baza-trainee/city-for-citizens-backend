const express = require("express");

const router = express.Router();

const {
  getEventsController,
} = require("../../controllers/events/eventControllers");

router.route("/").get(getEventsController);

module.exports = router;
