const catchAsync = require('../utils/catchAsync');
const { adsPanelService } = require('../services');

const getAdsPanels = catchAsync(async (req, res) => {
  const adsPanels = await adsPanelService.getAdsPanels(req.query);
  res.send(adsPanels);
});

const getAdsPanel = catchAsync(async (req, res) => {
  const adsPanel = await adsPanelService.getAdsPanelById(req.params.id);
  res.send(adsPanel);
});

const getAdsPanelsByAdsSpotId = catchAsync(async (req, res) => {
  console.log({ params: req.params.id });
  const adsPanels = await adsPanelService.getAdsPanelsByAdsSpotId(req.params.id);
  res.send(adsPanels);
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
  await adsPanelService.deleteAdsPanel(req.params.id);
  res.status(204).send();
});

const getAdsPanelByWard = catchAsync(async (req, res) => {
  await adsPanelService.getAdsPanelByWard(req.params.wardId);
  res.send(getAdsPanelByWard);
});

module.exports = {
  getAdsPanels,
  getAdsPanel,
  createAdsPanel,
  updateAdsPanel,
  deleteAdsPanel,
  getAdsPanelByWard,
  getAdsPanelsByAdsSpotId,
};
