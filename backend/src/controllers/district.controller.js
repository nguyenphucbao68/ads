const catchAsync = require('../utils/catchAsync');
const { districtService } = require('../services');

const getDistricts = catchAsync(async (req, res) => {
  const districts = await districtService.getDistricts();
  res.send(districts);
});

const getDistrict = catchAsync(async (req, res) => {
  const district = await districtService.getDistrictById(req.params.id);
  res.send(district);
});

const createDistrict = catchAsync(async (req, res) => {
  const district = await districtService.createDistrict(req.body);
  res.status(201).send(district);
});

const updateDistrict = catchAsync(async (req, res) => {
  const district = await districtService.updateDistrict(req.params.id, req.body);
  res.send(district);
});

const deleteDistrict = catchAsync(async (req, res) => {
  const district = await districtService.deleteDistrict(req.params.id);
  res.send(district);
});
const getWards = catchAsync(async (req, res) => {
  const districtid = 1;
  const response = await districtService.getWards(districtid);

  res.send(response);
});

module.exports = {
  getDistricts,
  getDistrict,
  createDistrict,
  updateDistrict,
  deleteDistrict,
  getWards,
};
