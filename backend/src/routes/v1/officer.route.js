const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const officerValidation = require('../../validations/officer.validation');
const router = express.Router();

router.route('/reports').get(auth('getReport'), validate(officerValidation.getReport));

module.exports = router;
