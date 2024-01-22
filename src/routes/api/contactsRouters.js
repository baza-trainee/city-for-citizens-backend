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
