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
        updated_at: 'desc',
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
        updated_at: 'desc',
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
      updated_at: 'desc',
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
      ads_spot_id: id,
    },
    include: {
      ads_panel_type: {
        select: {
          name: true,
          id: true,
        },
      },
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
  const { district_name, ward_name } = body;

  // Check if district and ward is exist, if not, create new
  if (district_name && ward_name) {
    const districtData = await prisma.district.findFirst({
      where: {
        name: district_name,
      },
    });

    const wardData = await prisma.ward.findFirst({
      where: {
        name: ward_name,
      },
    });

    let newDistrict = districtData;
    if (!districtData) {
      newDistrict = await prisma.district.create({
        data: {
          name: district_name,
        },
      });
    }

    if (!wardData) {
      await prisma.ward.create({
        data: {
          name: ward_name,
          district_id: newDistrict.id,
        },
      });
    }
  }

  const newWard = await prisma.ward.findFirst({
    where: {
      name: ward_name,
    },
  });

  const newDistrict = await prisma.district.findFirst({
    where: {
      name: district_name,
    },
  });

  const data = await prisma.ads_spot.create({
    data: {
      address: body.address,
      ward_id: newWard.id,
      district_id: newDistrict.id,
      spot_type_id: body.spot_type_id,
      ads_type_id: body.ads_type_id,
      image: body.image,
      is_available: body.is_available,
      max_ads_panel: body.max_ads_panel,
      latitude: body.latitude,
      longtitude: body.longtitude,
    },
  });
  return data;
};

const updateAdsSpot = async (id, body) => {
  const { district_name, ward_name } = body;

  // Check if district and ward is exist, if not, create new
  if (district_name && ward_name) {
    const districtData = await prisma.district.findFirst({
      where: {
        name: district_name,
      },
    });

    const wardData = await prisma.ward.findFirst({
      where: {
        name: ward_name,
      },
    });

    let newDistrict = districtData;
    if (!districtData) {
      newDistrict = await prisma.district.create({
        data: {
          name: district_name,
        },
      });
    }

    if (!wardData) {
      await prisma.ward.create({
        data: {
          name: ward_name,
          district_id: newDistrict.id,
        },
      });
    }
  }

  const newWard = await prisma.ward.findFirst({
    where: {
      name: ward_name,
    },
  });

  const newDistrict = await prisma.district.findFirst({
    where: {
      name: district_name,
    },
  });

  const data = await prisma.ads_spot.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      address: body.address,
      ward_id: newWard.id,
      district_id: newDistrict.id,
      spot_type_id: body.spot_type_id,
      ads_type_id: body.ads_type_id,
      image: body.image,
      latitude: body.latitude,
      longtitude: body.longtitude,
      is_available: body.is_available,
      max_ads_panel: body.max_ads_panel,
      updated_at: new Date(),
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
