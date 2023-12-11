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
  .route('/districts/:id')
  .get(auth('getDistrict'), validate(districtValidation.getDistrict), districtController.getDistrict)
  .put(auth('updateDistrict'), validate(districtValidation.updateDistrict), districtController.updateDistrict)
  .delete(auth('deleteDistrict'), validate(districtValidation.deleteDistrict), districtController.deleteDistrict);

router
  .route('/districts')
  .get(auth('getDistricts'), districtController.getDistricts)
  .post(auth('createDistrict'), validate(districtValidation.createDistrict), districtController.createDistrict);

router
  .route('/wards/:id')
  .get(auth('getWard'), validate(wardValidation.getWard), wardController.getWard)
  .put(auth('updateWard'), validate(wardValidation.updateWard), wardController.updateWard)
  .delete(auth('deleteWard'), validate(wardValidation.deleteWard), wardController.deleteWard);

router
  .route('/wards')
  .get(auth('getWards'), wardController.getWards)
  .post(auth('createWard'), validate(wardValidation.createWard), wardController.createWard);

router
  .route('/ads-spots/:id')
  .get(auth('getAdsSpot'), validate(adsSpotValidation.getAdsSpot), adsSpotController.getAdsSpot)
  .put(auth('updateAdsSpot'), validate(adsSpotValidation.updateAdsSpot), adsSpotController.updateAdsSpot)
  .delete(auth('deleteAdsSpot'), validate(adsSpotValidation.deleteAdsSpot), adsSpotController.deleteAdsSpot);

router
  .route('/ads-spots')
  .get(adsSpotController.getAdsSpots)
  .post(auth('createAdsSpot'), validate(adsSpotValidation.createAdsSpot), adsSpotController.createAdsSpot);

router
  .route('/ads-panels/:id')
  .get(auth('getAdsPanel'), validate(adsPanelValidation.getAdsPanel), adsPanelController.getAdsPanel)
  .put(auth('updateAdsPanel'), validate(adsPanelValidation.updateAdsPanel), adsPanelController.updateAdsPanel)
  .delete(auth('deleteAdsPanel'), validate(adsPanelValidation.deleteAdsPanel), adsPanelController.deleteAdsPanel);

router
  .route('/ads-panels')
  .get(auth('getAdsPanels'), adsPanelController.getAdsPanels)
  .post(auth('createAdsPanel'), validate(adsPanelValidation.createAdsPanel), adsPanelController.createAdsPanel);

module.exports = router;
