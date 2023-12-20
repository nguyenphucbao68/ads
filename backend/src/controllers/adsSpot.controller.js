const catchAsync = require('../utils/catchAsync');
const { adsSpotService } = require('../services');

const getAdsSpots = catchAsync(async (req, res) => {
  const adsSpots = await adsSpotService.getAdsSpots();
  res.send(adsSpots);
});

const getAdsSpot = catchAsync(async (req, res) => {
  const adsSpot = await adsSpotService.getAdsSpotById(req.params.id);
  res.send(adsSpot);
});

const createAdsSpot = catchAsync(async (req, res) => {
  const adsSpot = await adsSpotService.createAdsSpot(req.body);
  res.status(201).send(adsSpot);
});

const updateAdsSpot = catchAsync(async (req, res) => {
  const adsSpot = await adsSpotService.updateAdsSpot(req.params.id, req.body);
  res.send(adsSpot);
});

const deleteAdsSpot = catchAsync(async (req, res) => {
  const adsSpot = await adsSpotService.deleteAdsSpot(req.params.id);
  res.send(adsSpot);
});

const getAllAdsSpotByAdsPanelId = catchAsync(async (req, res) => {
  const adsSpot = await adsSpotService.getAllAdsSpotByAdsPanelId(req.params.adsPanelId);
  res.send(adsSpot);
});

const getAllAdsPanelByAdsSpotId = catchAsync(async (req, res) => {
  const adsPanel = await adsSpotService.getAllAdsPanelByAdsSpotId(req.params.adsSpotId);
  res.send(adsPanel);
});

module.exports = {
  getAdsSpots,
  getAdsSpot,
  createAdsSpot,
  updateAdsSpot,
  deleteAdsSpot,
  getAllAdsSpotByAdsPanelId,
  getAllAdsPanelByAdsSpotId,
};
