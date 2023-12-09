const catchAsync = require('../utils/catchAsync');
const { reportService } = require('../services');

const getReports = catchAsync(async (req, res) => {
  const result = await reportService.getReports(req.body.wid, req.body.did);
  res.send(result);
});

module.exports = {
  getReports,
};
