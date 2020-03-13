const { Router } = require('express');
const { uploadPost } = require('../middleware/uploadFileMiddleware');
const { authMiddleware } = require('../middleware/authMiddleware');
const { postC, commentC } = require('../controllers');

const router = Router();

router.get('/feed/:userId', postC.getFeed);
router.get('/comments/:postId', postC.getPostComments);
router.get('/report-types', postC.getReportTypes);

router.post('/post', uploadPost.single('image'), authMiddleware, postC.create);
router.post('/getPostUser', authMiddleware, postC.getPostUser);
router.post('/updatePost', authMiddleware, postC.updatePost);
router.post('/deletePost', authMiddleware, postC.deletePost);

router.post('/comment', authMiddleware, commentC.create);
router.post('/toggleLikePost', authMiddleware, postC.toggleLikePost);

router.post('/addToBookmarks', authMiddleware, postC.addToSavedPosts);
router.post('/removeFromBookmarks', authMiddleware, postC.removeFromSavedPosts);

router.post('/getPostByUser', authMiddleware, postC.getPostUser);
router.post('/report/:postId', postC.report);
module.exports = router;
