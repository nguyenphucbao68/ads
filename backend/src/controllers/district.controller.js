const catchAsync = require('../utils/catchAsync');
const { districtService } = require('../services');

const getDistricts = catchAsync(async (req, res) => {
  const districts = await districtService.getDistricts(req.body);
  res.send(districts);
});

const createDistrict = catchAsync(async (req, res) => {
  const district = await districtService.createDistrict(req.body);
  res.status(201).send(district);
});
const updateDistrict = catchAsync(async (req, res) => {
  const district = await districtService.updateDistrict(req.params.districtId, req.body);
  res.send(district);
});

const deleteDistrict = catchAsync(async (req, res) => {
  await districtService.deleteDistrict(req.params.districtId);
  res.status(204).send();
});

module.exports = {
  getDistricts,
  createDistrict,
  updateDistrict,
  deleteDistrict,
};