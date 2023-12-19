const Joi = require('joi');

const updateReportStatus = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    status: Joi.number().required(),
  }),
};

module.exports = {
  updateReportStatus,
};