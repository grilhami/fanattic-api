const { Router } = require('express');
const { postC, commentC } = require('../controllers');

const router = Router();

// const { auth, parser } = require('../helpers');

router.get('/feed/:userId', postC.getFeed);

router.post('/create', postC.create);
router.post('/comment', commentC.create);

router.post('/add-to-bookmarks', postC.addToSavedPosts);
router.post('/remove-from-bookmarks', postC.removeFromSavedPosts);

router.post('/getPostByUser', postC.getPostUser);

module.exports = router;
