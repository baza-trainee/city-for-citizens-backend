const express = require('express');
const router = express.Router();
const createImageController = require('../../controllers/image/createImageController');

router.route('/').post(createImageController);

module.exports = router;
