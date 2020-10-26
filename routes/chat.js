const express = require('express');
const controller = require('../controllers/chats');
const router = express.Router();

router.get('/:botsId/chats' , controller.get);
router.post('/:botsId/chats' , controller.post);

module.exports = router;