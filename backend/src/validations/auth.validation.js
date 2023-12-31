const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
    repassword: Joi.string().required().custom(password),
  }),
};

const sendEmail = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    otp: Joi.string().required(), // User enter otp
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    currentPassword: Joi.string().required().custom(password),
    newPassword: Joi.string().required().custom(password),
    rePassword: Joi.string().required().custom(password),
  }),
};

const sendVerificationEmail = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const verifyEmail = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    otp: Joi.string().required(), // User enter otp
  }),
};

const resetPasswordByEmail = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    newPassword: Joi.string().required().custom(password),
    rePassword: Joi.string().required().custom(password),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendEmail,
  sendVerificationEmail,
  resetPasswordByEmail,
};
