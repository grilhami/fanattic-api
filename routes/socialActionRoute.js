const { Router } = require('express');
const { uploadSocialActionCover } = require('../middleware/uploadFileMiddleware');
const { createArtistSocialAction, getAllSocialAction, 
        getArtistSocialAction, updateArtistSocialAction,
        deleteSocialActon, createSocialVideo, 
        getAllSocialVideo, updateSocialVideo, 
        deleteSocialVideo, createSocialArtistBadge,
        getAllSocialArtistBadge, updateSocialArtistBadge } = require('../controllers/socialActionController');
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
router.delete("/:artistId/:actionId/video/:videoId", authMiddleware, deleteSocialVideo);

router.get(
        "/:artistId/social-badge", 
        authMiddleware,
        getAllSocialArtistBadge);
router.post(
        "/:artistId/:actionId/social-badge", 
        authMiddleware, 
        uploadSocialActionCover.single("image"), 
        createSocialArtistBadge);
router.put(
        "/:artistId/:actionId/social-badge/:badgeId", 
        authMiddleware, 
        uploadSocialActionCover.single("image"), 
        updateSocialArtistBadge);


module.exports = router;