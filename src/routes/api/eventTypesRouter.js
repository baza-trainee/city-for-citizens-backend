const express = require('express');

const router = express.Router();

const getEventTypesController = require('../../controllers/eventTypes/getEventTypesController');
const createEventTypesController = require('../../controllers/eventTypes/createEventTypesController');
const updateEventTypesController = require('../../controllers/eventTypes/updateEventTypesController');
const deleteEventTypesController = require('../../controllers/eventTypes/deleteEventTypesController');
const authMiddleware = require('../../middlewares/authMiddleware');
const validate = require('../../validation/validation');
const {
  checkIdSchema,
  eventTypeSchema,
} = require('../../validation/joi.schemas');
const ValidationTypes = require('../../validation/validationTypes');

router
  .route('/')
  .get(getEventTypesController)
  .post(
    authMiddleware,
    validate(eventTypeSchema, ValidationTypes.BODY),
    createEventTypesController
  );

router
  .route('/:id')
  .patch(
    authMiddleware,
    validate(checkIdSchema, ValidationTypes.PARAMS),
    validate(eventTypeSchema, ValidationTypes.BODY),
    updateEventTypesController
  )
  .delete(
    authMiddleware,
    validate(checkIdSchema, ValidationTypes.PARAMS),
    deleteEventTypesController
  );

module.exports = router;
