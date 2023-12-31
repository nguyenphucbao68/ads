const Joi = require('joi');

const getAdsSpot = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const createAdsSpot = {
  body: Joi.object().keys({
    address: Joi.string().required(),
    ward_id: Joi.number().integer().required(),
    district_id: Joi.number().integer().required(),
    spot_type_id: Joi.number().integer().required(),
    ads_type_id: Joi.number().integer().required(),
    image: Joi.string().required(),
    is_available: Joi.boolean().required(),
    max_ads_panels: Joi.number().required(),
    latitude: Joi.number().required(),
    longtitude: Joi.number().required(),
  }),
};

const updateAdsSpot = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    address: Joi.string().required(),
    ward_id: Joi.number().integer().required(),
    district_id: Joi.number().integer().required(),
    spot_type_id: Joi.number().integer().required(),
    ads_type_id: Joi.number().integer().required(),
    image: Joi.string().required(),
    is_available: Joi.boolean().required(),
    max_ads_panels: Joi.number().required(),
    latitude: Joi.number().required(),
    longtitude: Joi.number().required(),
  }),
};

const deleteAdsSpot = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  getAdsSpot,
  createAdsSpot,
  updateAdsSpot,
  deleteAdsSpot,
};
