const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../models');

const prisma = new PrismaClient();

const ApiError = require('../utils/ApiError');
// const { transformDocument } = require('@prisma/client/runtime');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const create = async (userBody) => {
  const saltRounds = 10;

  // eslint-disable-next-line no-param-reassign
  userBody.password = await bcrypt.hash(userBody.password, saltRounds);
  // eslint-disable-next-line no-param-reassign
  userBody.password = Buffer.from(userBody.password);

  // eslint-disable-next-line no-param-reassign
  delete userBody.repassword;
  const user = prisma.user.create({
    data: {
      role: userBody.role,
      dob: userBody.dob,
      email: userBody.email,
      phone: userBody.phone,
      username: userBody.username,
      password: userBody.password,
      otp: uuidv4(),
      expire_date: userBody.expire_date,
    },
  });

  return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const getById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const update = async (userId, newPassword) => {
  const saltRounds = 10;
  // eslint-disable-next-line no-param-reassign
  newPassword = await bcrypt.hash(newPassword, saltRounds);
  // eslint-disable-next-line no-param-reassign
  newPassword = Buffer.from(newPassword);

  const checkUserExists = await getById(userId);
  if (!checkUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: newPassword,
    },
  });

  return user;
};

const getAll = async () => {
  const data = await prisma.user.findMany({});
  return data;
};

const deleteUser = async (id) => {
  const data = await prisma.user.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
    },
  });
  return data;
};

module.exports = {
  getAll,
  create,
  queryUsers,
  getById,
  getUserByEmail,
  update,
  deleteUser,
};
