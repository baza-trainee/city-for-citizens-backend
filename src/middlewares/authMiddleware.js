const HttpError = require('../helpers/HttpError');
const { validateAccessToken } = require('../services/tokenService');

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(HttpError(401, 'Unauthorized'));
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(HttpError(401, 'Unauthorized'));
    }

    const userData = validateAccessToken(accessToken);
    if (!userData) {
      return next(HttpError(401, 'Unauthorized'));
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(HttpError(401, 'Unauthorized'));
  }
};
