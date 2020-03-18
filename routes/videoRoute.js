const { Router } = require('express');
const { uploadVideoThumbnail } = require('../middleware/uploadFileMiddleware');
const { authMiddleware } = require('../middleware/authMiddleware');
const { createVideo, allVideos, 
        updateVideo, deleteVideo } = require('../controllers/videoController');

const router = Router();

// Video CRUD
router.get("", authMiddleware, allVideos);
router.post("", uploadVideoThumbnail.single('thumbnail'), authMiddleware, createVideo);
router.put("/:videoId",uploadVideoThumbnail.single('thumbnail'), authMiddleware, updateVideo);
router.delete("/:videoId", authMiddleware, deleteVideo);

// Story CRUD
// router.get("/stories", authMiddleware, allAlbums);
// router.post("/stories", uploadMusic.single('image'), authMiddleware, addAlbum);
// router.put("/stories/:storyId",uploadMusic.single('image'), authMiddleware, updateAlbum);
// router.delete("/stories/:storyid", authMiddleware, deleteAlbum);

module.exports = router;