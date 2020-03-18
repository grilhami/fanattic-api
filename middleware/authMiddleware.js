const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// eslint-disable-next-line consistent-return
exports.authMiddleware = (req, res, next) => {
  let { token } = req.body;
  const { authorization } = req.headers;

  if (authorization) {
    token = token || authorization;
  }
  
  if (!token) return res.status(400).json({
    message:
      "This is a JWT error."
  });
  jwt.verify(token, process.env.JWTTOKEN, (err, data) => {
    if (err) {
      res.status(419).json(err);
      if (req.files) {
        req.files.forEach(({ filename }) => {
          fs.unlinkSync(
            path.join(__dirname, `../uploads/${req.dest}/${filename}`),
          );
        });
      } else if (req.file) {
        fs.unlinkSync(
          path.join(__dirname, `../uploads/${req.dest}/${req.file.filename}`),
        );
      }
      return;
    }

    // if (data.role !== role){
    //     return res.status(403).json()
    // }

    // TODO: ADD SECURITY ROLE IN JWT

    res.userData = data;
    next();
  });
};
