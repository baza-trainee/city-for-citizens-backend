const express = require('express');

const router = express.Router();

const {
  getEventTypesController,
  getEventTypesControllerByIdIdentifier,
} = require('../../controllers/eventTypes/getEventTypesController');
const createEventTypesController = require('../../controllers/eventTypes/createEventTypesController');
const updateEventTypesController = require('../../controllers/eventTypes/updateEventTypesController');
const deleteEventTypesController = require('../../controllers/eventTypes/deleteEventTypesController');
const authMiddleware = require('../../middlewares/authMiddleware');
const validate = require('../../validation/validation');
const {
  checkIdIdentifierSchema,
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
  .route('/:idIdentifier')
  .get(
    validate(checkIdIdentifierSchema, ValidationTypes.PARAMS),
    getEventTypesControllerByIdIdentifier
  )
  .patch(
    authMiddleware,
    validate(checkIdIdentifierSchema, ValidationTypes.PARAMS),
    validate(eventTypeSchema, ValidationTypes.BODY),
    updateEventTypesController
  )
  .delete(
    authMiddleware,
    validate(checkIdIdentifierSchema, ValidationTypes.PARAMS),
    deleteEventTypesController
  );

module.exports = router;

/**
 * @swagger
 * /event-types:
 *   post:
 *     summary: Create event types
 *     tags: [EventTypes]
 *     description: Create event types for both Ukrainian and English locales
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventTypeUkr:
 *                 type: string
 *               eventTypeEng:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Event types created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 newEventTypeUkr:
 *                   $ref: '#/components/schemas/EventType'
 *                 newEventTypeEng:
 *                   $ref: '#/components/schemas/EventType'
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /event-types:
 *   get:
 *     summary: Get event types
 *     description: Retrieves event types based on filters like ID, identifier, type, and locale
 *     tags: [EventTypes]
 *     parameters:
 *       - in: query
 *         name: id
 *         description: Comma-separated list of event type IDs
 *         schema:
 *           type: string
 *       - in: query
 *         name: idIdentifier
 *         description: Event type identifier
 *         schema:
 *           type: string
 *       - in: query
 *         name: eventType
 *         description: Event type name
 *         schema:
 *           type: string
 *       - in: query
 *         name: locale
 *         description: Locale code (e.g., 'uk_UA', 'en_US')
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: The page number for pagination
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         description: The maximum number of items per page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eventTypes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EventType'
 *                 limit:
 *                   type: integer
 *                   description: The maximum number of items per page
 *                 page:
 *                   type: integer
 *                   description: The current page number
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages
 *                 totalEventTypes:
 *                   type: integer
 *                   description: The total number of event types
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /event-types/{idIdentifier}:
 *   get:
 *     summary: Get event types by ID identifier
 *     tags: [EventTypes]
 *     description: Get event types by the specified ID identifier
 *     parameters:
 *       - in: path
 *         name: idIdentifier
 *         description: Event type identifier
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventType'
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /event-types/{idIdentifier}:
 *   put:
 *     summary: Update event types by ID identifier
 *     tags: [EventTypes]
 *     description: Update event types by the specified ID identifier
 *     parameters:
 *       - in: path
 *         name: idIdentifier
 *         description: Event type identifier
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventTypeUkr:
 *                 type: string
 *               eventTypeEng:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Event types updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /event-types/{idIdentifier}:
 *   delete:
 *     summary: Delete event types by ID identifier
 *     tags: [EventTypes]
 *     description: Delete event types by the specified ID identifier
 *     parameters:
 *       - in: path
 *         name: idIdentifier
 *         description: Event type identifier
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event types deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       '400':
 *         description: Some events are associated with the specified eventType
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 eventIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EventType:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         idIdentifier:
 *           type: string
 *         eventType:
 *           type: string
 *         locale:
 *           type: string
 */
