const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAdsSpots = async (query) => {
  if (query?.ward_id) {
    const data = await prisma.ads_spot.findMany({
      where: {
        is_deleted: false,
        ward_id: parseInt(query?.ward_id, 10),
      },
      include: {
        ward: true,
        district: true,
        ads_type: true,
        spot_type: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return data;
  } else if (query?.district_id) {
    const data = await prisma.ads_spot.findMany({
      where: {
        is_deleted: false,
        district_id: parseInt(query?.district_id, 10),
      },
      include: {
        ward: true,
        district: true,
        ads_type: true,
        spot_type: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return data;
  }
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
    orderBy: {
      id: 'asc',
    },
  });

  return data;
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

const getAllAdsPanelByAdsSpotId = async (id) => {
  const adsPanel = await prisma.ads_panel.findMany({
    where: {
      ads_spot_id: parseInt(id, 10),
    },
    include: {
      ads_spot: true,
      ads_type: true,
    },
  });

  return adsPanel;
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
  const data = await prisma.ads_spot.create({
    data: {
      address: body.address,
      ward_id: body.ward_id,
      district_id: body.district_id,
      spot_type_id: body.spot_type_id,
      ads_type_id: body.ads_type_id,
      image: body.image,
      is_available: body.is_available,
      max_ads_panels: body.max_ads_panels,
      latitude: body.latitude,
      longtitude: body.longtitude,
    },
  });
  return data;
};

const updateAdsSpot = async (id, body) => {
  const data = await prisma.ads_spot.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      address: body.address,
      ward_id: body.ward_id,
      district_id: body.district_id,
      spot_type_id: body.spot_type_id,
      ads_type_id: body.ads_type_id,
      image: body.image,
      is_available: body.is_available,
      max_ads_panels: body.max_ads_panels,
      latitude: body.latitude,
      longtitude: body.longtitude,
    },
    include: {
      ward: true,
      district: true,
      ads_type: true,
      spot_type: true,
    },
  });
  return data;
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
  getAllAdsPanelByAdsSpotId,
  createAdsSpot,
  updateAdsSpot,
  deleteAdsSpot,
};
