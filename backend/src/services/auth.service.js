const nodemailer = require('nodemailer');
const httpStatus = require('http-status');
const moment = require('moment');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');

const { tokenTypes } = require('../config/tokens');
const SMTPTransport = require('nodemailer/lib/smtp-transport');
const myOAuth2Client = require('../utils/email');

const prisma = new PrismaClient();

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (user) user.password = user.password.toString();
  // if (!user || !(await user.isPasswordMatch(password))) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  // }
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    // const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    // const user = await userService.getUserById(refreshTokenDoc.user);
    // if (!user) {
    //   throw new Error();
    // }
    // await refreshTokenDoc.remove();
    // return tokenService.generateAuthTokens(user);
    const user = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    return await tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (userId, currentPassword, newPassword, rePassword) => {
  try {
    if (newPassword !== rePassword) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Password is not matched with repassword');
    }

    // check currentPassword
    const user = await userService.getById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (!(await bcrypt.compare(currentPassword, user.password.toString()))) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Current password is incorrect');
    }
    const saltRounds = 10;

    // eslint-disable-next-line no-param-reassign
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);
    const password = Buffer.from(passwordHash);
    await userService.update(userId, {
      password,
    });
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password reset failed');
  }
  return true;
};

const resetPasswordByEmail = async (email, newPassword, rePassword) => {
  try {
    if (newPassword !== rePassword) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Password is not matched with repassword');
    }

    // check currentPassword
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const saltRounds = 10;

    // eslint-disable-next-line no-param-reassign
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);
    const password = Buffer.from(passwordHash);
    await userService.update(user.id, {
      password,
    });
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password reset failed');
  }
  return true;
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (email, otp) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (user.otp !== otp) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'OTP is incorrect');
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        otp: null,
        expire_date: null,
      },
    });
    return true;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};
const sendEmail = async (email, otp) => {
  try {
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = myAccessTokenObject.token;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.ADMIN_EMAIL_ADDRESS,
        clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
        clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken,
      },
    });
    const content = `Please enter this code ${otp}`;
    const mailOptions = {
      from: 'Web-HCMUS <group9notification@gmail.com>',
      to: email,
      subject: 'Verify email',
      text: content,
    };

    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    return false;
  }
  return true;
};

// send mail update report status
const sendUpdateStatusEmail = async (user, reportId, address, status) => {
  const subject = 'Cập nhật trạng thái báo cáo';
  // replace this url with the link to the email verification page of your front-end app
  const reportUrl = `http://link-to-app/report/${reportId}`;
  const text = `Chào bạn,
Báo cáo của bạn tại địa điểm ${address} ${status === 1 ? 'đang được xử lí' : 'đã được xử lí'}
Xem chi tiết báo cáo: ${reportUrl}`;

  try {
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = myAccessTokenObject.token;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.ADMIN_EMAIL_ADDRESS,
        clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
        clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken,
      },
    });
    const mailOptions = {
      from: 'Web-HCMUS <group9notification@gmail.com>',
      to: user.email,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    return false;
  }
  return true;
};

const generateOTP = async (email) => {
  // check email exist
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email not found');
  }

  //  OTP: 6 digits
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // expire in 5 minutes
  const expires = moment().add(5, 'minutes');

  // save to db
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      otp,
      expire_date: expires.toDate(),
    },
  });

  return otp;
};
module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  sendEmail,
  generateOTP,
  resetPasswordByEmail,
  sendUpdateStatusEmail,
};
