const catchAsync = require('../utils/catchAsync');
const { wardService } = require('../services');

const getWards = catchAsync(async (req, res) => {
  const districts = await wardService.getWards(req.body);
  res.send(districts);
});

const createWard = catchAsync(async (req, res) => {
  const district = await wardService.createWard(req.body);
  res.status(201).send(district);
});

const updateWard = catchAsync(async (req, res) => {
  const district = await wardService.updateWard(req.params.wardId, req.body);
  res.send(district);
});

const deleteWard = catchAsync(async (req, res) => {
  await wardService.deleteWard(req.params.wardId);
  res.status(204).send();
});

module.exports = {
  getWards,
  createWard,
  updateWard,
  deleteWard,
};
