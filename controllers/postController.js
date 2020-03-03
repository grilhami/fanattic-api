const {
  sequelize,
  post,
  comment,
  user,
  user_saved_posts,
} = require('../models');
const { errorHandler } = require('../helpers');

// const { Op } = Sequelize;

module.exports = {
  // eslint-disable-next-line consistent-return
  getFeed: (req, res) => {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        message: 'userId is required',
        debug: req.body,
      });
    }
    post
      .findAll({
        where: {
          userId,
        },
        include: [
          {
            model: comment,
            where: {
              commentId: null,
            },
            attributes: ['id', 'content'],
            include: [
              {
                model: user,
                attributes: ['id', 'username', 'profilePicture'],
                required: true,
              },
              {
                model: comment,
                attributes: ['id', 'content'],
                required: false,
                include: [
                  {
                    model: user,
                    attributes: ['id', 'username', 'profilePicture'],
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            model: user,
            attributes: ['id', 'username', 'profilePicture'],
            required: true,
          },
        ],
      })
      .then(result => {
        return res.status(200).json({
          message: 'GET Feed',
          result,
        });
      })
      .catch(err => errorHandler(res, err));
  },
  // eslint-disable-next-line consistent-return
  create: (req, res) => {
    const { caption, userId } = req.body;
    if (!caption || !userId || !req.file) {
      return res.status(400).json({
        message: `userId, image and caption is required`,
        debug: req.body,
      });
    }
    sequelize
      .transaction(async t => {
        // eslint-disable-next-line no-return-await
        return await post.create(
          {
            userId,
            image: req.file.filename,
            caption,
          },
          { transaction: t },
        );
      })
      .then(result =>
        res.status(200).json({
          message: 'create Post',
          result,
        }),
      )
      .catch(err => errorHandler(res, err));
  },
  // eslint-disable-next-line consistent-return
  addToSavedPosts: (req, res) => {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
      return res.status(400).json({
        message: `userId and postId is required`,
        debug: req.body,
      });
    }
    sequelize
      .transaction(async t => {
        // eslint-disable-next-line no-return-await
        return await user_saved_posts.create(
          {
            userId,
            postId,
          },
          { transaction: t },
        );
      })
      .then(result => {
        return res.status(200).json({
          message: 'create Post',
          result,
        });
      })
      .catch(err => errorHandler(res, err));
  },
  // eslint-disable-next-line consistent-return
  removeFromSavedPosts: (req, res) => {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
      return res.status(400).json({
        message: `userId and postId is required`,
        debug: req.body,
      });
    }
    sequelize
      .transaction(async t => {
        const savedPostObj = await user_saved_posts.findOne({
          where: {
            userId,
            postId,
          },
          transaction: t,
        });

        await savedPostObj.destroy({ transaction: t });
      })
      .then(result => {
        return res.status(200).json({
          message: 'create Post',
          result,
        });
      })
      .catch(err => errorHandler(res, err));
  },
  // eslint-disable-next-line consistent-return
  getPostUser: (req, res) => {
    const { userIdUser, offsetUser } = req.body;
    if (typeof userIdUser === 'undefined') {
      return res.status(400).json({
        message: `Id user is required`,
        debug: req.body,
      });
    }
    const query = {
      where: {
        userId: userIdUser,
      },
      // attributes: ['id', 'template_name']
    };
    if (typeof offsetUser !== 'undefined') {
      query.offset = offsetUser;
      query.limit = 10;
    }
    post
      .findAll(query)
      .then(data =>
        res.status(200).json({
          message: 'show Post by user',
          data,
        }),
      )
      .catch(err => errorHandler(res, err));
  },
  toggleLikePost: (req, res) => {
    const { postId, status } = req.body;
    switch (status) {
      case 'add':
        post
          .increment('likes', {
            where: {
              id: postId,
            },
          })
          .then(() => res.status(200).json())
          .catch(err => errorHandler(res, err));
        break;
      case 'remove':
        post
          .decrement('likes', {
            where: {
              id: postId,
            },
          })
          .then(() => res.status(200).json())
          .catch(err => errorHandler(res, err));
        break;
      default:
        res.status(400).json({ message: 'status invalid' });
    }
  },
};
