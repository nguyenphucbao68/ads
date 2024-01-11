const Joi = require('joi').extend(require('@joi/date'));
const getAdsPanel = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const createAdsPanel = {
  body: Joi.object().keys({
    ads_type_id: Joi.number().integer().required(),
    ads_spot_id: Joi.number().integer().required(),
    height: Joi.number().required(),
    width: Joi.number().required(),
    // expire_date: Joi.date().format('YYYY-MM-DD').required(),
    // image: Joi.string().required(),
  }),
};

const updateAdsPanel = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    ads_type_id: Joi.number().integer().required(),
    ads_spot_id: Joi.number().integer().required(),
    height: Joi.number().required(),
    width: Joi.number().required(),
    expire_date: Joi.date().format('YYYY-MM-DD').required(),
    image: Joi.string().required(),
  }),
};

const deleteAdsPanel = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const getAdsPanelByWard = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  getAdsPanel,
  createAdsPanel,
  updateAdsPanel,
  deleteAdsPanel,
  getAdsPanelByWard,
};
