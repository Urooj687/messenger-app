var express = require('express');
var router = express.Router();
var chatController = require('./chat.controller');
router.get('/:userName/:receiver', chatController.getChat)
module.exports = router;
