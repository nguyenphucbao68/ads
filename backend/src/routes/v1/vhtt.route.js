const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const districtValidation = require('../../validations/district.validation');
const districtController = require('../../controllers/district.controller');
const wardValidation = require('../../validations/ward.validation');
const wardController = require('../../controllers/ward.controller');
const adsPanelValidation = require('../../validations/adsPanel.validation');
const adsPanelController = require('../../controllers/adsPanel.controller');
const adsSpotValidation = require('../../validations/adsSpot.validation');
const adsSpotController = require('../../controllers/adsSpot.controller');

const router = express.Router();

router
  .route('/districts')
  .get(auth('getDistricts'), districtController.getDistricts)
  .post(auth('createDistrict'), validate(districtValidation.createDistrict), districtController.createDistrict)
  .put(auth('updateDistrict'), validate(districtValidation.updateDistrict), districtController.updateDistrict)
  .delete(auth('deleteDistrict'), validate(districtValidation.deleteDistrict), districtController.deleteDistrict);

router
  .route('/wards')
  .get(auth('getWards'), wardController.getWards)
  .post(auth('createWard'), validate(wardValidation.createWard), wardController.createWard)
  .put(auth('updateWard'), validate(wardValidation.updateWard), wardController.updateWard)
  .delete(auth('deleteWard'), validate(wardValidation.deleteWard), wardController.deleteWard);

router
  .route('/ads-spots')
  .get(auth('getAdsSpots'), adsSpotController.getAdsSpots)
  .post(auth('createAdsSpot'), validate(adsSpotValidation.createAdsSpot), adsSpotController.createAdsSpot)
  .put(auth('updateAdsSpot'), validate(adsSpotValidation.updateAdsSpot), adsSpotController.updateAdsSpot)
  .delete(auth('deleteAdsSpot'), validate(adsSpotValidation.deleteAdsSpot), adsSpotController.deleteAdsSpot);

router
  .route('/ads-panels')
  .get(auth('getAdsPanels'), adsPanelController.getAdsPanels)
  .post(auth('createAdsPanel'), validate(adsPanelValidation.createAdsPanel), adsPanelController.createAdsPanel)
  .put(auth('updateAdsPanel'), validate(adsPanelValidation.updateAdsPanel), adsPanelController.updateAdsPanel)
  .delete(auth('deleteAdsPanel'), validate(adsPanelValidation.deleteAdsPanel), adsPanelController.deleteAdsPanel);

module.exports = router;
