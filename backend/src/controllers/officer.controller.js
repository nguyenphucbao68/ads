import catchAsync from "../utils/catchAsync";
import officerService from '../services/officer.service';
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

const getAdsLicenses = catchAsync(async (req, res)=>{
    const adsLicenseData = await officerService.getAdsLicenses(req.query.limit, req.query.page);
    if (!adsLicenseData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy giấy phép quảng cáo nào');
      }
    res.send(adsLicenseData);
})
const postAdsLicense = catchAsync(async (req, res)=>{
    const response = await officerService.postAdsLicense(req.body);
    res.send(response);
})
const deleteAdsLicense = catchAsync(async (req, res)=>{
    const response = await officerService.deleteAdsLicense(req.param.id);
    if(response === "processed"){
        throw new ApiError(httpStatus.CONFLICT, "GIấy phép đã được duyệt, không thể xóa");
    }
    res.send(response);
})

export {
    getAdsLicenses,
    postAdsLicense,
    deleteAdsLicense,
}