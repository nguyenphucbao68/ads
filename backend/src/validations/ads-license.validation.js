const Joi = require('joi');

const getAdsLicense = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const adsLicensesList = {};

module.exports = {
  getAdsLicense,
  adsLicensesList,
};
