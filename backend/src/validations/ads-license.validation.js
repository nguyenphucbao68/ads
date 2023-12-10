const Joi = require('joi');

const getAdsLicense = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const adsLicensesList = {
  params: Joi.object().keys({
    wid: Joi.number().required(),
  }),
};

module.exports = {
  getAdsLicense,
  adsLicensesList,
};
