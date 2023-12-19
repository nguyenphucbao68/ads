const Joi = require('joi');

const getReports = {
  params: Joi.object().key({
    id: Joi.number.required(),
  }),
};

module.exports = {
  getReports,
};
