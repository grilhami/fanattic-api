const { Router } = require('express');
const { uploadSocialActionCover } = require('../middleware/uploadFileMiddleware');
const { createSocialAction, getAllSocialAction } = require('../controllers/socialActionController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();


router.get("", authMiddleware, getAllSocialAction);
router.post("/:artistId", authMiddleware, uploadSocialActionCover.single("image"),  createSocialAction);

module.exports = router;