const {
    sequelize,
    track,
    album
  } = require('../models');

exports.addTrack = (req, res) => {
    const { 
        trackId, 
        title, 
        genre, 
        subgenre, 
        writer, 
        album, 
        length, 
        trackNumber, 
        primaryArtist, 
        featuredArtist, 
        composer, 
        publisher, 
        producers, 
        additionalContributors, 
        explicitContent, 
        lyricsLanguage, 
        lyricsPublisher, 
        yearOfComposition, 
        masterRecordingOwner, 
        yearOfRecording, 
        releaseLanguage, 
        copyrights} = req.body;
    
    if (!trackId || !title || !genre ||
        !subgenre || !writer  || !album ||
        !length || !trackNumber || !primaryArtist ||
        !featuredArtist || !composer || !publisher ||
        !producers || additionalContributors || !explicitContent ||
        !lyricsLanguage || !lyricsPublisher || !yearOfComposition ||
        !masterRecordingOwner || !yearOfRecording || !releaseLanguage ||
        !copyrights || !req.file) {
            return res.status(400).json({
                message: "Something wrong with creating track",
                debug: req.body,
              });

    return sequelize
        .transaction(async trackTransaction => {
            const savedTrackObj = await track.create(
              {
                trackId, 
                title, 
                genre, 
                subgenre, 
                writer, 
                album, 
                length, 
                trackNumber, 
                primaryArtist, 
                featuredArtist, 
                composer, 
                publisher, 
                producers, 
                additionalContributors, 
                explicitContent, 
                lyricsLanguage, 
                lyricsPublisher, 
                yearOfComposition, 
                masterRecordingOwner, 
                yearOfRecording, 
                releaseLanguage, 
                copyrights,
                image: req.file
              },
              { transaction: trackTransaction },
            );
            return savedTrackObj;
        }).then(
            res.status(200).json({
                message: 'Track created',
                result,
            }),
        ).catch(
            err => errorHandler(res, err)
        );

    }
}

exports.playList = (req,res) => {
    const {id: userId} = res.userData
}
