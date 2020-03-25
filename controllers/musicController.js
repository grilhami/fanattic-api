const {
    sequelize,
    track,
    album,
    user,
    playlist
  } = require('../models');

const { errorHandler } = require('../helpers');

module.exports = {
    addTrack: (req, res) => {
        const { albumId } = req.params;
        const { 
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

        if (!albumId || !title || !genre ||
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

                const trackData = {
                    albumId, 
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
                };

                const savedTrackObj = await track.create( 
                    trackData,
                    { transaction: trackTransaction },
                );

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

    allTracksInAlbum: (req, res) => {
        const { albumId } = req.params;
        track.findAll({
            where: {albumId: albumId}
        }).then(data =>
            res.status(200).json({
            message: 'Get tracks for album',
            data,
            })
        ).catch(
            err => errorHandler(res, err)
        );
    },

    updateTrack: (req, res) => {
        const { albumId } = req.params;
        const { trackId } = req.params;
        const { 
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

        if (!albumId || !title || !genre ||
            !subgenre || !writer  || !albumName ||
            !length || !trackNumber || !primaryArtist ||
            !featuredArtist || !composer || !publisher ||
            !producers || !additionalContributors || !explicitContent ||
            !lyricsLanguage || !lyricsPublisher || !yearOfComposition ||
            !masterRecordingOwner || !yearOfRecording || !releaseLanguage ||
            !copyrights || !req.file || !trackId) {
                return res.status(400).json({
                    message: "Something wrong with creating track",
                    debug: req.body,
            });
        }

        return sequelize.transaction(async trackTransaction => {
            const trackData = {
                albumId, 
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
            };

            const updatedTrackObj = await track.update(
                trackData,
                {
                    where: { 
                        albumId: albumId,
                        id: trackId
                    },
                },
                { 
                    transaction: trackTransaction
                },
            );


        }).then(
            result => res.status(200).json({
                message: 'Track updated.',
                result,
            })
        ).catch(err => errorHandler(res, err));


    },

    deleteTrack: (req, res) => {
        const { albumId } = req.params;
        const { trackId } = req.params;
        track.destroy({ 
            where: {
                albumId: albumId,
                id: trackId
            } 
        }).then(
            () => res.status(200).json({ 
                 message: "Track Deleted." 
            })
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
                    message: "Something wrong with creating album",
                    debug: req.body,
            });
        }

        return sequelize
            .transaction(async albumTransaction => {

                const albumData = {
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
                    collectionType,
                    image: req.file.originalname
                };

                const savedAlbumkObj = await album.create(
                    albumData,
                    { transaction: albumTransaction },
                );
                
                return savedAlbumkObj;

            }).then(
                data => res.status(200).json({
                    message: 'Album created',
                    data,
                }),
            ).catch(
                err => errorHandler(res, err)
            );
        
    },
    allAlbums: (req, res) => {
        album.findAll().then(data =>
            res.status(200).json({
            message: 'Get albums',
            data,
            })
        ).catch(
            err => errorHandler(res, err)
        );
    },

    updateAlbum: (req, res) => {
        const { albumId } = req.params;
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
            !featuredArtist  || !publisher || !albumId ||
            !additionalContributors || !albumYear || !releaseLanguage ||
            !copyrights || !collectionType || !req.file) {
                return res.status(400).json({
                    message: "Something wrong with updating album",
                    debug: req.body,
            });
        }

        return sequelize
            .transaction(async albumTransaction => {

                const albumData = {
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
                    collectionType,
                    image: req.file.originalname
                };

                const updatedAlbumkObj = await album.update(
                    albumData,
                    {
                        where: { id: albumId},
                    },
                    { 
                        transaction: albumTransaction 
                    },
                );
                
                return updatedAlbumkObj;
            }).then(
                result => res.status(200).json({
                    message: 'Album created',
                    result,
                }),
            ).catch(
                err => errorHandler(res, err)
        );

    },

    deleteAlbum: (req, res) => {
        const { albumId } = req.params;
        album.destroy(
            { where: {id: albumId} }
        ).then(
            () => res.status(200).json({ 
                 message: "Album Deleted." 
            })
        ).catch(
            err => errorHandler(res, err)
        );
    },
    getPlaylist: (req, res) => {
        const { userId } = req.params;
        playlist.findAll(
            {
                where: {
                    userId
                }
            }
        ).then(result => 
            {
                return res.status(200).json({
                    message: 'Get playlist.',
                    result,
                    });
            }
        ).catch(
            err => errorHandler(res, err)
        );
    },
    createPlaylist: async (req, res) => 
    {
        const { userId } = req.params;
        const { name } = req.body;

        if (!userId || !name) 
        {
            return res.status(400).json({
                message: "userId and name required",
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

        return sequelize.transaction(async playlistTransaction => {
            const playlistObj = await playlist.create(
                    {
                        userId,
                        name,
                    },
                    { transaction: playlistTransaction }
                );

                return playlistObj;
            }).then( result => {
                return res.status(200).json({
                    message: 'Playlist created.',
                    result,
                    });
            }).catch(err => errorHandler(res, err));

    },
};
