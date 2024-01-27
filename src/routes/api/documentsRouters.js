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
    uploadDocumentsPdf.single('file'),
    validate(documentSchema, ValidationTypes.BODY),
    updateDocumentsController
  );

module.exports = router;
