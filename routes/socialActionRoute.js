const { Router } = require('express');
const { uploadSocialActionCover } = require('../middleware/uploadFileMiddleware');
const { createArtistSocialAction, getAllSocialAction, 
        getArtistSocialAction, updateArtistSocialAction,
        deleteSocialActon, createSocialVideo, 
        getAllSocialVideo, updateSocialVideo, 
        deleteSocialVideo, createSocialArtistBadge,
        getAllSocialArtistBadge, updateSocialArtistBadge, 
        deleteSocialArtistBadge, createUserSocialBadge, 
        getUserSocialBadge } = require('../controllers/socialActionController');
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

// Social Artist Badge
router.get(
        "artist/:artistId/social-badge", 
        authMiddleware,
        getAllSocialArtistBadge);
router.post(
        "artist/:artistId/:actionId/social-badge", 
        authMiddleware, 
        uploadSocialActionCover.single("image"), 
        createSocialArtistBadge);
router.put(
        "artist/:artistId/:actionId/social-badge/:badgeId", 
        authMiddleware, 
        uploadSocialActionCover.single("image"), 
        updateSocialArtistBadge);
router.delete(
        "artist/:artistId/:actionId/social-badge/:badgeId", 
        authMiddleware, 
        deleteSocialArtistBadge);

// Social User Badge
router.get(
        "/user/:userId/social-badge", 
        authMiddleware,
        getUserSocialBadge);
router.post(
        "/user/:userId/:actionId/social-badge", 
        authMiddleware, 
        uploadSocialActionCover.single("image"), 
        createUserSocialBadge);
        
module.exports = router;