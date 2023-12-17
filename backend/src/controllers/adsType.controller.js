const catchAsync = require('../utils/catchAsync');
const { adsTypeService } = require('../services');

const getAll = catchAsync(async (req, res) => {
  const data = await adsTypeService.getAll();
  res.send(data);
});

const getById = catchAsync(async (req, res) => {
  const data = await adsTypeService.getById(req.params.id);
  res.status(201).send(data);
});

const create = catchAsync(async (req, res) => {
  const data = await adsTypeService.create(req.body);
  res.status(201).send(data);
});

const update = catchAsync(async (req, res) => {
  const data = await adsTypeService.update(req.params.id, req.body);
  res.send(data);
});

const deleteAdsType = catchAsync(async (req, res) => {
  await adsTypeService.deleteAdsType(req.params.id);
  res.status(204).send();
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteAdsType,
};
