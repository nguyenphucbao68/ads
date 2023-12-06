import Joi from 'joi';

const getAdsLicenses = {
  query: Joi.object.key({
    limit: Joi.number().integer().required(),
    page: Joi.number().integer().required(),
  }),
};
const postAdsLicense = {
  body: Joi.object.key({
    ads_panel_id: Joi.number().integer().required(),
    content: Joi.string().required(),
    user_id: Joi.number().integer().required(),
    // start_date: Joi.string().da
  })
}
const deleteAdsLicense = {
  param: Joi.object.key({
    id: Joi.number().required()
  })
}
export {
    getAdsLicenses,
    postAdsLicense,
    deleteAdsLicense,
}