const { Router } = require('express');
const { userC } = require('../controllers');

const router = Router();

// const { auth, parser } = require('../helpers');

router.post('/register', userC.register);
router.post('/login', userC.login);

module.exports = router;
