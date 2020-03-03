const { Router } = require('express');
const { getMerchandise } = require('../controllers/userController');
const { userC } = require('../controllers');

const router = Router();

// const { auth, parser } = require('../helpers');

router.post('/register', userC.register);
router.post('/login', userC.login);

router.get('/merchandise/:userId', getMerchandise);

module.exports = router;
