const bcrypt = require('bcrypt');
const uuid = require('uuid');
const HttpError = require('../helpers/HttpError');
const { Users } = require('../models');
const { sendActivationMail } = require('./mailService');
const {
  generateTokens,
  validateRefreshToken,
  saveToken,
  removeToken,
  findToken,
} = require('./tokenService');
const createUserDto = require('../dtos/user-dto');

async function registration(name, email, password) {
  const candidate = await Users.findOne({ where: { email } });

  if (candidate) {
    throw HttpError(400, `User with email ${email} already exists`);
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

  const user = await Users.create({
    name,
    email,
    password: hashPassword,
    activationLink,
  });

  await sendActivationMail(
    email,
    `${process.env.API_URL}/api/activate/${activationLink}`
  );

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

module.exports = {
  registration,
  activate,
  login,
  logout,
  refresh,
  getAllUsers,
};
