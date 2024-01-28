const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const uploadDocumentsPdf = require('../../middlewares/uploadDocumentsPdf');
const validate = require('../../validation/validation');
const ValidationTypes = require('../../validation/validationTypes');
const { documentSchema } = require('../../validation/joi.schemas');
const getDocumentsController = require('../../controllers/documents/getDocumentsController');
const updateDocumentsController = require('../../controllers/documents/updateDocumentsController');

router.route('/').get(getDocumentsController);

router
  .route('/:id')
  .get(getDocumentsController)
  .patch(
    authMiddleware,
    uploadDocumentsPdf.single('file'),
    validate(documentSchema, ValidationTypes.BODY),
    updateDocumentsController
  );

module.exports = router;

/**
 * @swagger
 * /documents:
 *   get:
 *     summary: Get documents
 *     tags: [Documents]
 *     description: Get a list of documents or a specific document by id
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: Optional. ID of the document to retrieve.
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Document'
 *       '404':
 *         description: Not found
 *         content: {}
 *
 * /documents/{id}:
 *   get:
 *     summary: Get document by ID
 *     tags: [Documents]
 *     description: Get a document by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Document'
 *       '404':
 *         description: Not found
 *         content: {}
 *
 *   patch:
 *     summary: Update document
 *     tags: [Documents]
 *     description: Update document by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       description: Update document
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Document name
 *               file:
 *                 type: file
 *                 format: binary
 *                 description: Document file (PDF)
 *     responses:
 *       '200':
 *         description: Document updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Document updated successfully
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
 *   Document:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Document id
 *       file:
 *         type: string
 *         format: binary
 *         description: Document file (PDF)
 *       name:
 *         type: string
 *         description: Document name
 *       createdAt:
 *         type: string
 *         format: date-time
 *         description: Document creation date
 *       updatedAt:
 *         type: string
 *         format: date-time
 *         description: Document last update date
 *     required:
 *       - file
 *       - name
 */
