const {
  registration,
  activate,
  login,
  logout,
  refresh,
  getAllUsers,
  passwordResetRequest,
  passwordReset,
  deleteUser,
  changePassword,
} = require('../../services/userService');

const cookieConfig = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  path: '/api',
  sameSite: 'none',
  secure: true,
};

const registrationCtrl = async (req, res, next) => {
  const { name, email, password } = req.body;

  const userData = await registration(name, email, password);

  res.cookie('refreshToken', userData.refreshToken, cookieConfig);
  return res.json(userData);
};

const loginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  const userData = await login(email, password);
  res.cookie('refreshToken', userData.refreshToken, cookieConfig);
  return res.json(userData);
};

const logoutCtrl = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Missing refreshToken' });
  }

  const token = await logout(refreshToken);
  res.clearCookie('refreshToken');
  return res.json(token);
};

const activateCtrl = async (req, res, next) => {
  const activationLink = req.params.link;
  await activate(activationLink);
  return res.redirect(process.env.CLIENT_URL1);
};

const refreshCtrl = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const userData = await refresh(refreshToken);
  res.cookie('refreshToken', userData.refreshToken, cookieConfig);
  return res.json(userData);
};

const getUsersCtrl = async (req, res, next) => {
  const users = await getAllUsers();
  return res.json(users);
};

const passwordResetRequestCtrl = async (req, res, next) => {
  const { email } = req.body;

  await passwordResetRequest(email);

  return res
    .status(200)
    .json({ message: 'Password reset link sent to your email account' });
};

const passwordResetCtrl = async (req, res, next) => {
  const { token, newPassword } = req.body;

  await passwordReset(token, newPassword);

  return res.status(200).json({ message: 'Password changed successfully' });
};

const deleteUserCtrl = async (req, res, next) => {
  const userId = req.params.userId;

  await deleteUser(userId);

  return res.status(204).json({ message: 'User successfully deleted' });
};

const changePasswordCtrl = async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const adminId = req.user.id;

  await changePassword(oldPassword, newPassword, confirmPassword, adminId);

  return res.status(200).json({ message: 'Password changed successfully' });
};

module.exports = {
  registrationCtrl,
  loginCtrl,
  logoutCtrl,
  activateCtrl,
  refreshCtrl,
  getUsersCtrl,
  passwordResetRequestCtrl,
  passwordResetCtrl,
  deleteUserCtrl,
  changePasswordCtrl,
};
