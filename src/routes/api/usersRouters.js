const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

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
  deleteUserCtrl,
} = require('../../controllers/users/userControllers');

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  ctrlWrapper(registrationCtrl)
);

router.post('/login', ctrlWrapper(loginCtrl));
router.post('/logout', ctrlWrapper(logoutCtrl));
router.get('/activate/:link', ctrlWrapper(activateCtrl));
router.get('/refresh', ctrlWrapper(refreshCtrl));
router.get('/users', authMiddleware, ctrlWrapper(getUsersCtrl));
router.post('/passwordReset/request', ctrlWrapper(passwordResetRequestCtrl));
router.post('/passwordReset/reset', ctrlWrapper(passwordResetCtrl));

router.delete('/users/:userId', authMiddleware, ctrlWrapper(deleteUserCtrl));

module.exports = router;
