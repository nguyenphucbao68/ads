const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAdsPanelById = async (id) => {
  const adsPanel = await prisma.adsPanel.findUnique({
    where: {
      id,
    },
  });
  return adsPanel;
};

// get all adsPanels
const getAdsPanels = async (params) => {
  const adsPanels = await prisma.adsPanel.findMany({
    where: {
      ...params,
    },
  });
  return adsPanels;
};

// create a new adsPanel
const createAdsPanel = async (adsPanelBody) => {
  const adsPanel = await prisma.adsPanel.create({
    data: adsPanelBody,
  });

  return adsPanel;
};

// update an existing adsPanel
const updateAdsPanel = async (id, adsPanelBody) => {
  const adsPanel = await prisma.adsPanel.update({
    where: {
      id,
    },
    data: adsPanelBody,
  });

  return adsPanel;
};

// delete an existing adsPanel
const deleteAdsPanel = async (id) => {
  const adsPanel = await prisma.adsPanel.delete({
    where: {
      id,
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
