const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const getAll = catchAsync(async (req, res) => {
  const data = await userService.getAll();
  res.send(data);
});

const getById = catchAsync(async (req, res) => {
  const user = await userService.getById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  delete user.password;
  res.send(user);
});

const getProfile = catchAsync(async (req, res) => {
  const user = await userService.getById(req.user.id);
  delete user.password;
  res.send(user);
});

const create = catchAsync(async (req, res) => {
  const user = await userService.create(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const update = catchAsync(async (req, res) => {
  const user = await userService.update(req.user.id, req.body);
  delete user.password;
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  const data = await userService.deleteUser(req.user.id);
  res.send(data);
});

module.exports = {
  getAll,
  create,
  getById,
  update,
  deleteUser,
  getProfile,
};
