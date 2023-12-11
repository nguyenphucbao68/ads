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

const createAdsSpot = async (body) => {
  return 0;
};

const updateAdsSpot = async (id, body) => {
  return 0;
};

const deleteAdsSpot = async (id) => {
  const data = await prisma.ads_spot.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      is_deleted: true,
    },
  });
  return data;
};

module.exports = {
  getAdsSpots,
  getAdsSpotById,
  getAllAdsSpotByAdsPanelId,
  createAdsSpot,
  updateAdsSpot,
  deleteAdsSpot,
};
