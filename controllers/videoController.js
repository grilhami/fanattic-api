const {
    sequelize,
    video
  } = require('../models');

const { errorHandler } = require('../helpers');

module.exports = {
    allVideos: (req, res) => {
        video.findAll().then(data =>
            res.status(200).json({
            message: 'Get video',
            data,
            })
        ).catch(
            err => errorHandler(res, err)
        );
    },
    createVideo: (req, res) => {
        const {
            title,
            url,
            duration
        } = req.body;

        if (!title || !url || 
            !req.file || ! duration) {
                return res.status(400).json({
                    message: "Something wrong with creating video",
                    debug: req.body,
            })
        }

        return sequelize.transaction(async videoTransaction=>{
            const videoData = {
                title,
                url,
                thumbnail: req.file.path,
                duration
            };

            const savedVideoObj = await video.create( 
                videoData,
                { transaction: videoTransaction},
            );

            return savedVideoObj;
        }).then(
            result => res.status(200).json({
                message: 'Video created',
                result,
            })
        ).catch(
            err => errorHandler(res, err)
        );
    },

    updateVideo: (req, res) => {
        const { videoId } = req.params;
        const {
            title,
            url,
            duration
        } = req.body;

        if (!title || !url || 
            !req.file || ! duration) {
                return res.status(400).json({
                    message: "Something wrong with updating video",
                    debug: req.body,
            })
        }

        return sequelize.transaction(async videoTransaction=>{
            const videoData = {
                title,
                url,
                thumbnail: req.file.path,
                duration
            };

            const updatedVideoObj = await video.update(
                videoData,
                {
                    where: { id: videoId},
                },
                { 
                    transaction: videoTransaction
                },
            );

            return updatedVideoObj;
        }).then(
            result => res.status(200).json({
                message: 'Video updated',
                result,
            }),
        ).catch(
            err => errorHandler(res, err)
        );

    },
    deleteVideo: (req, res) => {
        const { videoId } = req.params;
        video.destroy(
            { where: {id: videoId} }
        ).then(
            () => res.status(200).json({ 
                 message: "Video Deleted." 
            })
        ).catch(
            err => errorHandler(res, err)
        );
    },

    allUserStory: (req, res) => {},
    createUserStory: (req, res) => {},
    updateUserStory: (req, res) => {},
    deleteUserStory: (req, res) => {},

};