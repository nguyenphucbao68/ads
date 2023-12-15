const Joi = require('joi');

const getReports = {
  body: Joi.object().keys({
    wid: Joi.number(),
    did: Joi.number(),
  }),
};

module.exports = {
  getReports,
};
