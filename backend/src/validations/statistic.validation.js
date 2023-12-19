const Joi = require('joi');

const getReportsStatistics = {
  query: Joi.object().keys({
    type: Joi.string().valid('district', 'ward'),
    district_id: Joi.number().integer(),
    ward_id: Joi.number().integer(),
  }),
};

module.exports = {
  getReportsStatistics,
};
