const { sequelize, comment } = require('../models');
const { errorHandler } = require('../helpers');

// const { Op } = Sequelize;

module.exports = {
  create: (req, res) => {
    const { userId, postId, commentId, content } = req.body;

    sequelize
      .transaction(async t => {
        const commentObj = await comment.create(
          {
            userId,
            postId,
            commentId: commentId || null,
            content,
          },
          { transaction: t },
        );

        return commentObj;
      })
      .then(result => {
        return res.status(200).json({
          message: 'create comment',
          result,
        });
      })
      .catch(err => errorHandler(res, err));
  },
};
