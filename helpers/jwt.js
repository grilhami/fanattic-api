const jwt = require('jsonwebtoken');

const jwtKey = 'FANTATTIC';

module.exports = {
  createToken(payload, time) {
    let duration = '12h'; // defaults to 12 hours
    if (time) {
      duration = time;
    }
    return jwt.sign(payload, jwtKey, { expiresIn: duration });
  },
};
