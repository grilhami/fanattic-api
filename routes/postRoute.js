const { Router } = require('express');
const { uploadPost } = require('../middleware/uploadFileMiddleware');
const { authMiddleware } = require('../middleware/authMiddleware');
const { postC, commentC } = require('../controllers');

const router = Router();

router.get('/feed/:userId', postC.getFeed);
// Get comment for posts
router.get('/comments/:postId', postC.getPostComments);
router.get('/report-types', postC.getReportTypes);

router.post('/post', authMiddleware, uploadPost.single('image'), postC.create);
router.post('/getPostUser', authMiddleware, postC.getPostUser);
router.post('/updatePost', authMiddleware, postC.updatePost);
router.post('/deletePost', authMiddleware, postC.deletePost);

// Create comment for posts
router.post('/comment/:postId', authMiddleware, commentC.create);

// Get comment replies
router.get('/comment/:postId/:commentId', authMiddleware, commentC.getCommentReplies);

// Create Artist Saved Post
router.get('/:artistId/saved-posts', authMiddleware, postC.getArtistSavedPost);
router.post('/:artistId/saved-posts/:postId', authMiddleware, postC.createArtistSavedPost);

// potential BUG
// router.post('/toggleLikePost', authMiddleware, commentC.toggleLikePost);

router.post('/addToBookmarks', authMiddleware, postC.addToSavedPosts);
router.post('/removeFromBookmarks', authMiddleware, postC.removeFromSavedPosts);

router.post('/getPostByUser', authMiddleware, postC.getPostUser);
router.post('/report/:postId', postC.report);
module.exports = router;
