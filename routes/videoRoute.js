const { Router } = require('express');
const { uploadVideoThumbnail } = require('../middleware/uploadFileMiddleware');
const { authMiddleware } = require('../middleware/authMiddleware');
const { createVideo, allVideos, 
        updateVideo, deleteVideo } = require('../controllers/videoController');

const router = Router();

// Video CRUD
router.get("/videos", authMiddleware, allVideos);
router.post("/videos", uploadVideoThumbnail.single('thumbnail'), authMiddleware, createVideo);
router.put("/videos/:videoId",uploadVideoThumbnail.single('thumbnail'), authMiddleware, updateVideo);
router.delete("/videos/:videoId", authMiddleware, deleteVideo);

// Story CRUD
// router.get("/stories/:username", authMiddleware, allAlbums);
// router.post("/stories/:username", uploadMusic.single('image'), authMiddleware, addAlbum);
// router.put("/stories/:username/:storyId",uploadMusic.single('image'), authMiddleware, updateAlbum);
// router.delete("/stories/:username/:storyid", authMiddleware, deleteAlbum);

module.exports = router;