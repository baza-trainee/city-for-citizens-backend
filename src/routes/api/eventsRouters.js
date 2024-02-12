const express = require('express');
const router = express.Router();
const getEventsController = require('../../controllers/events/getEventsController');
const searchEventsController = require('../../controllers/events/searchEventsController');
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
    authMiddleware,
    validate(checkIdSchema, ValidationTypes.PARAMS),
    deleteEventController
  );
router.route('/search').get(searchEventsController);

module.exports = router;

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieve a list of events
 *     tags: [Events]
 *     description: Get a list of events
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The maximum number of events per page
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Comma-separated list of event IDs
 *       - in: query
 *         name: locale
 *         schema:
 *           type: string
 *         description: Locale filter for events
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Comma-separated list of cities to filter events by
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Comma-separated list of dates in YYYY-MM-DD format to filter events by
 *       - in: query
 *         name: eventType
 *         schema:
 *           type: string
 *         description: Comma-separated list of event types to filter events by
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Event'
 *                 totalItems:
 *                   type: integer
 *                   description: Total number of events matching the query
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages for pagination
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number
 *       '400':
 *         description: Bad request
 *         content: {}
 *       '404':
 *         description: Not found
 *         content: {}
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     description: Create a new event
 *     parameters: []
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       description: Create a new event
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/EventInput'
 *     responses:
 *       '201':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Event'
 *       '400':
 *         description: Bad request
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
 * /events/{id}:
 *   patch:
 *     summary: Update event
 *     tags:
 *       - Events
 *     description: Update event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 26
 *         schema:
 *           minimum: 1
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       description: Update event
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Event'
 *     responses:
 *       '201':
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Event'
 *       '400':
 *         description: Bad request
 *         content: {}
 *       '401':
 *         description: Not authorized
 *         content: {}
 *       '404':
 *         description: Not found
 *         content: {}
 *   delete:
 *     summary: Delete event
 *     tags: [Events]
 *     description: Delete event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "33"
 *         schema:
 *           minimum: 1
 *     security:
 *       - Bearer: []
 *     responses:
 *       '200':
 *         description: Successful operation, event is deleted
 *         content: {}
 *       '400':
 *         description: Bad request
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
 *   Event:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         description: Event id
 *         example: 26
 *       idIdentifier:
 *         type: string
 *         description: Event idIdentifier
 *         example: "450e8400-e29b-41d4-a716-446655440002"
 *       locale:
 *         type: string
 *         description: Event locale
 *         example: "uk_UA"
 *       eventTitle:
 *         type: string
 *         description: Event title
 *         example: "Test2"
 *       dateTime:
 *         type: string
 *         description: Event date, time
 *         example: "2023-11-11T21:00:00.000Z"
 *       description:
 *         type: string
 *         description: Event description
 *         example: "test descr"
 *       eventUrl:
 *         type: string
 *         description: Event URL
 *         example: "http://halabuda.com"
 *       eventImage:
 *         type: string
 *         description: Event image
 *         example: "event1699392850184.jpg"
 *       eventAddressId:
 *         type: number
 *         description: Event address id
 *         example: 5
 *
 *   EventInput:
 *     type: object
 *     properties:
 *       locale:
 *         type: string
 *         description: Event locale
 *         example: "uk_UA"
 *       idIdentifier:
 *         type: string
 *         description: Event idIdentifier
 *         example: "450e8400-e29b-41d4-a716-446655440002"
 *       eventTitle:
 *         type: string
 *         description: Event title
 *         example: "Test2"
 *       date:
 *         type: string
 *         description: Event date
 *         example: "2023-11-11"
 *       time:
 *         type: string
 *         description: Event time
 *         example: "21:00"
 *       description:
 *         type: string
 *         description: Event description
 *         example: "test descr"
 *       eventUrl:
 *         type: string
 *         description: Event URL
 *         example: "http://halabuda.com"
 *       city:
 *         type: string
 *         description: Event city
 *         example: "Бердянськ"
 *       street:
 *         type: string
 *         description: Event street
 *         example: "Степана Будного, 12"
 *       notes:
 *         type: string
 *         description: Event notes
 *         example: "Біля гаражу Петровича"
 *       coordinates:
 *         type: string
 *         description: Event coordinates
 *         example: "4.495527393122916, -97.8298257793932"
 *       eventType:
 *         type: string
 *         description: Event type
 *         example: "Посиденьки"
 *       eventImage:
 *         type: string
 *         description: Event image
 *         example: "event1699392850184.jpg"
 *
 *   EventAddress:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         description: Event address id
 *         example: 5
 *       city:
 *         type: string
 *         description: Event city
 *         example: "Бердянськ"
 *       street:
 *         type: string
 *         description: Event street
 *         example: "Степана Будного, 12"
 *       notes:
 *         type: string
 *         description: Event notes
 *         example: "Біля гаражу Петровича"
 *       coordinates:
 *         type: string
 *         description: Event coordinates
 *         example: "4.495527393122916, -97.8298257793932"
 *       locale:
 *         type: string
 *         description: Event locale
 *         example: "uk_UA"
 *
 *   EventTypes:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         description: Event type id
 *         example: 1
 *       eventType:
 *         type: string
 *         description: Event type
 *         example: "Посиденьки"
 *       locale:
 *         type: string
 *         description: Event locale
 *         example: "uk_UA"
 */

/**
 * @swagger
 * /events/search:
 *   get:
 *     summary: Search for events
 *     tags: [Events]
 *     description: Search for events based on a query string
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: The query string to search for events
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Event'
 *       '400':
 *         description: Bad request
 *         content: {}
 *       '404':
 *         description: Not found
 *         content: {}
 */
