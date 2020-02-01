const { Sequelize, sequelize, post, comment, user } = require('../models');
const { errorHandler } = require('../helpers');

// const { Op } = Sequelize;

module.exports = {
  get: (req, res) => {
    const { userId } = req.body;
    post
      .findAll({
        where: {
          userId,
        },
        include: [
          {
            model: comment,
            include: [
              {
                model: user,
              },
            ],
          },
        ],
      })
      .then(result => {
        return res.status(200).json({
          message: 'GET Posts',
          result,
        });
      })
      .catch(err => errorHandler(res, err));
  },
  create: (req, res) => {
    const { image, caption, shares, likes } = req.body;
    post
      .create({
        userId: 1,
        image,
        caption,
        shares: 0,
        likes: 0,
      })
      .then(result => {
        return res.status(200).json({
          message: 'create Posts',
          result,
        });
      })
      .catch(err => errorHandler(res, err));
  },
};
