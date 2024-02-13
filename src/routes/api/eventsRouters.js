const express = require('express');
const router = express.Router();
const {
  getEventsController,
  getEventsById,
} = require('../../controllers/events/getEventsController');
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
  .get(validate(checkIdSchema, ValidationTypes.PARAMS), getEventsById)
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
router.route('/search/find').get(searchEventsController);

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
 * /events/{id}:
 *   get:
 *     summary: Get information about events by their identifiers
 *     tags: [Events]
 *     description: >
 *       Returns information about two events based on their identifiers.
 *       Both events should have the same idIdentifier to identify the event in different languages.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Event identifier.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful request. Information about two events is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *               example:
 *                 - id: 1
 *                   idIdentifier: "550e8400-e29b-41d4-a716-446655440000"
 *                   eventTitle: "Exhibition of Tulips at Singing Field"
 *                   dateTime: "2023-04-15T06:30:45.000Z"
 *                   description: "Usually held from mid-April to mid-May, depending on the weather. In addition to tulips, atmospheric thematic installations are usually added, with a new theme every year."
 *                   eventUrl: "https://www.facebook.com/singingfield"
 *                   eventImage: ""
 *                   eventAddressId: 1
 *                   locale: "en_US"
 *                   eventAddress:
 *                     id: 1
 *                     city: "Kyiv"
 *                     street: "Lavrska St, 31"
 *                     notes: "The Singing Field is located on the Pechersk Hills on the right bank of the Dnipro River, near the museum-monument Motherland."
 *                     coordinates: "50.4302484,30.4936464"
 *                     locale: "en_US"
 *                   eventTypes:
 *                     - id: 1
 *                       eventType: "Flower Festival"
 *                       locale: "en_US"
 *                 - id: 2
 *                   idIdentifier: "550e8400-e29b-41d4-a716-446655440001"
 *                   eventTitle: "Example Event Title"
 *                   dateTime: "2023-05-20T08:00:00.000Z"
 *                   description: "Example event description."
 *                   eventUrl: ""
 *                   eventImage: ""
 *                   eventAddressId: 2
 *                   locale: "en_US"
 *                   eventAddress:
 *                     id: 2
 *                     city: "Example City"
 *                     street: "Example Street, 123"
 *                     notes: "Example address notes."
 *                     coordinates: "51.1234,45.6789"
 *                     locale: "en_US"
 *                   eventTypes:
 *                     - id: 2
 *                       eventType: "Example Event Type"
 *                       locale: "en_US"
 *       '404':
 *         description: Event not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Event identifier.
 *         idIdentifier:
 *           type: string
 *           description: Event identifier for identifying the event in different languages.
 *         eventTitle:
 *           type: string
 *           description: Event title.
 *         dateTime:
 *           type: string
 *           format: date-time
 *           description: Date and time of the event.
 *         description:
 *           type: string
 *           description: Event description.
 *         eventUrl:
 *           type: string
 *           description: Event URL.
 *         eventImage:
 *           type: string
 *           description: Event image.
 *         eventAddressId:
 *           type: integer
 *           description: Event address identifier.
 *         locale:
 *           type: string
 *           description: Event locale.
 *         eventAddress:
 *           $ref: '#/components/schemas/EventAddress'
 *         eventTypes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/EventType'
 *     EventAddress:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Address identifier.
 *         city:
 *           type: string
 *           description: City.
 *         street:
 *           type: string
 *           description: Street.
 *         notes:
 *           type: string
 *           description: Address notes.
 *         coordinates:
 *           type: string
 *           description: Address coordinates.
 *         locale:
 *           type: string
 *           description: Address locale.
 *     EventType:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Event type identifier.
 *         eventType:
 *           type: string
 *           description: Event type.
 *         locale:
 *           type: string
 *           description: Event type locale.
 */

/**
 * @swagger
 * /events/search/find:
 *   get:
 *     summary: Search events
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: String to search for events
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number of results
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Successful response, returns a list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 page:
 *                   type: integer
 *                   description: Current page
 *                 limit:
 *                   type: integer
 *                   description: Results limit per page
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Unique identifier of the event
 *                       idIdentifier:
 *                         type: string
 *                         description: Unique identifier of the event in UUID format
 *                       eventTitle:
 *                         type: string
 *                         description: Title of the event
 *                       dateTime:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time of the event
 *                       description:
 *                         type: string
 *                         description: Description of the event
 *                       eventUrl:
 *                         type: string
 *                         description: URL of the event
 *                       eventImage:
 *                         type: string
 *                         description: URL of the event image
 *                       eventAddressId:
 *                         type: integer
 *                         description: Unique identifier of the event address
 *                       locale:
 *                         type: string
 *                         description: Locale of the event
 *                       eventAddress:
 *                         type: object
 *                         properties:
 *                           city:
 *                             type: string
 *                             description: City of the event
 *                       eventTypes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             eventType:
 *                               type: string
 *                               description: Type of the event
 *                             eventTypeRelationships:
 *                               type: object
 *                               properties:
 *                                 eventId:
 *                                   type: integer
 *                                   description: Unique identifier of the event
 *                                 eventTypeId:
 *                                   type: integer
 *                                   description: Unique identifier of the event type
 */
