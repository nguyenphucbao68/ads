const Joi = require('joi');

const getWard = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const createWard = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    district_id: Joi.number().required(),
  }),
};

const updateWard = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    district_id: Joi.number().required(),
  }),
};

const deleteWard = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

module.exports = {
  getWard,
  createWard,
  updateWard,
  deleteWard,
};
