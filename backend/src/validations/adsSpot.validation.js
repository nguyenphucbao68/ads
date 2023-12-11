const Joi = require('joi');

const getAdsSpot = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const createAdsSpot = {};

const updateAdsSpot = {};

const deleteAdsSpot = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

module.exports = {
  getAdsSpot,
  createAdsSpot,
  updateAdsSpot,
  deleteAdsSpot,
};
