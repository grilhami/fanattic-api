const { Router } = require('express');
const { uploadSocialActionCover } = require('../middleware/uploadFileMiddleware');
const { createSocialAction } = require('../controllers/socialActionController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();

router.post("/:artistId", authMiddleware, uploadSocialActionCover.single("image"),  createSocialAction);

module.exports = router;