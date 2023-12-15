const Joi = require('joi');

const getAdsLicense = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const postAdsLicense = {
  body: Joi.object.key({
    ads_panel_id: Joi.number().integer().required(),
    content: Joi.string().required(),
    user_id: Joi.number().integer().required(),
    // start_date: Joi.string().da
  })
}
const deleteAdsLicense = {
  param: Joi.object.key({
    id: Joi.number().required()
  })
}

const adsLicensesList = {};

module.exports = {
  getAdsLicense,
  adsLicensesList,
  postAdsLicense,
  deleteAdsLicense,
};
