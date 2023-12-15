const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const adsLicense = require('../../validations/ads-license.validation');
const officerController = require('../../controllers/officer.controller.js');

const router = express.Router();


// router.route('/ads-licenses').get(auth('getAdsLicenses'), officerController.getAdsLicenses);
// router.route('/ads-license').post(auth('postAdsLicense'), validate(adsLicense.postAdsLicense), officerController.postAdsLicense);
router.route('/ads-licenses').get(officerController.getAdsLicenses);//when login is finish, use the code above
router.route('/ads-license').post(validate(adsLicense.postAdsLicense), officerController.postAdsLicense);
router.route('/ads-license/:id').delete(validate(adsLicense.deleteAdsLicense), officerController.deleteAdsLicense);

module.exports = router;
