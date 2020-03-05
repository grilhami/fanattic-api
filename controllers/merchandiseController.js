const {
  merchandise,
  merchandise_images,
  merchandise_links,
} = require('../models');
const { errorHandler } = require('../helpers');

module.exports = {
  getAll: (req, res) => {
    merchandise
      .findAll({
        attributes: ['id', 'name', 'price', 'description'],
        include: [
          {
            model: merchandise_links,
            attributes: ['id', 'url'],
            as: 'links',
          },
          {
            model: merchandise_images,
            attributes: ['id', 'url'],
            as: 'images',
          },
        ],
      })
      .then(data =>
        res.status(200).json({
          message: 'get merchandise',
          data,
        }),
      )
      .catch(err => errorHandler(res, err));
  },
};
