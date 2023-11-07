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
