const { sequelize, comment } = require('../models');
const { errorHandler } = require('../helpers');

// const { Op } = Sequelize;

module.exports = {
  // eslint-disable-next-line consistent-return
  create: (req, res) => {
    const { postId } = req.params;
    const { userId, commentId, content } = req.body;
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

  getCommentReplies: async (req, res) => {
    const page = parseInt(req.query.page);
    const { postId, commentId } = req.params;
    const limit = 3;

    // const getComment = await 
    comment.findAll({
      where: {
        postId: postId,
        commentId: commentId
      },
      limit: limit,
      offset: (page - 1) * limit
    }).then(data => {
      res.status(200).json({
        message: 'Get comment\' replies',
        data,
        })
    }).catch(err => errorHandler(res, err));

  },
};
