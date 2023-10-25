const {
  registration,
  activate,
  login,
  logout,
  refresh,
  getAllUsers,
} = require('../../services/userService');
const { validationResult } = require('express-validator');
const HttpError = require('../../helpers/HttpError');

const registrationCtrl = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map(error => error.msg)
      .join(', '); // join error messages
    throw HttpError(400, `Validation error: ${errorMessages}`);
  }
  const { name, email, password } = req.body;

  const userData = await registration(name, email, password);

  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  return res.json(userData);
};

const loginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  const userData = await login(email, password);
  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  return res.json(userData);
};

const logoutCtrl = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const token = await logout(refreshToken);
  res.clearCookie('refreshToken');
  return res.json(token);
};

const activateCtrl = async (req, res, next) => {
  const activationLink = req.params.link;
  await activate(activationLink);
  return res.redirect(process.env.CLIENT_URL);
};

const refreshCtrl = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const userData = await refresh(refreshToken);
  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  return res.json(userData);
};

const getUsersCtrl = async (req, res, next) => {
  const users = await getAllUsers();
  return res.json(users);
};

module.exports = {
  registrationCtrl,
  loginCtrl,
  logoutCtrl,
  activateCtrl,
  refreshCtrl,
  getUsersCtrl,
};
