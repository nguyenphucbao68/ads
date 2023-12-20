const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAdsLicenseById = async (id) => {
  const data = await prisma.ads_license.findUnique({
    where: {
      id,
    },
    include: {
      ads_panel: {
        select: {
          image: true,
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

const getAdsLicenses = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId, 10),
    },
  });
  var option = {};
  const role = user.role;
  if (role != 0)
    option = {
      where: {
        user_id: userId,
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
          ads_spot: true,
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
      id,
    },
    data: {
      status: body.status,
    },
  });

  return data;
};

module.exports = {
  getAdsLicenseById,
  getAdsLicenses,
  updateAdsLicense,
};
