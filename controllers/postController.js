const {
  sequelize,
  post,
  comment,
  user,
  user_saved_posts,
  reported_post,
  report_type,
} = require('../models');
const { errorHandler } = require('../helpers');

// const { Op } = Sequelize;

module.exports = {
  getFeed: (req, res) => {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        message: 'userId is required',
        debug: req.body,
      });
    }
    return post
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
  create: (req, res) => {
    const { caption, userId } = req.body;
    if (!caption || !userId || !req.file) {
      return res.status(400).json({
        message: `userId, image and caption is required`,
        debug: req.body,
      });
    }
    return sequelize
      .transaction(async t => {
        const postObj = await post.create(
          {
            userId,
            image: req.file.filename,
            caption,
          },
          { transaction: t },
        );

        return postObj;
      })
      .then(result =>
        res.status(200).json({
          message: 'create Post',
          result,
        }),
      )
      .catch(err => errorHandler(res, err));
  },
  addToSavedPosts: (req, res) => {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
      return res.status(400).json({
        message: `userId and postId is required`,
        debug: req.body,
      });
    }
    return sequelize
      .transaction(async t => {
        const savedPostObj = await user_saved_posts.create(
          {
            userId,
            postId,
          },
          { transaction: t },
        );
        return savedPostObj;
      })
      .then(result => {
        return res.status(200).json({
          message: 'create Post',
          result,
        });
      })
      .catch(err => errorHandler(res, err));
  },
  removeFromSavedPosts: (req, res) => {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
      return res.status(400).json({
        message: `userId and postId is required`,
        debug: req.body,
      });
    }
    return sequelize
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
    return post
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
  report: (req, res) => {
    const { postId } = req.params;
    const { userComment, report_typeId } = req.body;
    reported_post
      .create({
        postId,
        report_typeId,
        userComment,
      })
      .then(() => {
        res.status(200).json({ message: 'report success' });
      })
      .catch(err => errorHandler(res, err));
  },
  getReportTypes: (req, res) => {
    report_type
      .findAll({})
      .then(() => {
        res.status(200).json({ message: 'get report types' });
      })
      .catch(err => errorHandler(res, err));
  },
};
