const jwt = require('jsonwebtoken');
const { Tokens } = require('../models');

function generateTokens(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '30m',
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  });
  return {
    accessToken,
    refreshToken,
  };
}

function validateAccessToken(token) {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (e) {
    return null;
  }
}

function validateRefreshToken(token) {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (e) {
    return null;
  }
}

async function saveToken(userId, refreshToken) {
  const [token, created] = await Tokens.findOrCreate({
    where: { userId },
    defaults: { refreshToken },
  });

  if (!created) {
    token.refreshToken = refreshToken;
    await token.save();
  }

  return token;
}

async function removeToken(refreshToken) {
  const deletedToken = await Tokens.destroy({
    where: { refreshToken },
  });

  return deletedToken;
}

async function findToken(refreshToken) {
  const token = await Tokens.findOne({
    where: { refreshToken },
  });

  return token;
}

function generateResetToken(payload) {
  const passwordResetToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30m',
  });
  return passwordResetToken;
}

module.exports = {
  generateTokens,
  validateAccessToken,
  validateRefreshToken,
  saveToken,
  removeToken,
  findToken,
  generateResetToken,
};
