const catchAsync = require('../utils/catchAsync');
const { officerService } = require('../services');

const getAdsLicenses = catchAsync(async (req, res)=>{
    const adsLicenseData = await officerService.getAdsLicenses(4);
    // if (!adsLicenseData) {
    //     throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy giấy phép quảng cáo nào');
    //   }
    res.send(adsLicenseData);
});
const postAdsLicense = catchAsync(async (req, res)=>{
    const response = await officerService.postAdsLicense(req.body);
    res.send(response);
});
const deleteAdsLicense = catchAsync(async (req, res)=>{
    const response = await officerService.deleteAdsLicense(4, req.params.id);
    res.send(response);
});

module.exports = {
    getAdsLicenses,
    postAdsLicense,
    deleteAdsLicense,
};