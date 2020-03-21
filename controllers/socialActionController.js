const { sequelize, social_action } = require('../models');
const { errorHandler } = require('../helpers');

module.exports = {
    createSocialAction: (req, res) => {
        const { artistId } = req.params;
        const { title, description, 
                cover, videoOneUrl,
                videoTwoUrl, videoThreeUrl, 
                videoFourUrl } = req.body;

        if (!artistId || !title || !description || !cover || !videoOneUrl ) {
            return res.status(400).json({
                message: "artistId, title, description, cover, and videoOneUrl are required.",
                debug: req.body,
              });
        }

        return sequelize.transaction(async socialActionTransaction => {
            const socialActionObj = await social_action.create(
                {
                    artistId,
                    title,
                    description,
                    cover,
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
                message: 'create Post',
                result,
              });
        }).catch(err => errorHandler(res, err));

    },
};