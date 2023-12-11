const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAdsPanels = async () => {
  const data = await prisma.ads_panel.findMany({
    where: {
      is_deleted: false,
    },
  });

  const count = await prisma.ads_panel.count();

  return { count, data };
};

const getAdsPanelById = async (id) => {
  const adsSpot = await prisma.ads_panel.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  return adsSpot;
};

const createAdsPanel = async (body) => {
  return 0;
};

const updateAdsPanel = async (id, body) => {
  return 0;
};

const deleteAdsPanel = async (id) => {
  const data = await prisma.ads_panel.update({
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
  getAdsPanels,
  getAdsPanelById,
  createAdsPanel,
  updateAdsPanel,
  deleteAdsPanel,
};
