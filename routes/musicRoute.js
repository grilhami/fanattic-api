const { Router } = require('express');
const { playList } = require('../controllers/musicController');
const { uploadMusic } = require('../middleware/uploadFileMiddleware');
const { addMusic } = require('../controllers/musicController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();

router.post('/music', uploadMusic.single('music'), authMiddleware, addMusic);
router.post('/playList', authMiddleware, playList);

module.exports = router;
