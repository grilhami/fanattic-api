const { Router } = require('express');
const { merchandiseC } = require('../controllers');

const router = Router();

router.get('/catalogue', merchandiseC.getAll);

module.exports = router;
