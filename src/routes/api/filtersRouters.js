const express = require('express');

const router = express.Router();

const { getFiltersController } = require('../../controllers/filters');

router.route('/').get(getFiltersController);

module.exports = router;

/**
 * @swagger
 * /filters:
 *   get:
 *     summary: Get filters data
 *     description: Get data for filling filters on the main page
 *     tags: [Filters]
 *     parameters:
 *       - in: query
 *         name: locale
 *         schema:
 *           type: string
 *         description: Locale of the filter request (uk_UA / en_US).
 *         example: uk_UA
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: List of cities (comma-separated) to filter events.
 *         example: Київ
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: List of dates (comma-separated) to filter events.
 *         example: 2023-04-15
 *       - in: query
 *         name: eventType
 *         schema:
 *           type: string
 *         description: List of event types (comma-separated) to filter events.
 *         example: Квітковий фестиваль
 *     responses:
 *       '200':
 *         description: Success.
 *       '404':
 *         description: Not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Not found
 */
