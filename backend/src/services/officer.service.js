const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const prisma = new PrismaClient();

const getAdsLicenses = async (user_id, role) => {
  if (role !== 'ward' && role !== 'district') throw new ApiError(httpStatus.UNAUTHORIZED, 'Không có quyền truy cập');
  const data = await prisma.ads_license.findMany({
    where: { user_id, is_deleted: false },
    select: {
      id: true,
      ads_panel_id: true,
      content: true,
      user_id: true,
      start_date: true,
      expire_date: true,
      status: true,
    },
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
  if (!data) {
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

const getReportsByRole = async (role, userId) => {
  if (role !== 'ward' && role !== 'district') {
    if (role == 'vhtt') return [];
    else throw new ApiError(httpStatus.UNAUTHORIZED, 'Không có quyền truy cập');
  }

  let data = [];
  if (role === 'ward') {
    let userWard = await prisma.user_ward.findFirst({
      where: {
        user_id: parseInt(userId, 10),
      },
    });

    data =
      await prisma.$queryRaw`select r.*, rt.name as report_type_name, w.name as ward_name, d.name as district_name, adp.ads_spot_id as ads_spot_id
      from report r 
      join report_type rt on rt.id = r.report_type_id  
      join ads_panel adp on r.ads_panel_id = adp.id
      join ward w on w.id = r.ward_id
      join district d on d.id = r.district_id    
      where r.ward_id = ${userWard.ward_id}
      order by r.created_at desc`;

    let data_2 = await prisma.$queryRaw`select r.*, rt.name as report_type_name, w.name as ward_name, d.name as district_name
      from report r 
      join report_type rt on rt.id = r.report_type_id  
      join ward w on w.id = r.ward_id
      join district d on d.id = r.district_id    
      where r.ward_id = ${userWard.ward_id} and r.ads_panel_id is null
      order by r.created_at desc`;

    data = [...data, data_2];
  } else {
    const userDistrict = await prisma.user_district.findFirst({
      where: {
        user_id: parseInt(userId, 10),
      },
    });

    data =
      await prisma.$queryRaw`select r.*, rt.name as report_type_name, w.name as ward_name, d.name as district_name, adp.ads_spot_id as ads_spot_id
      from report r 
      join report_type rt on rt.id = r.report_type_id
      join ads_panel adp on r.ads_panel_id = adp.id
      join ward w on w.id = r.ward_id
      join district d on d.id = r.district_id
      where r.district_id = ${userDistrict.district_id}
      order by r.created_at desc`;

    data_2 = await prisma.$queryRaw`select r.*, rt.name as report_type_name, w.name as ward_name, d.name as district_name
      from report r 
      join report_type rt on rt.id = r.report_type_id
      join ward w on w.id = r.ward_id
      join district d on d.id = r.district_id
      where r.district_id = ${userDistrict.district_id} and r.ads_panel_id is null
      order by r.created_at desc`;

    data = [...data, ...data_2];
  }

  return data;
};

const getReportById = async (id) => {
  return await prisma.report.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
};

const updateReportStatus = async (userId, reportId, body) => {
  return await prisma.report.update({
    where: {
      id: reportId,
    },
    data: {
      status: body.status,
      handled_user_id: userId,
    },
  });
};

module.exports = {
  getAdsLicenses,
  postAdsLicense,
  deleteAdsLicense,
  getReportsByRole,
  getReportById,
  updateReportStatus,
};
