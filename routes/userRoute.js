const { Router } = require('express');
const { profile } = require('../controllers/userController');
const { showStory } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { addStory } = require('../controllers/userController');
const { userC } = require('../controllers');

const router = Router();

// const { auth, parser } = require('../helpers');

router.post('/register', userC.register);
router.post('/login', userC.login);

router.post('/addStory', authMiddleware, addStory);
router.post('/showStory', authMiddleware, showStory);
router.post('/profile', authMiddleware, profile);

module.exports = router;
