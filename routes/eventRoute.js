const { Router } = require('express');
const { eventC } = require('../controllers');

const router = Router();

router.get('/', eventC.getAll);

module.exports = router;
