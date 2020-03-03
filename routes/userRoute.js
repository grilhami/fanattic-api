const { Router } = require('express');
const { getEvent } = require('../controllers/userController');
const { getMerchandise } = require('../controllers/userController');
const { userC } = require('../controllers');

const router = Router();

// const { auth, parser } = require('../helpers');

router.post('/register', userC.register);
router.post('/login', userC.login);

router.get('/merchandise/:userId', getMerchandise);
router.get('/event/:userId', getEvent);

module.exports = router;
