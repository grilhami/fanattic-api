const jwt = require('jsonwebtoken');

module.exports = {
  createToken(payload, time = '12h') {
    return jwt.sign(payload, process.env.JWTTOKEN, { expiresIn: time });
  },
};
