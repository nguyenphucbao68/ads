const express = require('express');
const { wardController } = require('../../controllers');

const router = express.Router();

router.get('/wards', wardController.getWards)

module.exports = router;