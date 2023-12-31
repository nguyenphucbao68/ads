const Joi = require('joi');

const update = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    status: Joi.number().required(),
  }),
};

const create = {
  body: Joi.object().keys({
    type: Joi.number().required(),
    old_information: Joi.string().required(),
    new_information: Joi.string().required(),
    status: Joi.number().required()
  }),
};

module.exports = {
  update,
  create,
};
