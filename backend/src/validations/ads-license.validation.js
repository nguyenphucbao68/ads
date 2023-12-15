const Joi = require('joi');

const getAdsLicense = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const postAdsLicense = {
  body: Joi.object().keys({
    ads_panel_id: Joi.number().integer().required(),
    content: Joi.string().required(),
    user_id: Joi.number().integer().required(),
    start_date: Joi.date().required(),
    expire_date: Joi.date().greater(Joi.ref("start_date")).required(),
  })
}
const deleteAdsLicense = {
  params: Joi.object().keys({
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
