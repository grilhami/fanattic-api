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
  getFeed: (req, res) => {
    const { userId } = req.params;
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
  create: (req, res) => {
    const { image, caption, userId } = req.body;

    sequelize
      .transaction(async t => {
        const postObj = await post.create(
          {
            userId,
            image,
            caption,
          },
          { transaction: t },
        );

        return postObj;
      })
      .then(result => {
        return res.status(200).json({
          message: 'create Post',
          result,
        });
      })
      .catch(err => errorHandler(res, err));
  },
  addToSavedPosts: (req, res) => {
    const { userId, postId } = req.body;
    sequelize
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
        message: `Id user is ${typeof userIdUser}`,
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
      .find(query)
      .then(data =>
        res.status(200).json({
          message: 'show Post by user',
          data,
        }),
      )
      .catch(err => errorHandler(res, err));
  },
};
