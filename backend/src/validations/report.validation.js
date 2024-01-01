const Joi = require('joi');

const getReports = {
  body: Joi.object().keys({
    wid: Joi.number(),
    did: Joi.number(),
  }),
};
const createReports = {
  body: Joi.object().keys({
    report_type_id: Joi.number().integer().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    content: Joi.string().required(),
    ads_panel_id: Joi.number().integer(),
    address: Joi.string(),
    ward_id: Joi.number().integer(),
    district_id: Joi.number().integer(),
  }).or('ads_panel_id', 'ward_id')
  .with('ward_id', ['district_id', 'address'])
  .with('district_id', ['ward_id', 'address'])
  .with('address', ['district_id', 'ward_id'])
}
module.exports = {
  getReports,
  createReports
};
