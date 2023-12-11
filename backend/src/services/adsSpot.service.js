const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAdsSpots = async () => {
  const data = await prisma.ads_spot.findMany({
    where: {
      is_deleted: false,
    },
    include: {
      ward: true,
      district: true,
      ads_type: true,
      spot_type: true,
    },
  });

  const count = await prisma.ads_spot.count();

  return { count, data };
};

const getAdsSpotById = async (id) => {
  const adsSpot = await prisma.ads_spot.findUnique({
    where: {
      id: parseInt(id, 10),
    },
    include: {
      ward: true,
      district: true,
      ads_type: true,
      spot_type: true,
    },
  });

  return adsSpot;
};

const getAllAdsSpotByAdsPanelId = async (id) => {
  const adsSpot = await prisma.ads_spot.findMany({
    where: {
      ads_panel_id: parseInt(id, 10),
    },
    include: {
      ward: true,
      district: true,
      ads_type: true,
      spot_type: true,
    },
  });

  return adsSpot;
};

module.exports = {
  getAdsSpots,
  getAdsSpotById,
  getAllAdsSpotByAdsPanelId,
};
