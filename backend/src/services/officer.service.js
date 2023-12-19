const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const prisma = new PrismaClient();

const getAdsLicenses = async (user_id, role) => {
  if(role !== 'ward' && role !== 'district')
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Không có quyền truy cập')
  const data = await prisma.ads_license.findMany({
    where: { user_id, is_deleted: false },
    select:{
        "id": true,
        "ads_panel_id": true,
        "content": true,
        "user_id": true,
        "start_date": true,
        "expire_date": true,
        "status": true
    }
  });

  return data;
};
const postAdsLicense = async (body) => {
  const data = await prisma.ads_license.create({ data: body });
  delete data.is_deleted;

  return data;
};
const deleteAdsLicense = async (userid, licenseId) => {
  const data = await prisma.ads_license.findUnique({ where: { id: licenseId } });
  if(!data){
    throw new ApiError(httpStatus.NOT_FOUND, 'GIấy phép không tồn tại');
  }
  if (data.status !== 1) {
    throw new ApiError(httpStatus.CONFLICT, 'GIấy phép đã được sở vhtt xử lý, không thể xóa');
  }
  if (data.user_id !== userid) {
    throw new ApiError(httpStatus.FORBIDDEN, 'GIấy không phải của bạn, bạn không thể xóa');
  }
  (async () => {
    await prisma.ads_license.update({
      where: { id: licenseId },
      data: { is_deleted: true },
    });
  })();
  return { msg: 'Xóa giấy phép thành công!' };
};

module.exports = {
  getAdsLicenses,
  postAdsLicense,
  deleteAdsLicense,
};
