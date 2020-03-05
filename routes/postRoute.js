const { Router } = require('express');
const { uploadPost } = require('../middleware/uploadFileMiddleware');
const { authMiddleware } = require('../middleware/authMiddleware');
const { postC, commentC } = require('../controllers');

const router = Router();

// const { auth, parser } = require('../helpers');

router.get('/feed/:userId', postC.getFeed);
router.get('/report-types', postC.getReportTypes);

router.post('/post', uploadPost.single('image'), authMiddleware, postC.create);
router.post('/getPostUser', postC.getPostUser);

router.post('/comment', authMiddleware, commentC.create);
router.post('/toggleLikePost', authMiddleware, commentC.toggleLikePost);

router.post('/addToBookmarks', authMiddleware, postC.addToSavedPosts);
router.post('/removeFromBookmarks', authMiddleware, postC.removeFromSavedPosts);

router.post('/getPostByUser', authMiddleware, postC.getPostUser);
router.post('/report/:postId', postC.report);
module.exports = router;
