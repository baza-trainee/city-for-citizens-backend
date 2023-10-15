const express = require('express');
const imageMiddleware = require('../../middlewares/events/imageMiddleware');
const router = express.Router();

const {
  getEventsController,
  createEventController,
} = require("../../controllers/events");

router
  .route('/')
  .get(getEventsController)
  .post(imageMiddleware, createEventController);

module.exports = router;
