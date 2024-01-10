const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAdsLicenseById = async (id) => {
  const data = await prisma.ads_license.findUnique({
    where: {
      id: parseInt(id, 10),
    },
    include: {
      ads_panel: {
        select: {
          id: true,
          ads_panel_type: true,
          height: true,
          width: true,
          ads_spot: {
            select: {
              id: true,
              address: true,
              spot_type: true,
              ads_type: true,
              max_ads_panel: true,
              is_available: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return data;
};

const getAdsLicenses = async (userId, type, wardId, districtId) => {
  let option = {};
  const id = parseInt(userId);

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  const role = user.role;
  if (role != 0) {
    option = {
      where: {
        user_id: id,
        is_deleted: false,
      },
    };
  } else {
    if (type === 'ward') {
      const getAllUsersByWardId = await prisma.user_ward.findMany({
        where: {
          ward_id: parseInt(wardId, 10),
        },
        select: {
          user_id: true,
        },
      });

      option = {
        where: {
          user_id: {
            in: getAllUsersByWardId.map((user) => parseInt(user.user_id, 10)),
          },
        },
      };
    } else if (type === 'district') {
      const getAllUsersByDistrictId = await prisma.user_district.findMany({
        where: {
          district_id: parseInt(districtId, 10),
        },
        select: {
          user_id: true,
        },
      });

      const getAllWardsBelongToDistrict = await prisma.ward.findMany({
        where: {
          district_id: parseInt(districtId, 10),
        },
        select: {
          id: true,
        },
      });

      const getAllUsersFromWardBelongToDistrict = await prisma.user_ward.findMany({
        where: {
          ward_id: {
            in: getAllWardsBelongToDistrict.map((ward) => parseInt(ward.id, 10)),
          },
        },
        select: {
          user_id: true,
        },
      });

      option = {
        where: {
          user_id: {
            in: [
              ...getAllUsersByDistrictId.map((user) => parseInt(user.user_id, 10)),
              ...getAllUsersFromWardBelongToDistrict.map((user) => parseInt(user.user_id, 10)),
            ],
          },
        },
      };
    }
  }

  option = {
    ...option,
    where: {
      ...option.where,
      is_deleted: false,
    },
  };

  const data = await prisma.ads_license.findMany({
    ...option,
    select: {
      id: true,
      ads_panel_id: true,
      ads_panel: {
        select: {
          ads_panel_type: true,
          ads_spot: {
            select: {
              address: true,
              spot_type: true,
              ads_type: true,
              max_ads_panel: true,
              is_available: true,
              ward: true,
              district: true,
            },
          },
        },
      },
      content: true,
      user_id: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      start_date: true,
      expire_date: true,
      status: true,
      name: true,
      email: true,
      address: true,
      phone: true,
    },
    orderBy: {
      updated_at: 'desc',
    },
  });

  return data;
};

const updateAdsLicense = async (id, body) => {
  const data = await prisma.ads_license.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      status: parseInt(body.status, 10),
      updated_at: new Date(),
    },
  });

  // update ads_panel
  let result = {};
  if (parseInt(body.status, 10) == 1) {
    result = await prisma.ads_panel.update({
      where: {
        id: parseInt(data.ads_panel_id, 10),
      },
      data: {
        image: body.image,
        expire_date: new Date(body.expire_date),
        updated_at: new Date(),
      },
    });
  }

  return result;
};

const deleteAdsLicense = async (id) => {
  const data = await prisma.ads_license.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      is_deleted: true,
    },
  });

  return data;
};

const createAdsLicense = async (body) => {
  const data = await prisma.ads_license.create({
    data: {
      ads_panel_id: parseInt(body.ads_panel_id, 10),
      content: body.content,
      user_id: parseInt(body.user_id, 10),
      start_date: new Date(body.start_date),
      expire_date: new Date(body.expire_date),
      status: 0,
      name: body.name,
      email: body.email,
      address: body.address,
      phone: body.phone,
      image: body.image,
    },
  });

  return data;
};

module.exports = {
  getAdsLicenseById,
  getAdsLicenses,
  updateAdsLicense,
  deleteAdsLicense,
  createAdsLicense,
};
