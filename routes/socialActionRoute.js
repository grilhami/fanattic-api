const { Router } = require('express');
const { uploadSocialActionCover } = require('../middleware/uploadFileMiddleware');
const { createArtistSocialAction, getAllSocialAction, 
        getArtistSocialAction, updateArtistSocialAction,
        deleteSocialActon, createSocialVideo, 
        getAllSocialVideo, updateSocialVideo } = require('../controllers/socialActionController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();


router.get("", authMiddleware, getAllSocialAction);
router.get("/:artistId", authMiddleware, getArtistSocialAction);
router.post("/:artistId", authMiddleware, uploadSocialActionCover.single("image"),  createArtistSocialAction);
router.put("/:artistId/:actionId", authMiddleware, uploadSocialActionCover.single("image"),  updateArtistSocialAction);
router.delete("/:artistId/:actionId", authMiddleware, deleteSocialActon);

router.get("/:artistId/video", authMiddleware, uploadSocialActionCover.single("image"), getAllSocialVideo);
router.post("/:artistId/:actionId/video", authMiddleware, uploadSocialActionCover.single("image"), createSocialVideo);
router.put("/:artistId/:actionId/video/:videoId", authMiddleware, uploadSocialActionCover.single("image"), updateSocialVideo);


module.exports = router;