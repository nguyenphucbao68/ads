const Joi = require('joi');

const getDistrict = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const createDistrict = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const updateDistrict = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const deleteDistrict = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  getDistrict,
  createDistrict,
  updateDistrict,
  deleteDistrict,
};
