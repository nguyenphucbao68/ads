const Joi = require('joi');

const getAdsLicense = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const postAdsLicense = {
  body: Joi.object().keys({
    ads_panel_id: Joi.number().integer().required(),
    content: Joi.string().required(),
    start_date: Joi.date().required(),
    expire_date: Joi.date().greater(Joi.ref('start_date')).required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
  }),
};
const deleteAdsLicense = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const updateAdsLicense = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    status: Joi.number().integer().required(),
  }),
};

const adsLicensesList = {};

module.exports = {
  getAdsLicense,
  adsLicensesList,
  postAdsLicense,
  deleteAdsLicense,
  updateAdsLicense,
};
