const catchAsync = require('../utils/catchAsync');
const { statisticService } = require('../services');

const getReportsStatistics = catchAsync(async (req, res) => {
  const data = await statisticService.getReportsStatistics(req.query);
  res.send(data);
});

module.exports = {
  getReportsStatistics,
};
