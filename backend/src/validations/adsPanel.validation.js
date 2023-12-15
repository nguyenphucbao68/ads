const Joi = require('joi');

const getAdsPanel = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const createAdsPanel = {};

const updateAdsPanel = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const deleteAdsPanel = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

module.exports = {
  getAdsPanel,
  createAdsPanel,
  updateAdsPanel,
  deleteAdsPanel,
};
