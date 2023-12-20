const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {
  districtValidation,
  wardValidation,
  adsSpotValidation,
  adsPanelValidation,
  adsLicenseValidation,
  adsPanelTypeValidation,
  reportTypeValidation,
  changeRequestValidation,
  userValidation,
  adsTypeValidation,
  spotTypeValidation,
  statisticValidation,
} = require('../../validations');
const {
  districtController,
  wardController,
  adsSpotController,
  adsPanelController,
  adsLicenseController,
  adsPanelTypeController,
  reportTypeController,
  changeRequestController,
  userController,
  adsTypeController,
  spotTypeController,
  statisticController,
} = require('../../controllers');

const router = express.Router();

router
  .route('/districts/:id')
  .get(validate(districtValidation.getDistrict), districtController.getDistrict)
  .put(auth('updateDistrict'), validate(districtValidation.updateDistrict), districtController.updateDistrict)
  .delete(auth('deleteDistrict'), validate(districtValidation.deleteDistrict), districtController.deleteDistrict);

router
  .route('/districts')
  .get(districtController.getDistricts)
  .post(auth('createDistrict'), validate(districtValidation.createDistrict), districtController.createDistrict);

router
  .route('/wards/:id')
  .get(validate(wardValidation.getWard), wardController.getWard)
  .put(auth('updateWard'), validate(wardValidation.updateWard), wardController.updateWard)
  .delete(auth('deleteWard'), validate(wardValidation.deleteWard), wardController.deleteWard);

router
  .route('/wards')
  .get(wardController.getWards)
  .post(auth('createWard'), validate(wardValidation.createWard), wardController.createWard);

router
  .route('/ads-spots/:id')
  .get(validate(adsSpotValidation.getAdsSpot), adsSpotController.getAdsSpot)
  .put(auth('updateAdsSpot'), validate(adsSpotValidation.updateAdsSpot), adsSpotController.updateAdsSpot)
  .delete(auth('deleteAdsSpot'), validate(adsSpotValidation.deleteAdsSpot), adsSpotController.deleteAdsSpot);

router
  .route('/ads-spots')
  .get(adsSpotController.getAdsSpots)
  .post(auth('createAdsSpot'), validate(adsSpotValidation.createAdsSpot), adsSpotController.createAdsSpot);

router
  .route('/ads-panels/:id')
  .get(validate(adsPanelValidation.getAdsPanel), adsPanelController.getAdsPanel)
  .put(auth('updateAdsPanel'), validate(adsPanelValidation.updateAdsPanel), adsPanelController.updateAdsPanel)
  .delete(auth('deleteAdsPanel'), validate(adsPanelValidation.deleteAdsPanel), adsPanelController.deleteAdsPanel);

router
  .route('/ads-panels')
  .get(adsPanelController.getAdsPanels)
  .post(auth('createAdsPanel'), validate(adsPanelValidation.createAdsPanel), adsPanelController.createAdsPanel);

router
  .route('/ads-licenses/:id')
  .get(validate(adsLicenseValidation.getAdsLicense), adsLicenseController.getAdsLicense)
  .put(auth('updateAdsLicense'), validate(adsLicenseValidation.updateAdsLicense), adsLicenseController.updateAdsLicense);

router.route('/ads-licenses').get(adsLicenseController.getAdsLicenses);

router
  .route('/ads-panel-types')
  .get(adsPanelTypeController.getAll)
  .post(auth('createAdsPanelType'), validate(adsPanelTypeValidation.create), adsPanelTypeController.create);

router
  .route('/ads-panel-types/:id')
  .get(validate(adsPanelTypeValidation.getById), adsPanelTypeController.getById)
  .put(auth('updateAdsPanelType'), validate(adsPanelTypeValidation.update), adsPanelTypeController.update)
  .delete(
    auth('deleteAdsPanelType'),
    validate(adsPanelTypeValidation.deleteAdsPanelType),
    adsPanelTypeController.deleteAdsPanelType
  );

router
  .route('/report-types')
  .get(reportTypeController.getAll)
  .post(auth('createReportType'), validate(reportTypeValidation.create), reportTypeController.create);

router
  .route('/report-types/:id')
  .get(validate(reportTypeValidation.getById), reportTypeController.getById)
  .put(auth('updateReportType'), validate(reportTypeValidation.update), reportTypeController.update)
  .delete(auth('deleteReportType'), validate(reportTypeValidation.deleteReportType), reportTypeController.deleteReportType);

router
  .route('/ads-types')
  .get(adsTypeController.getAll)
  .post(auth('createAdsType'), validate(adsTypeValidation.create), adsTypeController.create);

router
  .route('/ads-types/:id')
  .get(validate(adsTypeValidation.getById), adsTypeController.getById)
  .put(auth('updateAdsType'), validate(adsTypeValidation.update), adsTypeController.update)
  .delete(auth('deleteAdsType'), validate(adsTypeValidation.deleteAdsType), adsTypeController.deleteAdsType);

router
  .route('/spot-types')
  .get(spotTypeController.getAll)
  .post(auth('createSpotType'), validate(spotTypeValidation.create), spotTypeController.create);

router
  .route('/spot-types/:id')
  .get(validate(spotTypeValidation.getById), spotTypeController.getById)
  .put(auth('updateSpotType'), validate(spotTypeValidation.update), spotTypeController.update)
  .delete(auth('deleteSpotType'), validate(spotTypeValidation.deleteSpotType), spotTypeController.deleteSpotType);

router
  .route('/edit-requests/:id')
  .put(auth('updateChangeRequest'), validate(changeRequestValidation.update), changeRequestController.update);

router
  .route('/users')
  .get(userController.getAll)
  .post(auth('createUser'), validate(userValidation.create), userController.create);

router
  .route('/users/:id')
  .get(validate(userValidation.getById), userController.getById)
  .put(auth('updateUser'), validate(userValidation.update), userController.update)
  .delete(auth('deleteUser'), validate(userValidation.deleteUser), userController.deleteUser);

router
  .route('/statistics/reports')
  .get(validate(statisticValidation.getReportsStatistics), statisticController.getReportsStatistics);
module.exports = router;
