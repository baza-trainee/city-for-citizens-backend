const express = require('express');
const router = express.Router();
const validate = require('../../validation/validation');
const {
  loginSchema,
  // registrationSchema,
  passwordResetRequestSchema,
  passwordResetSchema,
  refreshTokenSchema,
  activationLinkSchema,
  // userIdSchema,
  passwordChangeSchema,
} = require('../../validation/joi.schemas');
const ValidationTypes = require('../../validation/validationTypes');

const authMiddleware = require('../../middlewares/authMiddleware');
const ctrlWrapper = require('../../helpers/ctrlWrapper');
const {
  // registrationCtrl,
  loginCtrl,
  logoutCtrl,
  activateCtrl,
  refreshCtrl,
  getUsersCtrl,
  passwordResetRequestCtrl,
  passwordResetCtrl,
  // deleteUserCtrl,
  changePasswordCtrl,
} = require('../../controllers/users/userControllers');

// router.post(
//   '/registration',
//   validate(registrationSchema, ValidationTypes.BODY),
//   ctrlWrapper(registrationCtrl)
// );
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
router.post(
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
router.post(
  '/password/change',
  authMiddleware,
  validate(passwordChangeSchema, ValidationTypes.BODY),
  ctrlWrapper(changePasswordCtrl)
);

// router.delete(
//   '/users/:userId',
//   authMiddleware,
//   validate(userIdSchema, ValidationTypes.PARAMS),
//   ctrlWrapper(deleteUserCtrl)
// );
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "admin"
 *             email: "user@gmail.com"
 *             password: "Mangal54"
 *     responses:
 *       '200':
 *         description: Successful registration
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJpc0FjdGl2YXRlZCI6ZmFsc2UsImlhdCI6MTY5OTQ4MjYwOCwiZXhwIjoxNjk5NDg0NDA4fQ.YXO6uXJiNbg9abG0CkybohPHpzFMEsIqL2kXIvli7LA"
 *               refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJpc0FjdGl2YXRlZCI6ZmFsc2UsImlhdCI6MTY5OTQ4MjYwOCwiZXhwIjoxNzAyMDc0NjA4fQ.HbTt5WRH-SQu4TGlxweDvoPBsxQKJitjPTjBMBRqaAU"
 *               user:
 *                 id: 15
 *                 email: "user@gmail.com"
 *                 isActivated: false
 *       '400':
 *         description: Error during registration
 *         content:
 *           application/json:
 *             example:
 *               message: User with email already exists
 *               error: 400
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "user@gmail.com"
 *             password: "Mangal54"
 *     responses:
 *       '200':
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJpc0FjdGl2YXRlZCI6ZmFsc2UsImlhdCI6MTY5OTQ4Mjc0MywiZXhwIjoxNjk5NDg0NTQzfQ.rn2rTVWOpSlU7GLEZGh_T1wSSQVVJPn5ZXhxiB4mEgg"
 *               refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJpc0FjdGl2YXRlZCI6ZmFsc2UsImlhdCI6MTY5OTQ4Mjc0MywiZXhwIjoxNzAyMDc0NzQzfQ.FvfGOtMC_8ISQomWM-okqz9TWiD8C1JiFyAyAJ32g6w"
 *               user:
 *                 id: 15
 *                 email: "user@gmail.com"
 *                 isActivated: false
 *       '400':
 *         description: Error during authentication
 *         content:
 *           application/json:
 *             example:
 *               message: User with this email not found
 *               error: 400
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User logout (invalidate tokens)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/RefreshToken'
 *     responses:
 *       '200':
 *         description: Successful logout
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/TokenRemoved'
 *       '400':
 *         description: Error during logout
 *         content:
 *           application/json:
 *             example:
 *               message: Reset link is invalid or has expired
 *               error: 400
 */

/**
 * @swagger
 * /activate/{link}:
 *   get:
 *     summary: Activate account using link
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: link
 *         schema:
 *           type: string
 *         required: true
 *         description: Activation link received by the user
 *     responses:
 *       '200':
 *         description: Account activation successful
 *       '400':
 *         description: Error during account activation
 *         content:
 *           application/json:
 *             example:
 *               message: Uncorrect activation link
 *               error: 400
 */

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: Refresh tokens
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/RefreshToken'
 *     responses:
 *       '200':
 *         description: Tokens refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserTokens'
 *       '401':
 *         description: Error during token refresh
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized
 *               error: 401
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get list of users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Successful retrieval of user list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserList'
 *       '401':
 *         description: Error during retrieval of user list
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized
 *               error: 401
 */

/**
 * @swagger
 * /passwordReset/request:
 *   post:
 *     summary: Password reset request
 *     tags: [Users]
 *     description: Password reset request
 *     requestBody:
 *       description: Password reset request
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *                 example: "user@gmail.com"
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Password reset response
 *                   example: "Password reset link sent to your email account"
 *       '400':
 *         description: Bad request (invalid request body)
 *         content: {}
 *       '404':
 *         description: Not found
 *         content: {}
 */

/**
 * @swagger
 * /passwordReset/reset:
 *   post:
 *     summary: Password reset
 *     tags: [Users]
 *     description: Password reset
 *     requestBody:
 *       description: Password reset
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsImlzQWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE2OTg5NjAyOTYsImV4cCI6MTY5ODk2MjA5Nn0.Mko5wxmtYRrHWkKwtma9FHcRt0dvKB0vNIqQc3g--Xs"
 *               newPassword:
 *                 type: string
 *                 description: New password
 *                 example: "1234567888"
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Password reset response
 *                   example: "Password changed successfully"
 *       '400':
 *         description: Bad request (invalid request body)
 *         content: {}
 *       '404':
 *         description: Not found
 *         content: {}
 */

/**
 * @swagger
 * /password/change:
 *   post:
 *     summary: Change admin password
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []  # Use the same security name as defined in your Swagger securityDefinitions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordChange'
 *     responses:
 *       '200':
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Password changed successfully
 *       '400':
 *         description: Bad request, invalid old password or new passwords do not match
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid old password or new passwords do not match
 *       '401':
 *         description: Unauthorized, authentication failure
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 *       '404':
 *         description: Admin not found
 *         content:
 *           application/json:
 *             example:
 *               error: Admin not found
 *
 * components:
 *   schemas:
 *     PasswordChange:
 *       type: object
 *       properties:
 *         oldPassword:
 *           type: string
 *           description: Old password
 *           example: "oldPassword123"
 *         newPassword:
 *           type: string
 *           description: New password
 *           example: "newPassword123"
 *         confirmPassword:
 *           type: string
 *           description: Confirm new password
 *           example: "newPassword123"
 *       required:
 *         - oldPassword
 *         - newPassword
 *         - confirmPassword
 */

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User identifier
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '401':
 *         description: Error during user deletion
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized
 *               error: 401
 */
