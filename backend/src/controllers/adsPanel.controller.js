const catchAsync = require('../utils/catchAsync');
const { adsPanelService } = require('../services');

const getAdsPanels = catchAsync(async (req, res) => {
  const adsPanels = await adsPanelService.getAdsPanels(req.body);
  res.send(adsPanels);
});

const getAdsPanel = catchAsync(async (req, res) => {
  const adsPanel = await adsPanelService.getAdsPanel(req.params.id);
  res.send(adsPanel);
});

const createAdsPanel = catchAsync(async (req, res) => {
  const adsPanel = await adsPanelService.createAdsPanel(req.body);
  res.status(201).send(adsPanel);
});

const updateAdsPanel = catchAsync(async (req, res) => {
  const adsPanel = await adsPanelService.updateAdsPanel(req.params.id, req.body);
  res.send(adsPanel);
});

const deleteAdsPanel = catchAsync(async (req, res) => {
  await adsPanelService.deleteAdsPanel(req.params.adsPanelId);
  res.status(204).send();
});

module.exports = {
  getAdsPanels,
  getAdsPanel,
  createAdsPanel,
  updateAdsPanel,
  deleteAdsPanel,
};
