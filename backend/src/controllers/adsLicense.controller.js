const catchAsync = require('../utils/catchAsync');
const { adsLicenseService } = require('../services');

const getAdsLicense = catchAsync(async (req, res) => {
  const data = await adsLicenseService.getAdsLicenseById(req.params.id);
  res.send(data);
});

const getAdsLicenses = catchAsync(async (req, res) => {
  const data = await adsLicenseService.getAdsLicenses(
    req.query.user_id,
    req.query.type,
    req.query.ward_id,
    req.query.district_id
  );
  res.send(data);
});

const updateAdsLicense = catchAsync(async (req, res) => {
  const data = await adsLicenseService.updateAdsLicense(req.params.id, req.body);
  res.send(data);
});

const deleteAdsLicense = catchAsync(async (req, res) => {
  const data = await adsLicenseService.deleteAdsLicense(req.params.id);
  res.send(data);
});

const createAdsLicense = catchAsync(async (req, res) => {
  const data = await adsLicenseService.createAdsLicense(req.body);
  res.send(data);
});

module.exports = {
  getAdsLicense,
  getAdsLicenses,
  updateAdsLicense,
  deleteAdsLicense,
  createAdsLicense,
};
