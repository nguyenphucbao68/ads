const express = require('express');
const validate = require('../../middlewares/validate');
const { adsLicenseValidation } = require('../../validations');
const { adsLicenseController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/:id').get(validate(adsLicenseValidation.getAdsLicense), adsLicenseController.getAdsLicense);

router
  .route('/:wid/:t')
  .get(auth('getAdsLicense'), validate(adsLicenseValidation.adsLicensesList), adsLicenseController.getAdsLicenses);

module.exports = router;
