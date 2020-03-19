const { sequelize, comment } = require('../models');
const { errorHandler } = require('../helpers');

// const { Op } = Sequelize;

module.exports = {
  // eslint-disable-next-line consistent-return
  create: (req, res) => {
    const { userId, postId, commentId, content } = req.body;
    console.log(req.body);
    if (!userId || !postId || !content) {
      return res.status(400).json({
        message: `userId, postId, content,  is required`,
        debug: req.body,
      });
    }
    sequelize
      .transaction(
        async t =>
          // eslint-disable-next-line no-return-await
          await comment.create(
            {
              userId,
              postId,
              commentId: commentId || null,
              content,
            },
            { transaction: t },
          ),
      )
      .then(result =>
        res.status(200).json({
          message: 'create comment',
          result,
        }),
      )
      .catch(err => errorHandler(res, err));
  },

  getCommentReplies: (req, res) => {
    const { postId, commentId } = req.params;
    console.log(req.params)
    comment.findAll({
      where: {
        postId: postId,
        commentId: commentId
      }
    }).then(data => {
      res.status(200).json({
        message: 'Get comment\' replies',
        data,
        })
    }).catch(err => errorHandler(res, err));

  },
};
