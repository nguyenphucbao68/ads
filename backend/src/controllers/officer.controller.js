const catchAsync = require('../utils/catchAsync');
const { authService } = require('../services');
const { officerService } = require('../services');

const getAdsLicenses = catchAsync(async (req, res) => {
  const adsLicenseData = await officerService.getAdsLicenses(req.user.id, req.user.role);
  // if (!adsLicenseData) {
  //     throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy giấy phép quảng cáo nào');
  //   }
  res.send(adsLicenseData);
});
const postAdsLicense = catchAsync(async (req, res) => {
  req.body.user_id = req.user.id;
  const response = await officerService.postAdsLicense(req.body);
  res.send(response);
});
const deleteAdsLicense = catchAsync(async (req, res) => {
  const response = await officerService.deleteAdsLicense(req.user.id, req.params.id);
  res.send(response);
});

const getReportsByRole = catchAsync(async (req, res) => {
  const result = await officerService.getReportsByRole(req.user.role, req.user.id);
  res.send(result);
});

const getReportById = catchAsync(async (req, res) => {
  const result = await officerService.getReportById(req.params.id);
  res.send(result);
});

const updateReportStatus = catchAsync(async (req, res) => {
  const result = await officerService.updateReportStatus(req.user.id, req.params.id, req.body);
  await authService.sendUpdateStatusEmail(
    {
      email: req.body.user.email,
    },
    req.params.id,
    req.body.content,
    req.body.status
  );

  res.send(result);
});

module.exports = {
  getAdsLicenses,
  postAdsLicense,
  deleteAdsLicense,
  getReportsByRole,
  getReportById,
  updateReportStatus,
};
