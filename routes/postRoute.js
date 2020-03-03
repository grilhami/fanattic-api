const { Router } = require('express');
const { uploadPost } = require('../middleware/uploadFileMiddleware');
const { authMiddleware } = require('../middleware/authMiddleware');
const { postC, commentC } = require('../controllers');

const router = Router();

// const { auth, parser } = require('../helpers');

router.get('/feed/:userId', postC.getFeed);

router.post('/post', uploadPost.single('image'), authMiddleware, postC.create);
router.post('/getPostUser', postC.getPostUser);

router.post('/comment', authMiddleware, commentC.create);
// router.post('/toggleLikePost', authMiddleware, commentC.toggleLikePost);

router.post('/add-to-bookmarks', authMiddleware, postC.addToSavedPosts);
router.post(
  '/remove-from-bookmarks',
  authMiddleware,
  postC.removeFromSavedPosts,
);

router.post('/getPostByUser', authMiddleware, postC.getPostUser);

module.exports = router;
