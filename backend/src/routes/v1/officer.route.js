const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const adsLicense = require('../../validations/ads-license.validation');
const district = require('../../validations/district.validation')
const officerController = require('../../controllers/officer.controller.js');
const districtController = require('../../controllers/district.controller.js');

const router = express.Router();


// 4 api need to be auth
router.route('/ads-licenses').get(officerController.getAdsLicenses);//when login is finish, use the code above
router.route('/ads-license').post(validate(adsLicense.postAdsLicense), officerController.postAdsLicense);
router.route('/ads-license/:id').delete(validate(adsLicense.deleteAdsLicense), officerController.deleteAdsLicense);
router.route('/district/wards').get(districtController.getWards)

module.exports = router;
