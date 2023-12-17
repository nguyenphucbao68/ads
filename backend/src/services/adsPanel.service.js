const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// get all adsPanels
const getAdsPanels = async (params) => {
  const adsPanels = await prisma.ads_panel.findMany({
    where: {
      ...params,
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
  return adsPanel;
};

// create a new adsPanel
const createAdsPanel = async (adsPanelBody) => {
  const adsPanel = await prisma.ads_panel.create({
    data: adsPanelBody,
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

module.exports = {
  getAdsPanels,
  getAdsPanelById,
  createAdsPanel,
  updateAdsPanel,
  deleteAdsPanel,
};
