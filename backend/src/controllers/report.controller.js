const catchAsync = require('../utils/catchAsync');
const { reportService } = require('../services');

const getReports = catchAsync(async (req, res) => {
  const result = await reportService.getReports(req.body.wid, req.body.did);
  res.send(result);
});

const createReport = catchAsync(async (req, res) => {
  const result = await reportService.createReport(req.body);
  // req.io.to(`district-${result.district_id}`).to(`ward-${result.ward_id}`).emit('newReport', 'new report');
  res.send(result);
});

const getReportTypes = catchAsync(async (req, res) => {
  const result = await reportService.getReportTypes();
  res.send(result);
});

module.exports = {
  getReports,
  createReport,
  getReportTypes,
};
