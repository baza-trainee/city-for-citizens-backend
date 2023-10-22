const express = require('express');
const router = express.Router();
const createImageController = require('../../controllers/image/createImageController');
const deleteImageController = require('../../controllers/image/deleteImageController');

router.route('/').post(createImageController).delete(deleteImageController);

module.exports = router;
