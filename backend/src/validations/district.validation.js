const Joi = require('joi');

const getDistrict = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const createDistrict = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const updateDistrict = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const deleteDistrict = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const getWards = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  })
}

module.exports = {
  getWards,
  getDistrict,
  createDistrict,
  updateDistrict,
  deleteDistrict,
};
