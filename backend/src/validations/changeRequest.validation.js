const Joi = require('joi');

const update = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    status: Joi.number().required(),
  }),
};

module.exports = {
  update,
};
