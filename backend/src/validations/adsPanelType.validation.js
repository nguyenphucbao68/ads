const Joi = require('joi');

const getById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const deleteAdsPanelType = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  getById,
  create,
  update,
  deleteAdsPanelType,
};
