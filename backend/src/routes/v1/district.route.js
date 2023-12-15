const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const district = require('../../validations/district.validation');
const districtController = require('../../controllers/district.controller.js');

const router = express.Router();


router.route('/:id/wards').get(validate(district.getWards), districtController.getWards);

module.exports = router;
