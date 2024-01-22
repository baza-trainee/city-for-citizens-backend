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
    uploadSingleFile('file'),
    validate(partnerSchema, ValidationTypes.BODY),
    createPartnerController
  );

router
  .route('/:id')
  .patch(
    authMiddleware,
    uploadSingleFile('file'),
    validate(partnerSchema, ValidationTypes.BODY),
    updatePartnerController
  )
  .delete(authMiddleware, deletePartnerController);

module.exports = router;
