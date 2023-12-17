const catchAsync = require('../utils/catchAsync');
const { wardService } = require('../services');

const getWards = catchAsync(async (req, res) => {
  const wards = await wardService.getWards();
  res.send(wards);
});

const getWard = catchAsync(async (req, res) => {
  const ward = await wardService.getWardById(req.params.id);
  res.send(ward);
});

const createWard = catchAsync(async (req, res) => {
  const ward = await wardService.createWard(req.body);
  res.status(201).send(ward);
});

const updateWard = catchAsync(async (req, res) => {
  const ward = await wardService.updateWard(req.params.id, req.body);
  res.send(ward);
});

const deleteWard = catchAsync(async (req, res) => {
  await wardService.deleteWard(req.params.id);
  res.status(204).send();
});

module.exports = {
  getWards,
  getWard,
  createWard,
  updateWard,
  deleteWard,
};
