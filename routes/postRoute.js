const { Router } = require('express');
const { postC } = require('../controllers');

const router = Router();

// const { auth, parser } = require('../helpers');

router.post('/', postC.create);

module.exports = router;
