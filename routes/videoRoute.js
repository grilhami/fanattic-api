const { Router } = require('express');
const { uploadVideoThumbnail } = require('../middleware/uploadFileMiddleware');
const { authMiddleware } = require('../middleware/authMiddleware');
const { createVideo, allVideos, 
        updateVideo, deleteVideo, 
        createUserStory, allUserStory, 
        updateUserStory, deleteUserStory} = require('../controllers/videoController');

const router = Router();

// Video CRUD
router.get("/videos", authMiddleware, allVideos);
router.post("/videos", uploadVideoThumbnail.single('thumbnail'), authMiddleware, createVideo);
router.put("/videos/:videoId",uploadVideoThumbnail.single('thumbnail'), authMiddleware, updateVideo);
router.delete("/videos/:videoId", authMiddleware, deleteVideo);

// Story CRUD
router.get("/stories/:userId", authMiddleware, allUserStory);
router.post("/stories/:userId", uploadVideoThumbnail.single('image'), authMiddleware, createUserStory);
router.put("/stories/:userId/:storyId",uploadVideoThumbnail.single('image'), authMiddleware, updateUserStory);
router.delete("/stories/:userId/:storyId", authMiddleware, deleteUserStory);

module.exports = router;