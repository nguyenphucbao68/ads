const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    role: Joi.number().integer().required(),
    name: Joi.string().required(),
    dob: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    ward_id: Joi.number().integer(),
    district_id: Joi.number().integer(),
  }),
};

const getById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const update = {
  body: Joi.object().keys({
    name: Joi.string(),
    dob: Joi.date(),
    email: Joi.string().email(),
    phone: Joi.string(),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};
module.exports = {
  create,
  getById,
  update,
  deleteUser,
};
