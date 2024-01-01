const express = require('express');
const validate = require('../../middlewares/validate');
const { reportValidation } = require('../../validations');
const { reportController } = require('../../controllers');
// const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(validate(reportValidation.getReports), reportController.getReports);

router.route('/create').post(validate(reportValidation.createReports), reportController.createReport);

module.exports = router;
