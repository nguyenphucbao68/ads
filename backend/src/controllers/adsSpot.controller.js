const catchAsync = require('../utils/catchAsync');
const { adsSpotService } = require('../services');

const getAdsSpots = catchAsync(async (req, res) => {
  const districts = await adsSpotService.getAdsSpots(req.body);
  res.send(districts);
});

const createAdsSpot = catchAsync(async (req, res) => {
  const district = await adsSpotService.createAdsSpot(req.body);
  res.status(201).send(district);
});

const updateAdsSpot = catchAsync(async (req, res) => {
  const district = await adsSpotService.updateAdsSpot(req.params.adsSpotId, req.body);
  res.send(district);
});

const deleteAdsSpot = catchAsync(async (req, res) => {
  await adsSpotService.deleteAdsSpot(req.params.adsSpotId);
  res.status(204).send();
});

module.exports = {
  getAdsSpots,
  createAdsSpot,
  updateAdsSpot,
  deleteAdsSpot,
};
