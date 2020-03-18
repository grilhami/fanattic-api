const multer = require('multer');
const path = require('path');

exports.uploadUser = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      req.dest = 'user';
      cb(null, path.join(__dirname, `../uploads/${req.dest}`));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toISOString().replace(/:/g, '-') + file.originalname.trim(),
      );
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

exports.uploadPost = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      req.dest = 'post';
      cb(null, path.join(__dirname, `../uploads/${req.dest}`));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toISOString().replace(/:/g, '-') + file.originalname.trim(),
      );
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

exports.uploadMusic = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      req.dest = 'music';
      cb(null, path.join(__dirname, `../uploads/${req.dest}`));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toISOString().replace(/:/g, '-') + file.originalname.trim(),
      );
    },
  }),
});

exports.uploadVideoThumbnail = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      req.dest = 'thumbnail';
      cb(null, path.join(__dirname, `../uploads/${req.dest}`));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toISOString().replace(/:/g, '-') + file.originalname.trim(),
      );
    },
  }),
});

