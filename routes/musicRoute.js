const { Router } = require('express');
const { uploadMusic } = require('../middleware/uploadFileMiddleware');
const { addMusic } = require('../controllers/musicController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();

router.post('/music', uploadMusic.single('music'), authMiddleware, addMusic);

module.exports = router;
