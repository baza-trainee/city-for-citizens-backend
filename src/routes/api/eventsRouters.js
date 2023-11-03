const express = require('express');
const router = express.Router();
const getEventsController = require('../../controllers/events/getEventsController');
const createEventController = require('../../controllers/events/createEventController');
const updateEventController = require('../../controllers/events/updateEventController');
const deleteEventController = require('../../controllers/events/deleteEventController');

router.route('/').get(getEventsController).post(createEventController);

router.route('/:id').patch(updateEventController).delete(deleteEventController);

module.exports = router;
