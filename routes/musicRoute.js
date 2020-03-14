const { Router } = require('express');
const { playList } = require('../controllers/musicController');
const { uploadMusic } = require('../middleware/uploadFileMiddleware');
const { addTrack, addAlbum } = require('../controllers/musicController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();

router.post('/track/create', uploadMusic.single('image'), authMiddleware, addTrack);
router.post('/album/create', uploadMusic.single('image'), authMiddleware, addAlbum);

router.post('/playList', authMiddleware, playList);

module.exports = router;
