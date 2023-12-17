const catchAsync = require('../utils/catchAsync');
const { spotTypeService } = require('../services');

const getAll = catchAsync(async (req, res) => {
  const data = await spotTypeService.getAll();
  res.send(data);
});

const getById = catchAsync(async (req, res) => {
  const data = await spotTypeService.getById(req.params.id);
  res.status(201).send(data);
});

const create = catchAsync(async (req, res) => {
  const data = await spotTypeService.create(req.body);
  res.status(201).send(data);
});

const update = catchAsync(async (req, res) => {
  const data = await spotTypeService.update(req.params.id, req.body);
  res.send(data);
});

const deleteSpotType = catchAsync(async (req, res) => {
  await spotTypeService.deleteSpotType(req.params.id);
  res.status(204).send();
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteSpotType,
};
