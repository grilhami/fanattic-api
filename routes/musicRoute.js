const { Router } = require('express');
const { playList } = require('../controllers/musicController');
const { uploadMusic } = require('../middleware/uploadFileMiddleware');
const { 
    addTrack, addAlbum, 
    allAlbums, updateAlbum, 
    deleteAlbum, allTracksInAlbum } = require('../controllers/musicController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();

// Album
router.get("/albums", authMiddleware, allAlbums);
router.post("/albums", uploadMusic.single('image'), authMiddleware, addAlbum);
router.put("/albums/:albumId",uploadMusic.single('image'), authMiddleware, updateAlbum);
router.delete("/albums/:albumId", authMiddleware, deleteAlbum);

// Tracks
router.get('/albums/:albumId/tracks', authMiddleware, allTracksInAlbum);
router.post('/albums/:albumId/tracks', uploadMusic.single('image'), authMiddleware, addTrack);

router.post('/playList', authMiddleware, playList);

module.exports = router;
