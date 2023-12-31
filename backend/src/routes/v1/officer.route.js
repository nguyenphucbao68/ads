const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const adsLicense = require('../../validations/ads-license.validation');
const officerController = require('../../controllers/officer.controller.js');
const districtController = require('../../controllers/district.controller.js');
const { officerValidation, changeRequestValidation } = require('../../validations/index.js');
const { changeRequestController } = require('../../controllers/index.js');

const router = express.Router();

// 4 api need to be auth
router.route('/ads-licenses').get(auth('viewAdsLicenses'), officerController.getAdsLicenses); //when login is finish, use the code above
router
  .route('/ads-license')
  .post(auth('postAdsLicense'), validate(adsLicense.postAdsLicense), officerController.postAdsLicense);

router
  .route('/ads-license/:id')
  .delete(auth('deleteAdsLicense'), validate(adsLicense.deleteAdsLicense), officerController.deleteAdsLicense);

router.route('/district/wards').get(auth('getWardsFromDistrict'), districtController.getWards);

router.route('/reports').get(auth('getReports'), officerController.getReportsByRole);

router
  .route('/reports/:id')
  .get(auth('getReports'), officerController.getReportById)
  .post(auth('getReports'), validate(officerValidation.updateReportStatus), officerController.updateReportStatus);

router.route('/edit-requests').post(validate(changeRequestValidation.create), changeRequestController.create);

module.exports = router;
