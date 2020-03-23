const { sequelize, social_action, 
        user, social_action_video,
        social_artist_badge, social_user_badge } = require('../models');
const { errorHandler } = require('../helpers');

module.exports = {
    getAllSocialAction: (req, res) => {
        social_action.findAll().then(data =>
            res.status(200).json({
            message: 'Get social actions',
            data,
            })
        ).catch(
            err => errorHandler(res, err)
        );
    },
    getArtistSocialAction: (req, res) => {
        const { artistId } = req.params;
        social_action.findAll({ where: { artistId } }).then(data =>
            res.status(200).json({
            message: 'Get social actions',
            data,
            })
        ).catch(
            err => errorHandler(res, err)
        );
    },
    createArtistSocialAction: async (req, res) => {
        const { artistId } = req.params;
        const { title, description, videoOneUrl,
                videoTwoUrl, videoThreeUrl, 
                videoFourUrl } = req.body;

        if (!artistId || !title || !description || !videoOneUrl || !req.file ) {
            return res.status(400).json({
                message: "artistId, title, description, image, and videoOneUrl are required.",
                debug: req.body,
              });
        }

        const userObj = await user.findOne({ where: {id: artistId } });

        if ((userObj == null) || (userObj.type != 'artist')) {
            return res.status(400).json({
                message: "User is not an artist.",
                debug: req.body,
              });
        }

        return sequelize.transaction(async socialActionTransaction => {
            const socialActionObj = await social_action.create(
                {
                    artistId,
                    title,
                    description,
                    cover: req.file.path,
                    videoOneUrl,
                    videoTwoUrl,
                    videoThreeUrl,
                    videoFourUrl
                },
                {transaction: socialActionTransaction}
            );

            return socialActionObj;
        }).then( result => {
            return res.status(200).json({
                message: 'Social action created',
                result,
              });
        }).catch(err => errorHandler(res, err));

    },
    updateArtistSocialAction: async (req, res) => {
        const { artistId, actionId } = req.params;
        const { title, description, videoOneUrl,
                videoTwoUrl, videoThreeUrl, 
                videoFourUrl } = req.body;

        if (!artistId || !actionId || !title || !description || !videoOneUrl || !req.file ) {
            return res.status(400).json({
                message: "artistId, title, description, image, and videoOneUrl are required.",
                debug: req.body,
                });
        }

        const userObj = await user.findOne({ where: {id: artistId } });

        if ((userObj == null) || (userObj.type != 'artist')) {
            return res.status(400).json({
                message: "User is not an artist.",
                debug: req.body,
              });
        }

        return sequelize.transaction(async socialActionTransaction => {
            const socialActionObj = await social_action.update(
                {
                    title,
                    description,
                    cover: req.file.path,
                    videoOneUrl,
                    videoTwoUrl,
                    videoThreeUrl,
                    videoFourUrl
                },
                {
                    where: { 
                        id: actionId,
                        artistId: artistId 
                    }
                },
                {transaction: socialActionTransaction}
            );

            return socialActionObj;
        }).then( result => {
            return res.status(200).json({
                message: 'Social action updated',
                result,
              });
        }).catch(err => errorHandler(res, err));

    },

    deleteSocialActon: (req, res) => {
        const { artistId, actionId } = req.params;
        social_action.destroy(
            { where: {id: actionId, artistId: artistId} }
        ).then(
            () => res.status(200).json({ 
                 message: "Social action Deleted." 
            })
        ).catch(
            err => errorHandler(res, err)
        );
    },
    createSocialVideo: async (req, res) => {
        const { artistId, actionId } = req.params;
        const { url, title, description } = req.body;

        if ( !artistId || !actionId || !url || !title || !description) {
            return res.status(400).json({
                message: "artistId, actionId, url, title, and description are required",
                debug: req.body,
              });
        }

        const userObj = await user.findOne({ where: {id: artistId } });

        if ((userObj == null) || (userObj.type != 'artist')) {
            return res.status(400).json({
                message: "User is not an artist.",
                debug: req.body,
              });
        }

        return sequelize.transaction(async socialVideoTransaction => {
            const socialVideoObj = await social_action_video.create(
                {
                    socialActionId: actionId,
                    artistId,
                    url,
                    title,
                    description,
                    cover: req.file.path,
                },
                { transaction: socialVideoTransaction }
            );

            return socialVideoObj;
        }).then( result => {
            return res.status(200).json({
                message: 'Social action video created',
                result,
              });
        }).catch(err => errorHandler(res, err));
    },
    getAllSocialVideo: (req, res) => {
        const { artistId } = req.params;

        social_action_video.findAll(
            {
                where: {artistId}
            }
        ).then(result => {
            return res.status(200).json({
                message: 'Get social action video',
                result,
              });
        }).catch(
            err => errorHandler(res, err)
        );
    },
    updateSocialVideo: async (req, res) => {
        const { artistId, actionId, videoId } = req.params;
        const { url, title, description } = req.body;

        if ( !artistId || !actionId || !url || !title || !description) {
            return res.status(400).json({
                message: "artistId, actionId, url, title, and description are required",
                debug: req.body,
              });
        }

        const userObj = await user.findOne({ where: {id: artistId } });

        if ((userObj == null) || (userObj.type != 'artist')) {
            return res.status(400).json({
                message: "User is not an artist.",
                debug: req.body,
              });
        }

        const socialActionObj = await social_action.findOne({ where: {id: actionId } });

        if (socialActionObj == null) {
            return res.status(400).json({
                message: "Social action does not exists.",
                debug: req.body,
              });
        }

        return sequelize.transaction(async socialVideoTransaction => {
            const socialVideoObj = await social_action_video.update(
                {
                    url,
                    title,
                    description,
                    cover: req.file.path,
                },
                {
                    where: {
                        id: videoId,
                        artistId,
                        socialActionId: actionId
                    }
                },
                { transaction: socialVideoTransaction }
            );

            return socialVideoObj;
        }).then( result => {
            return res.status(200).json({
                message: 'Social action video updated',
                result,
              });
        }).catch(err => errorHandler(res, err));
    },
    deleteSocialVideo: (req, res) => {
        const { artistId, actionId, videoId } = req.params;
        social_action_video.destroy(
            { where: {id: videoId, artistId, socialActionId: actionId } }
        ).then(
            () => res.status(200).json({ 
                 message: "Social action video Deleted." 
            })
        ).catch(
            err => errorHandler(res, err)
        );
    },

    getAllSocialArtistBadge: (req, res) => {
        const { artistId } = req.params;

        social_artist_badge.findAll(
            {
                where: {artistId}
            }
        ).then(result => {
            return res.status(200).json({
                message: 'Get social action video',
                result,
              });
        }).catch(
            err => errorHandler(res, err)
        );
    },
    createSocialArtistBadge: async (req, res) => {
        const { artistId, actionId } = req.params;
        const { name, badgeType } = req.body;

        if (!artistId || !actionId || 
            !name || !badgeType || !req.file) {
                return res.status(400).json({
                    message: "artistId, actionId, badgeName, and badgeType are required.",
                    debug: req.body,
                  });
        }

        const userObj = await user.findOne({ where: {id: artistId } });

        if ((userObj == null) || (userObj.type != 'artist')) {
            return res.status(400).json({
                message: "User is not an artist.",
                debug: req.body,
              });
        }

        // const socialActionObj = await social_action.findOne({ where: {id: actionId } });

        // if (socialActionObj == null) {
        //     return res.status(400).json({
        //         message: "Social action does not exists.",
        //         debug: req.body,
        //       });
        // }


        return sequelize.transaction(async socialArtistBadgeTransaction => {
            const socialBadgeObj = await social_artist_badge.create(
                {
                    artistId,
                    socialActionId: actionId,
                    name,
                    badgeType,
                    logo: req.file.path,
                },
                { transaction: socialArtistBadgeTransaction }
            );

            return socialBadgeObj;
        }).then( result => {
            return res.status(200).json({
                message: 'Social artist badge created.',
                result,
              });
        }).catch(err => errorHandler(res, err));

    },
    updateSocialArtistBadge: async (req, res) => {
        const { artistId, actionId, badgeId } = req.params;
        const { name, badgeType } = req.body;

        if (!artistId || !actionId || 
            !name || !badgeType || !req.file) {
                return res.status(400).json({
                    message: "artistId, actionId, badgeName, and badgeType are required.",
                    debug: req.body,
                  });
        }

        const userObj = await user.findOne({ where: {id: artistId } });

        if ((userObj == null) || (userObj.type != 'artist')) {
            return res.status(400).json({
                message: "User is not an artist.",
                debug: req.body,
              });
        }

        return sequelize.transaction(async socialArtistBadgeTransaction => {
            const socialBadgeObj = await social_artist_badge.update(
                {
                    name,
                    badgeType,
                    logo: req.file.path,
                },
                {
                    where: {
                        id: badgeId,
                        artistId,
                        socialActionId: actionId
                    }
                },
                { transaction: socialArtistBadgeTransaction }
            );

            return socialBadgeObj;
        }).then( result => {
            return res.status(200).json({
                message: 'Social artist badge updated.',
                result,
              });
        }).catch(err => errorHandler(res, err));
    },
    deleteSocialArtistBadge: (req, res) => {
        const { artistId, actionId, badgeId } = req.params;
        social_artist_badge.destroy(
            { where: {id: badgeId, artistId, socialActionId: actionId } }
        ).then(
            () => res.status(200).json({ 
                 message: "Social artist badge Deleted." 
            })
        ).catch(
            err => errorHandler(res, err)
        );
    },
    getUserSocialBadge: (req, res) => {
        const { userId } = req.params;
        social_user_badge.findAll({
            where: { userId }
        }).then(result => {
            return res.status(200).json({
                message: 'Get social user badges',
                result,
              });
        }
        ).catch(
            err => errorHandler(res, err)
        );
    },
    createUserSocialBadge: async (req, res) => {
        const { userId, actionId } = req.params;
        const { name, badgeType } = req.body;

        if (!userId || !actionId || 
            !name || !badgeType || !req.file) {
                return res.status(400).json({
                    message: "artistId, actionId, badgeName, and badgeType are required.",
                    debug: req.body,
                  });
        }

        const userObj = await user.findOne({ where: {id: userId } });

        if ((userObj == null) || (userObj.type != 'end')) {
            return res.status(400).json({
                message: "User is not an end-user.",
                debug: req.body,
              });
        }

        return sequelize.transaction(async socialUserBadgeTransaction => {
            const socialBadgeObj = await social_user_badge.create(
                {
                    userId,
                    socialActionId: actionId,
                    name,
                    badgeType,
                    logo: req.file.path,
                },
                { transaction: socialUserBadgeTransaction }
            );

            return socialBadgeObj;
        }).then( result => {
            return res.status(200).json({
                message: 'Social User badge created.',
                result,
              });
        }).catch(err => errorHandler(res, err));
    },
    updateUserSocialBadge: async (req, res) => {
        const { userId, actionId, badgeId } = req.params;
        const { name, badgeType } = req.body;

        if (!userId || !actionId || 
            !name || !badgeType || !req.file) {
                return res.status(400).json({
                    message: "artistId, actionId, badgeId, name, and badgeType are required.",
                    debug: req.body,
                  });
        }

        const userObj = await user.findOne({ where: {id: userId } });

        if ((userObj == null) || (userObj.type != 'end')) {
            return res.status(400).json({
                message: "User is not an end-user.",
                debug: req.body,
              });
        }

        return sequelize.transaction(async socialUserBadgeTransaction => {
            const socialBadgeObj = await social_user_badge.update(
                {
                    name,
                    badgeType,
                    logo: req.file.path,
                },
                {
                    where: {
                        id: badgeId,
                        userId,
                        socialActionId: actionId
                    }
                },
                { transaction: socialUserBadgeTransaction }
            );

            return socialBadgeObj;
        }).then( result => {
            return res.status(200).json({
                message: 'Social User badge updated.',
                result,
              });
        }).catch(err => errorHandler(res, err));
    },
    deleteUserSocialBadge: (req, res) => {
        const { userId, actionId, badgeId } = req.params;
        social_user_badge.destroy(
            { where: {id: badgeId, userId, socialActionId: actionId } }
        ).then(
            () => res.status(200).json({ 
                 message: "Social user badge Deleted." 
            })
        ).catch(
            err => errorHandler(res, err)
        );
    },
};