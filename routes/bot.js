const express = require('express');
const controller = require('../controllers/bots');
const router = express.Router();


router.get('/' , controller.get);
router.post('/' , controller.post);


module.exports = router;