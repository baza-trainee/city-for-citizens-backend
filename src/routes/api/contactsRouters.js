const express = require('express');
const router = express.Router();
const getContactsController = require('../../controllers/contacts/getContactsController');
const updateContactController = require('../../controllers/contacts/updateContactController');

const authMiddleware = require('../../middlewares/authMiddleware');
const validate = require('../../validation/validation');
const ValidationTypes = require('../../validation/validationTypes');
const { contactsSchema } = require('../../validation/joi.schemas');

router
  .route('/')
  .get(getContactsController)
  .patch(
    authMiddleware,
    validate(contactsSchema, ValidationTypes.BODY),
    updateContactController
  );

module.exports = router;

/**
 * @swagger
 * securityDefinitions:
 *   Bearer:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get contacts
 *     description: Get contacts.
 *     tags: [Contacts]
 *     responses:
 *       '200':
 *         description: Successful response with contacts.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 email: info@misto-fest.fun
 *                 phone: +380675681788
 *       '404':
 *         description: Contacts not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Not found
 *   patch:
 *     summary: Update contacts
 *     description: Update contacts.
 *     tags: [Contacts]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         description: Authorization token (Bearer token).
 *         required: true
 *       - in: body
 *         name: body
 *         required: true
 *         description: Data for updating contacts.
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *     responses:
 *       '201':
 *         description: Successful update of contacts.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               email: updated@email.com
 *               phone: +987654321
 *       '401':
 *         description: Unauthorized request.
 *       '404':
 *         description: Contacts not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Not found
 */
