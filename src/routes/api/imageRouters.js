const express = require('express');
const router = express.Router();
const createImageController = require('../../controllers/image/createImageController');
const deleteImageController = require('../../controllers/image/deleteImageController');
const authMiddleware = require('../../middlewares/authMiddleware');
const ValidationTypes = require('../../validation/validationTypes');
const { eventImageSchema } = require('../../validation/joi.schemas');
const validate = require('../../validation/validation');

router
  .route('/')
  .post(authMiddleware, createImageController)
  .delete(
    authMiddleware,
    validate(eventImageSchema, ValidationTypes.BODY),
    deleteImageController
  );

module.exports = router;

/**
 * @swagger
 * /image:
 *   post:
 *     summary: Event image
 *     tags: [Image]
 *     description: Upload event image
 *     parameters: []
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       description: Event image (multipart/form-data)
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               eventImage:
 *                 type: file
 *                 format: binary
 *                 description: Event image
 *     responses:
 *       201:
 *         description: Successful operation, event image created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eventImage:
 *                   type: string
 *                   description: Event image
 *                   example: event1697920509934.jpg

 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}

 *       401:
 *         description: Not authorized (email or password is wrong)
 *         content: {}

 *       404:
 *         description: Not found
 *         content: {}

 *   delete:
 *     summary: Delete image
 *     tags: [Image]
 *     description: Delete event image
 *     parameters: []
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       description: Delete image
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventImage:
 *                 type: string
 *                 description: Event image
 *     responses:
 *       200:
 *         description: Successful operation, event image deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Image deleted successfully
 *                   example: Image deleted successfully

 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}

 *       401:
 *         description: Not authorized (email or password is wrong)
 *         content: {}

 *       404:
 *         description: Not found
 *         content: {}
 */
