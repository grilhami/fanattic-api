const {
    sequelize,
    track,
    album
  } = require('../models');

const { errorHandler } = require('../helpers');

module.exports = {
    addTrack: (req, res) => {
        const { 
            trackId, 
            title, 
            genre, 
            subgenre, 
            writer, 
            albumName, 
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
            !subgenre || !writer  || !albumName ||
            !length || !trackNumber || !primaryArtist ||
            !featuredArtist || !composer || !publisher ||
            !producers || !additionalContributors || !explicitContent ||
            !lyricsLanguage || !lyricsPublisher || !yearOfComposition ||
            !masterRecordingOwner || !yearOfRecording || !releaseLanguage ||
            !copyrights || !req.file) {
                return res.status(400).json({
                    message: "Something wrong with creating track",
                    debug: req.body,
            });
        }

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
                    image: req.file.originalname
                },
                { transaction: trackTransaction },
                );
                console.log("created and returning tracl saved object");
                return savedTrackObj;
            }).then(
                result => res.status(200).json({
                    message: 'Track created',
                    result,
                }),
            ).catch(
                err => errorHandler(res, err)
            );
        
        
    },

    addAlbum: (req, res) => {
        const { 
            title, 
            genre, 
            subgenre, 
            length, 
            numberOfTracks, 
            primaryArtist, 
            featuredArtist, 
            publisher, 
            additionalContributors,
            albumYear,
            releaseLanguage, 
            copyrights, 
            collectionType} = req.body;

        if (!title || !genre || !subgenre || 
            !length || !numberOfTracks || !primaryArtist ||
            !featuredArtist  || !publisher ||
            !additionalContributors || !albumYear || !releaseLanguage ||
            !copyrights || !collectionType || !req.file) {
                return res.status(400).json({
                    message: "Something wrong with creating track",
                    debug: req.body,
            });
        }

        return sequelize
            .transaction(async albumTransaction => {
                const savedAlbumkObj = await album.create(
                {
                    title, 
                    genre, 
                    subgenre, 
                    length, 
                    numberOfTracks, 
                    primaryArtist, 
                    featuredArtist, 
                    publisher, 
                    additionalContributors,
                    albumYear,
                    releaseLanguage, 
                    copyrights, 
                    collectionType
                },
                { transaction: albumTransaction },
                );
                
                return savedAlbumkObj;
            }).then(
                result => res.status(200).json({
                    message: 'Album created',
                    result,
                }),
            ).catch(
                err => errorHandler(res, err)
            );
        
    },
    playList: (req,res) => {
        const {id: userId} = res.userData
    }
};
