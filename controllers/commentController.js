const { sequelize, comment } = require('../models');
const { errorHandler } = require('../helpers');

// const { Op } = Sequelize;

module.exports = {
  // eslint-disable-next-line consistent-return
  create: (req, res) => {
    const { userId, postId, commentId, content } = req.body;
    if (!userId || !postId || !commentId || !content) {
      return res.status(400).json({
        message: `userId, postId, content, and commentId is required`,
        debug: req.body,
      });
    }
    sequelize
      .transaction(async t => {
        // eslint-disable-next-line no-return-await
        return await comment.create(
          {
            userId,
            postId,
            commentId: commentId || null,
            content,
          },
          { transaction: t },
        );
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
