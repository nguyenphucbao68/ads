const catchAsync = require('../utils/catchAsync');
const { districtService } = require('../services');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');


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
  const district = await districtService.updateDistrict(req.params.districtId, req.body);
  res.send(district);
});

const deleteDistrict = catchAsync(async (req, res) => {
  await districtService.deleteDistrict(req.params.districtId);
  res.status(204).send();
});
const getWards = catchAsync(async (req, res)=>{
  const response = await districtService.getWards(req.query.limit, req.query.page);
  if (!response) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy phường nào');
    }
  res.send(adsLicenseData);
})

module.exports = {
  getDistricts,
  getDistrict,
  createDistrict,
  updateDistrict,
  deleteDistrict,
  getWards
};
