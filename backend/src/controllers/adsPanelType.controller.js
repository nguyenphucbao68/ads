const catchAsync = require('../utils/catchAsync');
const { adsPanelTypeService } = require('../services');

const getAll = catchAsync(async (req, res) => {
  const data = await adsPanelTypeService.getAll();
  res.send(data);
});

const getById = catchAsync(async (req, res) => {
  const data = await adsPanelTypeService.getById(req.params.id);
  res.status(201).send(data);
});

const create = catchAsync(async (req, res) => {
  const data = await adsPanelTypeService.create(req.body);
  res.status(201).send(data);
});

const update = catchAsync(async (req, res) => {
  const data = await adsPanelTypeService.update(req.params.id, req.body);
  res.send(data);
});

const deleteAdsPanelType = catchAsync(async (req, res) => {
  await adsPanelTypeService.deleteAdsPanelType(req.params.id);
  res.status(204).send();
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteAdsPanelType,
};
