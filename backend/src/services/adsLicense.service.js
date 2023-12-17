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

const getAdsLicenses = async () => {
  const data = await prisma.ads_license.findMany({});

  return { data };
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

  return { data };
};

module.exports = {
  getAdsLicenseById,
  getAdsLicenses,
  updateAdsLicense,
};
