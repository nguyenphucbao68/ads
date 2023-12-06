import express from "express";
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import adsLicense from '../../validations/ads-license.validation';
import offficerController from '../../controllers/officer.controller' 

const router = express.Router();


router.route('/officer').get(auth('getAdsLicenses'), validate(adsLicense.getAdsLicenses), offficerController.getAdsLicenses);
router.route('/officer').post(auth('postAdsLicense'), validate(adsLicense.postAdsLicense), offficerController.postAdsLicense);
router.route('/officer').delete(validate(adsLicense.deleteAdsLicense), offficerController.deleteAdsLicense);
