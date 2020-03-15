const { video } = require('../models');
const { errorHandler } = require('../helpers');

module.exports = {
  getVideos: (req, res) => {
    video
      .findAll({
        order: ['createdAt', 'DESC'],
      })
      .then(result => {
        return res.status(200).json({
          message: 'get videos',
          result,
        });
      })
      .catch(err => errorHandler(res, err));
  },
};
