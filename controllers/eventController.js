const { events } = require('../models');
const { errorHandler } = require('../helpers');

module.exports = {
  getAll: (req, res) => {
    events
      .findAll({})
      .then(data =>
        res.status(200).json({
          message: 'get events',
          data,
        }),
      )
      .catch(err => errorHandler(err));
  },
};
