const catchAsync = require('../utils/catchAsync');
const { adsLicenseService } = require('../services');

const getAdsLicense = catchAsync(async (req, res) => {
  const bus = await adsLicenseService.getAdsLicenseById(req.params.id);

  res.send(bus);
});

const getAdsLicenses = catchAsync(async (req, res) => {
  const data = await adsLicenseService.getAdsLicenses();
  res.send(data);
});

module.exports = {
  getAdsLicense,
  getAdsLicenses,
};
