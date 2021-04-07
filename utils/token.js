const jwt = require('jsonwebtoken');

exports.genActivateToken = payload => {
  return jwt.sign(payload, process.env.ACTIVATE_TOKEN, {
    expiresIn: '1h',
  });
};

exports.genRefreshToken = payload => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN, {
    expiresIn: '10d',
  });
};
