const { Router } = require('express');
const { userC } = require('../controllers');

const router = Router();

// const { auth, parser } = require('../helpers');

router.post('/register', userC.register);
router.post('/login', userC.login);

// router.get('/event/:userId', userC.getEvent);

module.exports = router;
