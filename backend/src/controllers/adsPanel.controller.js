const catchAsync = require('../utils/catchAsync');
const { adsPanelService } = require('../services');

const getAdsPanels = catchAsync(async (req, res) => {
  const districts = await adsPanelService.getAdsPanels(req.body);
  res.send(districts);
});

const createAdsPanel = catchAsync(async (req, res) => {
  const district = await adsPanelService.createAdsPanel(req.body);
  res.status(201).send(district);
});

const updateAdsPanel = catchAsync(async (req, res) => {
  const district = await adsPanelService.updateAdsPanel(req.params.adsPanelId, req.body);
  res.send(district);
});

const deleteAdsPanel = catchAsync(async (req, res) => {
  await adsPanelService.deleteAdsPanel(req.params.adsPanelId);
  res.status(204).send();
});

const getAdsPanelById = catchAsync(async (req, res) => {
  const adsPanel = await adsPanelService.getAdsPanelById(req.params.adsPanelId);
  res.send(adsPanel);
});

module.exports = {
  getAdsPanels,
  createAdsPanel,
  updateAdsPanel,
  deleteAdsPanel,
  getAdsPanelById,
};
