const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// get all adsPanels
const getAdsPanels = async (query) => {
  if (query.ward_id) {
    const adsPanels = await prisma.ads_panel.findMany({
      where: {
        is_deleted: false,
        ads_spot: {
          ward_id: parseInt(query.ward_id),
        },
      },
      include: {
        ads_panel_type: {
          select: {
            name: true,
          },
        },
        ads_spot: {
          include: {
            ward: true,
            district: true,
            ads_type: true,
            spot_type: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
    return adsPanels;
  } else if (query.district_id) {
    const adsPanels = await prisma.ads_panel.findMany({
      where: {
        is_deleted: false,
        ads_spot: {
          district_id: parseInt(query.district_id),
        },
      },
      include: {
        ads_panel_type: {
          select: {
            name: true,
          },
        },
        ads_spot: {
          include: {
            ward: true,
            district: true,
            ads_type: true,
            spot_type: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
    return adsPanels;
  }
  const adsPanels = await prisma.ads_panel.findMany({
    where: {
      is_deleted: false,
    },
    include: {
      ads_panel_type: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
  });
  return adsPanels;
};

// get a adsPanel by id
const getAdsPanelById = async (id) => {
  const adsPanel = await prisma.ads_panel.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  const adsSpot = await prisma.ads_spot.findUnique({
    where: {
      id: parseInt(adsPanel.ads_spot_id, 10),
    },
    include: {
      ward: {
        select: {
          id: true,
          name: true,
        },
      },
      district: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  adsPanel.address = adsSpot.address;
  adsPanel.ward = adsSpot.ward;
  adsPanel.district = adsSpot.district;
  adsPanel.longtitude = adsSpot.longtitude;
  adsPanel.latitude = adsSpot.latitude;
  return adsPanel;
};

const getAdsPanelsByAdsSpotId = async (id) => {
  const adsPanels = await prisma.ads_panel.findMany({
    where: {
      ads_spot_id: parseInt(id, 10),
    },
    include: {
      ads_panel_type: true,
      ads_spot: true,
    },
  });
  return adsPanels;
};

// create a new adsPanel
const createAdsPanel = async (body) => {
  const data = {
    ads_type_id: body.ads_type_id,
    height: body.height,
    width: body.width,
    expire_date: body.expire_date ? body.expire_date : new Date(),
    image: body.image ? body.image : '',
    ads_spot_id: body.ads_spot_id,
  };
  console.log(data);
  const adsPanel = await prisma.ads_panel.create({
    data: data,
  });

  return adsPanel;
};

// update an existing adsPanel
const updateAdsPanel = async (id, adsPanelBody) => {
  const adsPanel = await prisma.ads_panel.update({
    where: {
      id: parseInt(id, 10),
    },
    data: adsPanelBody,
  });

  return adsPanel;
};

// delete an existing adsPanel
const deleteAdsPanel = async (id) => {
  const adsPanel = await prisma.ads_panel.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      is_deleted: true,
    },
  });

  return adsPanel;
};

// Get ads panel by wards
const getAdsPanelByWard = async (wardId) => {
  return await prisma.$queryRaw`select * from ads_panel ap 
      join ads_spot as on ap.ads_spot_id = as.id
      where as.ward_id = ${wardId}`;
};

module.exports = {
  getAdsPanels,
  getAdsPanelById,
  createAdsPanel,
  updateAdsPanel,
  deleteAdsPanel,
  getAdsPanelByWard,
  getAdsPanelsByAdsSpotId,
};
