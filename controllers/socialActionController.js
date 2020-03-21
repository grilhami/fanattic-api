const { sequelize, social_action, user } = require('../models');
const { errorHandler } = require('../helpers');

module.exports = {
    createSocialAction: async (req, res) => {
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
};