import Joi from 'joi';

const getWards = {
    query: Joi.object.key({
        limit: Joi.number().integer().required(),
        page: Joi.number().integer().required(),
    }),
}
export {
    getWards,
}