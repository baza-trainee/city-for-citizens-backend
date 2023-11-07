const express = require('express');
const router = express.Router();
const getEventsController = require('../../controllers/events/getEventsController');
const createEventController = require('../../controllers/events/createEventController');
const updateEventController = require('../../controllers/events/updateEventController');
const deleteEventController = require('../../controllers/events/deleteEventController');
const authMiddleware = require('../../middlewares/authMiddleware');
const validate = require('../../validation/validation');
const { eventSchema, checkIdSchema } = require('../../validation/joi.schemas');
const ValidationTypes = require('../../validation/validationTypes');

router
  .route('/')
  .get(getEventsController)
  .post(
    authMiddleware,
    validate(eventSchema, ValidationTypes.BODY),
    createEventController
  );

router
  .route('/:id')
  .patch(
    authMiddleware,
    validate(checkIdSchema, ValidationTypes.PARAMS),
    validate(eventSchema, ValidationTypes.BODY),
    updateEventController
  )
  .delete(
    validate(checkIdSchema, ValidationTypes.PARAMS),
    deleteEventController
  );

module.exports = router;
