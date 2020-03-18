const {
    sequelize,
    video,
    story,
    user
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

    createUserStory: (req, res) => {
        const { userId } = req.params;
        const {
            url,
        } = req.body;

        if (!url || !req.file) {
                return res.status(400).json({
                    message: "Something wrong with creating story",
                    debug: req.body,
            })
        }

        return sequelize.transaction(async userStoryTransaction => {
            const storyData = {
                userId: userId,
                url, 
                thumbnail: req.file.path};
            
            const savedStoryObject = await story.create(
                storyData,
                {
                    transaction: userStoryTransaction,
                }
            );

            return savedStoryObject;
        }
        ).then(
            result => res.status(200).json({
                message: 'Story created',
                result,
            })
        ).catch(
            err => errorHandler(res, err)
        );
    },
    allUserStory: (req, res) => {
        const { userId } = req.params;

        if (!user) {
            return res.status(400).json({
                message: "Something wrong with creating story",
                debug: req.body,
        })}


        story.findAll({where: {userId: userId}}).then(data =>
            res.status(200).json({
            message: 'Get user\'stories',
            data,
            })
        ).catch(
            err => errorHandler(res, err)
        );

    },
    updateUserStory: (req, res) => {
        const { userId } = req.params;
        const {
            url,
        } = req.body;

        if (!url || !req.file) {
                return res.status(400).json({
                    message: "Something wrong with creating story",
                    debug: req.body,
            })
        }

        return sequelize.transaction(async userStoryTransaction => {
            const storyData = {
                url, 
                thumbnail: req.file.path};
            
            const updatedStoryObject = await story.update(
                storyData,
                {
                    where: {userId: userId}
                },
                {
                    transaction: userStoryTransaction,
                }
            );

            return updatedStoryObject;
        }
        ).then(
            result => res.status(200).json({
                message: 'Story updated',
                result,
            })
        ).catch(
            err => errorHandler(res, err)
        );
    },
    deleteUserStory: (req, res) => {
        const { userId, storyId } = req.params;
        story.destroy(
            { where: {userid: userId, id: storyId} }
        ).then(
            () => res.status(200).json({ 
                 message: "Story Deleted." 
            })
        ).catch(
            err => errorHandler(res, err)
        );
    },

};