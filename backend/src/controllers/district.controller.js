import catchAsync from "../utils/catchAsync";
import districtService from '../services/district.service';
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

const getWards = catchAsync(async (req, res)=>{
    const response = await districtService.getWards(req.query.limit, req.query.page);
    if (!response) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy phường nào');
      }
    res.send(adsLicenseData);
})


export {
    getWards,
}