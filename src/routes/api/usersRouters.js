const express = require('express');
const router = express.Router();
const validate = require('../../validation/validation');
const {
  loginSchema,
  registrationSchema,
  passwordResetRequestSchema,
  passwordResetSchema,
  refreshTokenSchema,
  activationLinkSchema,
} = require('../../validation/joi.schemas');
const ValidationTypes = require('../../validation/validationTypes');

const authMiddleware = require('../../middlewares/authMiddleware');
const ctrlWrapper = require('../../helpers/ctrlWrapper');
const {
  registrationCtrl,
  loginCtrl,
  logoutCtrl,
  activateCtrl,
  refreshCtrl,
  getUsersCtrl,
  passwordResetRequestCtrl,
  passwordResetCtrl,
} = require('../../controllers/users/userControllers');

router.post(
  '/registration',
  validate(registrationSchema, ValidationTypes.BODY),
  ctrlWrapper(registrationCtrl)
);
router.post(
  '/login',
  validate(loginSchema, ValidationTypes.BODY),
  ctrlWrapper(loginCtrl)
);
router.post(
  '/logout',
  validate(refreshTokenSchema, ValidationTypes.COOKIES),
  ctrlWrapper(logoutCtrl)
);
router.get(
  '/activate/:link',
  validate(activationLinkSchema, ValidationTypes.PARAMS),
  ctrlWrapper(activateCtrl)
);
router.get(
  '/refresh',
  validate(refreshTokenSchema, ValidationTypes.COOKIES),
  ctrlWrapper(refreshCtrl)
);
router.get('/users', authMiddleware, ctrlWrapper(getUsersCtrl));
router.post(
  '/passwordReset/request',
  validate(passwordResetRequestSchema, ValidationTypes.BODY),
  ctrlWrapper(passwordResetRequestCtrl)
);
router.post(
  '/passwordReset/reset',
  validate(passwordResetSchema, ValidationTypes.BODY),
  ctrlWrapper(passwordResetCtrl)
);
module.exports = router;
