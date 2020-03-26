const {
    sequelize,
    track,
    album,
    user,
    playlist,
    playlist_content,
    genre,
    subgenre
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
    updatePlaylist: async (req, res) => 
    {
        const { userId, playlistId } = req.params;
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
            const playlistObj = await playlist.update(
                    {
                        name,
                    },
                    {
                        where: {
                            id: playlistId,
                            userId
                        }
                    }, 
                    { transaction: playlistTransaction }
                );

                return playlistObj;
            }).then( result => 
                {
                return res.status(200).json({
                    message: 'Playlist updated.',
                    result,
                    });
                }
            ).catch(
                err => errorHandler(res, err)
            );
    },
    deletePlaylist: (req, res) => 
    {
        const { userId, playlistId } = req.params;

        if (!userId || !playlistId) 
        {
            return res.status(400).json({
                message: "userId and playlistId required",
                debug: req.body,
            });
        }

        playlist.destroy(
            {
                where: {
                    id: playlistId,
                    userId
                }
            }
        ).then(result => 
            {
                return res.status(200).json({
                    message: 'Playlist deleted.',
                    result,
                    });
            }
        ).catch(
            err => errorHandler(res, err)
        );
    },
    getPlaylistContent: (req, res) => 
    {
        const { trackId } = req.query;
        const { playlistId } = req.params;

        if (!playlistId) 
        {
            return res.status(400).json({
                message: "At least playlistId required",
                debug: req.body,
            });
        }

        let whereSelector;

        if (!trackId) 
        {
            whereSelector = {
                where: {
                     playlistId
                }
            };
        } else {
            whereSelector = {
                playlistId,
                trackId
            };
        }

        playlist_content.findAll(whereSelector).then(result =>
            {
                return res.status(200).json({
                    message: 'Get playlist\'content.',
                    result,
                    });
            }).catch(
                err => errorHandler(res, err)
            );

    },
    createPlaylistContent: async (req, res) => 
    {
        const {userId, playlistId, trackId} = req.params;

        if (!userId || !playlistId || !trackId) 
        {
            return res.status(400).json({
                message: "userId, playlistId, and trackId required",
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

        const playlistObj = await playlist.findOne({ where: {id: playlistId } });

        if (playlistObj == null) {
            return res.status(400).json({
                message: "Playlist does not exist.",
                debug: req.body,
            });
        }

        return sequelize.transaction(async playlistContentTransaction => {
            const playlistContentObj = await playlist_content.create(
                    {
                        playlistId,
                        trackId
                    },
                    { transaction: playlistContentTransaction }
                );

                return playlistContentObj;
            }).then( result => {
                return res.status(200).json({
                    message: 'Track added to playlist.',
                    result,
                });
            }).catch(
                err => errorHandler(res, err)
            );
    },
    deletePlaylistContent: (req, res) => 
    {
        const { playlistId, trackId } = req.params;

        if (!playlistId || !trackId) 
        {
            return res.status(400).json({
                message: "PlaylistId and trackId required.",
                debug: req.body,
            });
        }

        playlist_content.destroy(
            {
                where: {
                    playlistId,
                    trackId
                }
            }
        ).then(result => 
            {
                return res.status(200).json({
                    message: 'Track deleted to playlist.',
                    result,
                });
            }
        ).catch(
            err => errorHandler(res, err)
        );
        
    },
    getGenre: (req, res) => 
    {
        const { genreId } = req.query;

        let whereSelector;

        if (!genreId) 
        {
            whereSelector = {
                where: {}
            }
        }
        else
        {
            whereSelector = {
                where: {
                    id: genreId
                }
            }
        }

        genre.findAll(
            whereSelector
        ).then(result => 
            {
                return res.status(200).json({
                    message: 'Getting genres.',
                    result,
                });
            }
        ).catch(
            err => errorHandler(res, err)
        );
    },
    createGenre: (req, res) =>
    {
        const { name } = req.body;

        if (!name) 
        {
            return res.status(400).json({
                message: "Genre name required.",
                debug: req.body,
            });
        }

        return sequelize.transaction(async genreTransaction => {
            const genreObj = await genre.create(
                    {
                        name
                    },
                    { transaction: genreTransaction }
                );

                return genreObj;
            }).then( result => {
                return res.status(200).json({
                    message: 'Genre created.',
                    result,
                });
            }).catch(
                err => errorHandler(res, err)
            );
    },
    updateGenre: (req, res) => 
    {
        const { genreId } = req.params;
        const { name } = req.body;

        if (!name || !genreId) 
        {
            return res.status(400).json({
                message: "Genre name and ID required.",
                debug: req.body,
            });
        }

        return sequelize.transaction(async genreTransaction => {
            const genreObj = await genre.create(
                    {
                        name
                    },
                    {
                        where: {
                            id: genreId
                        }
                    },
                    { transaction: genreTransaction }
                );

                return genreObj;
            }).then( result => {
                return res.status(200).json({
                    message: 'Genre updated.',
                    result,
                });
            }).catch(
                err => errorHandler(res, err)
            );
    },
    deleteGenre: (req, res) => 
    {
        const { genreId } = req.params;

        if (!genreId) 
        {
            return res.status(400).json({
                message: "Genre ID is required.",
                debug: req.body,
            });
        }

        genre.destroy(
            {
                where: {
                    id: genreId
                }
            }
        ).then(result => 
            {
                return res.status(200).json({
                    message: 'Genre deleted.',
                    result,
                });
            }
        ).catch(
            err => errorHandler(res, err)
        );
    },
    getSubgenre: (req, res) => 
    {
        const { subgenreId } = req.query;

        let whereSelector;

        if (!subgenreId) 
        {
            whereSelector = {
                where: {}
            }
        }
        else
        {
            whereSelector = {
                where: {
                    id: subgenreId
                }
            }
        }

        subgenre.findAll(
            whereSelector
        ).then(result => 
            {
                return res.status(200).json({
                    message: 'Getting subgenres.',
                    result,
                });
            }
        ).catch(
            err => errorHandler(res, err)
        );

    },
    createSubgenre: (req, res) => 
    {
        const { genreId } = req.params;
        const { name } = req.body;
        console.log(genreId);
        
        if (!genreId || !name) 
        {
            return res.status(400).json({
                message: "Name and genreId required.",
                debug: req.body,
            });
        }

        return sequelize.transaction(async subgenreTransaction => {
            const subgenreObj = await subgenre.create(
                    {
                        genreId,
                        name
                    },
                    { transaction: subgenreTransaction }
                );

                return subgenreObj;
            }).then( result => {
                return res.status(200).json({
                    message: 'Subgenre created.',
                    result,
                });
            }).catch(
                err => errorHandler(res, err)
            );
    },
};
