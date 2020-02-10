const jwt = require('jsonwebtoken');

const config = {
  jwtKey: 'FANATTIC',
};

module.exports = {
  // user auth token
  user: (req, res, next) => {
    if (req.method !== 'OPTIONS') {
      console.log(`Auth User || Access attempt at ${new Date()}`);
      jwt.verify(req.token, config.jwtKey, (error, decoded) => {
        if (error) {
          console.log({ decoded }, 'Auth User || Unauthorized');
          return res.status(401).json({
            message: 'User not authorized.',
            error: 'User not authorized.',
          });
        }

        console.log('Auth User || Authorized');
        console.log(`Username ${decoded.username}`);
        req.user = decoded;
        return next();
      });
    } else {
      next();
    }
  },
};
