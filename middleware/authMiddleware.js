const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// eslint-disable-next-line consistent-return
exports.authMiddleware = (req, res, next) => {
  const { token } = req;
  if (!token) return res.status(400).json();
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
