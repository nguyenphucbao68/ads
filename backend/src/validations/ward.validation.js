const Joi = require('joi');

const getWard = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const createWard = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    district_id: Joi.number().integer().required(),
  }),
};

const updateWard = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    district_id: Joi.number().integer().required(),
  }),
};

const deleteWard = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  getWard,
  createWard,
  updateWard,
  deleteWard,
};
