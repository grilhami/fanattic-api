const { sequelize, social_action, 
        user, social_action_video } = require('../models');
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
};