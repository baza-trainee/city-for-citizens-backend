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

/**
 * @swagger
 * /eventTypes:
 *   get:
 *     summary: Get event types
 *     tags: [EventTypes]
 *     description: Get a list of event types based on query parameters
 *     parameters:
 *       - in: query
 *         name: eventType
 *         schema:
 *           type: string
 *         description: Optional. Filter by event type.
 *       - in: query
 *         name: locale
 *         schema:
 *           type: string
 *         description: Optional. Filter by locale.
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eventTypes:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/EventType'
 *       '404':
 *         description: Not found
 *         content: {}
 *
 *   post:
 *     summary: Create event type
 *     tags: [EventTypes]
 *     description: Create a new event type
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       description: Event type data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/EventTypeInput'
 *     responses:
 *       '201':
 *         description: Event type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newEventType:
 *                   $ref: '#/definitions/EventType'
 *       '400':
 *         description: Bad request (invalid request body)
 *         content: {}
 *       '401':
 *         description: Not authorized
 *         content: {}
 *
 * /eventTypes/{id}:
 *   patch:
 *     summary: Update event type
 *     tags: [EventTypes]
 *     description: Update event type by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       description: Update event type data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/EventTypeInput'
 *     responses:
 *       '200':
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Successfully updated
 *       '400':
 *         description: Bad request (invalid request body)
 *         content: {}
 *       '401':
 *         description: Not authorized
 *         content: {}
 *       '404':
 *         description: Not found
 *         content: {}
 *
 *   delete:
 *     summary: Delete event type
 *     tags: [EventTypes]
 *     description: Delete event type by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - Bearer: []
 *     responses:
 *       '200':
 *         description: Successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Successfully deleted
 *       '400':
 *         description: Bad request (invalid request body)
 *         content: {}
 *       '401':
 *         description: Not authorized
 *         content: {}
 *       '404':
 *         description: Not found
 *         content: {}
 */

/**
 * @swagger
 * definitions:
 *   EventType:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Event type id
 *       eventType:
 *         type: string
 *         description: Event type name
 *       locale:
 *         type: string
 *         description: Event type locale
 *     required:
 *       - eventType
 *       - locale
 *
 *   EventTypeInput:
 *     type: object
 *     properties:
 *       eventType:
 *         type: string
 *         description: Event type name
 *       locale:
 *         type: string
 *         description: Event type locale
 *     required:
 *       - eventType
 *       - locale
 */
