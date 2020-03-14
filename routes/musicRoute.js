const { Router } = require('express');
const { playList } = require('../controllers/musicController');
const { uploadMusic } = require('../middleware/uploadFileMiddleware');
const { addTrack, addAlbum, allAlbums, updateAlbum } = require('../controllers/musicController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();

router.get("/albums", authMiddleware, allAlbums);

router.post('/tracks', uploadMusic.single('image'), authMiddleware, addTrack);
router.post('/albums', uploadMusic.single('image'), authMiddleware, addAlbum);

router.put("/albums/:albumId",uploadMusic.single('image'), authMiddleware, updateAlbum);

router.post('/playList', authMiddleware, playList);

module.exports = router;
