const express = require('express');
const router = express.Router();
const getPartnersController = require('../../controllers/partners/getPartnersController');
const createPartnerController = require('../../controllers/partners/createPartnerController');
const updatePartnerController = require('../../controllers/partners/updatePartnerController');
const deletePartnerController = require('../../controllers/partners/deletePartnerController');
const authMiddleware = require('../../middlewares/authMiddleware');
const uploadSingleFile = require('../../middlewares/uploadSingleFile');
const validate = require('../../validation/validation');
const ValidationTypes = require('../../validation/validationTypes');
const { partnerSchema } = require('../../validation/joi.schemas');

router
  .route('/')
  .get(getPartnersController)
  .post(
    authMiddleware,
    uploadSingleFile('image'),
    validate(partnerSchema, ValidationTypes.BODY),
    createPartnerController
  );

router
  .route('/:id')
  .patch(
    authMiddleware,
    uploadSingleFile('image'),
    validate(partnerSchema, ValidationTypes.BODY),
    updatePartnerController
  )
  .delete(authMiddleware, deletePartnerController);

module.exports = router;

/**
 * @swagger
 * /partners:
 *   get:
 *     summary: Get partners
 *     tags: [Partners]
 *     description: Get a list of partners or a specific partner by id
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: Optional. ID of the partner to retrieve.
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Partner'
 *       '404':
 *         description: Not found
 *         content: {}
 *
 *   post:
 *     summary: Create a new partner
 *     tags: [Partners]
 *     description: Create a new partner
 *     parameters: []
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       description: Create a new partner
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Partner name
 *               link:
 *                 type: string
 *                 description: Partner link
 *               image:
 *                 type: file
 *                 format: binary
 *                 description: Partner image
 *     responses:
 *       '200':
 *         description: Partner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Partner created successfully
 *       '400':
 *         description: Bad request (invalid request body)
 *         content: {}
 *       '401':
 *         description: Not authorized
 *         content: {}
 *
 * /partners/{id}:
 *   patch:
 *     summary: Update partner
 *     tags: [Partners]
 *     description: Update partner by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       description: Update partner
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Partner name
 *               link:
 *                 type: string
 *                 description: Partner link
 *               image:
 *                 type: file
 *                 format: binary
 *                 description: Partner image
 *     responses:
 *       '200':
 *         description: Partner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Partner updated successfully
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
 *     summary: Delete partner
 *     tags: [Partners]
 *     description: Delete partner by id
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
 *         description: Partner deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Partner deleted successfully
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
 *   Partner:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Partner id
 *       name:
 *         type: string
 *         description: Partner name
 *       link:
 *         type: string
 *         description: Partner link
 *       image:
 *         type: string
 *         description: Partner image filename
 *     required:
 *       - name
 *       - image
 */
