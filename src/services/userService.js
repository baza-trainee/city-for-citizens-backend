const bcrypt = require('bcrypt');
const uuid = require('uuid');
const HttpError = require('../helpers/HttpError');
const { Users } = require('../models');
const { sendMail } = require('./mailService');
const {
  generateTokens,
  generateResetToken,
  validateRefreshToken,
  saveToken,
  removeToken,
  findToken,
  removeTokenByUserId,
} = require('./tokenService');
const createUserDto = require('../dtos/user-dto');

const pathToEmailTemplates = '../helpers/email/template/';
const activationAccountTemplatePath =
  pathToEmailTemplates + 'activationAccount.handlebars';
const requestResetPasswordTemplatePath =
  pathToEmailTemplates + 'requestResetPassword.handlebars';
const resetPasswordTemplatePath =
  pathToEmailTemplates + 'resetPassword.handlebars';

async function registration(name, email, password) {
  const candidate = await Users.findOne({ where: { email } });

  if (candidate) {
    throw HttpError(400, `User with email ${email} already exists`);
  }
  const hashPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS)
  );

  const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

  const user = await Users.create({
    name,
    email,
    password: hashPassword,
    activationLink,
  });
  // to, subject, templatePath, templateData
  const emailData = {
    link: `${process.env.API_URL}/api/activate/${activationLink}`,
    name,
  };
  const emailSubject = `Activation account on ${process.env.CLIENT_URL1}`;

  await sendMail(email, emailSubject, activationAccountTemplatePath, emailData);

  const userDto = createUserDto(user);

  const tokens = generateTokens({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return { ...tokens, user: userDto };
}

async function activate(activationLink) {
  const user = await Users.findOne({ where: { activationLink } });
  if (!user) {
    throw HttpError(400, 'Uncorrect activation link');
  }
  user.isActivated = true;
  await user.save();
}

async function login(email, password) {
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    throw HttpError(400, 'User with this email not found');
  }
  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    throw HttpError(400, 'Wrong password');
  }

  const userDto = createUserDto(user);

  const tokens = generateTokens({ ...userDto });

  await saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto };
}

async function logout(refreshToken) {
  const token = await removeToken(refreshToken);
  return token;
}

async function refresh(refreshToken) {
  if (!refreshToken) {
    throw HttpError(401);
  }
  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await findToken(refreshToken);
  if (!userData || !tokenFromDb) {
    throw HttpError(401);
  }
  const user = await Users.findByPk(userData.id);

  const userDto = createUserDto(user);

  const tokens = generateTokens({ ...userDto });

  await saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto };
}

async function getAllUsers() {
  const users = await Users.findAll();
  return users;
}
async function passwordResetRequest(email) {
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    throw HttpError(400, 'User with this email not found');
  }

  const userDto = createUserDto(user);

  const token = generateResetToken({ ...userDto });

  await saveToken(userDto.id, token);

  // to, subject, templatePath, templateData
  const emailData = {
    link: `${process.env.CLIENT_URL1}/password-reset?token=${token}`,
    name: user.name,
  };
  const emailSubject = `Reset Password on ${process.env.CLIENT_URL1}`;

  await sendMail(
    email,
    emailSubject,
    requestResetPasswordTemplatePath,
    emailData
  );
}
async function passwordReset(token, newPassword) {
  const userDto = validateRefreshToken(token);
  if (!userDto) {
    throw HttpError(400, 'Reset link is invalid or has expired');
  }
  const user = await Users.findByPk(userDto.id);
  if (!user) {
    throw HttpError(400, 'User with this email not found');
  }
  const hashPassword = await bcrypt.hash(
    newPassword,
    Number(process.env.SALT_ROUNDS)
  );
  user.password = hashPassword;
  await user.save();

  // to, subject, templatePath, templateData
  const emailData = {
    name: user.name,
  };
  const emailSubject = `Your Password has been Updated on ${process.env.CLIENT_URL1}`;

  await sendMail(
    userDto.email,
    emailSubject,
    resetPasswordTemplatePath,
    emailData
  );
}

async function deleteUser(userId) {
  const user = await Users.findByPk(userId);
  if (!user) {
    throw HttpError(404, 'User not found');
  }

  await user.destroy();

  await removeTokenByUserId(userId);
}

async function changePassword(
  oldPassword,
  newPassword,
  confirmPassword,
  adminId
) {
  const admin = await Users.findByPk(adminId);
  if (!admin) {
    throw HttpError(404, 'Admin not found');
  }

  const isOldPasswordValid = await bcrypt.compare(oldPassword, admin.password);
  if (!isOldPasswordValid) {
    throw HttpError(400, 'Invalid old password');
  }

  if (newPassword !== confirmPassword) {
    throw HttpError(400, 'New password and confirm password do not match');
  }

  const hashedNewPassword = await bcrypt.hash(
    newPassword,
    Number(process.env.SALT_ROUNDS)
  );
  admin.password = hashedNewPassword;

  await admin.save();
}

module.exports = {
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
};
