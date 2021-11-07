var express = require('express');
var router = express.Router();
var userController = require('./userController');

/*
 * GET
 */
router.get('/:userName/find-list', userController.list);

/*
 * GET
 */
router.get('/:userName', userController.show);

/*
 * POST
 */
router.post('/', userController.create);

/*
 * PUT
 */
router.delete('/:id', userController.remove)
module.exports = router;
