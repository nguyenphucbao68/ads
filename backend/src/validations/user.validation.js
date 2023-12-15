const Joi = require('joi');

const create = {
  create: Joi.object().keys({
    role: Joi.number().required(),
    name: Joi.string().required(),
    dob: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    expire_date: Joi.date().required(),
  }),
};

const getById = {
  params: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
};

const update = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    profilepictureurl: Joi.string().required(),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
};
module.exports = {
  create,
  getById,
  update,
  deleteUser,
};
