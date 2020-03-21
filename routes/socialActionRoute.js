const { Router } = require('express');
const { uploadSocialActionCover } = require('../middleware/uploadFileMiddleware');
const { createArtistSocialAction, getAllSocialAction, 
        getArtistSocialAction, updateArtistSocialAction,
        deleteSocialActon } = require('../controllers/socialActionController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();


router.get("", authMiddleware, getAllSocialAction);
router.get("/:artistId", authMiddleware, getArtistSocialAction);
router.post("/:artistId", authMiddleware, uploadSocialActionCover.single("image"),  createArtistSocialAction);
router.put("/:artistId/:actionId", authMiddleware, uploadSocialActionCover.single("image"),  updateArtistSocialAction);
router.delete("/:artistId/:actionId", authMiddleware, uploadSocialActionCover.single("image"), deleteSocialActon);

module.exports = router;