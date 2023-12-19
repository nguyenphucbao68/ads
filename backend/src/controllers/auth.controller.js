const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
// const sendEmail = require('../utils/sendEmail');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  delete user.password;
  res.status(httpStatus.CREATED).send({ user, token: tokens.access });
});
const sendEmail = catchAsync(async (req, res) => {
  const result = await authService.sendEmail(req.body.email, req.body.otp);
  res.send({ success: result });
});

const login = catchAsync(async (req, res) => {
  const user = await authService.loginUserWithEmailAndPassword(req.body.email, req.body.password);
  const tokens = await tokenService.generateAuthTokens(user, true);
  delete user.password;

  res.send({ access: tokens.access, refreshToken: tokens.refresh, user });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const resetPassword = catchAsync(async (req, res) => {
  const result = await authService.resetPassword(
    req.user.id,
    req.body.currentPassword,
    req.body.newPassword,
    req.body.rePassword
  );
  res.send({ success: result });
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const otp = await authService.generateOTP(req.body.email);
  await authService.sendEmail(req.body.email, otp);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  const result = await authService.verifyEmail(req.body.email, req.body.otp);
  res.send({ success: result });
});

const resetPasswordByEmail = catchAsync(async (req, res) => {
  const result = await authService.resetPasswordByEmail(req.body.email, req.body.newPassword, req.body.rePassword);
  res.send({ success: result });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  resetPassword,
  sendVerificationEmail,
  resetPasswordByEmail,
  verifyEmail,
  sendEmail,
};
