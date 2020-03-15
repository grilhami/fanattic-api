const { Router } = require('express');
const { profile, getUserData } = require('../controllers/userController');
const { showStory } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { addStory } = require('../controllers/userController');
const { userC } = require('../controllers');
const { uploadUser } = require('../middleware/uploadFileMiddleware');

const router = Router();

// const { auth, parser } = require('../helpers');

router.post('/register', uploadUser.single('image'), userC.register);
router.post('/login', userC.login);

router.post('/addStory', authMiddleware, addStory);
router.post('/showStory', authMiddleware, showStory);
router.post('/profile', authMiddleware, profile);

// Get user data based on username
router.get('/:username', authMiddleware, getUserData);

module.exports = router;
