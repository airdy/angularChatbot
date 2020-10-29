const express = require('express');
const controller = require('../controllers/chats');
const router = express.Router();

router.get('/:botsId' , controller.get);
router.post('/:botsId' , controller.post);

module.exports = router;