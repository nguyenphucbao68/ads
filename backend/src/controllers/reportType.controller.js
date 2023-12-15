const catchAsync = require('../utils/catchAsync');
const { reportTypeService } = require('../services');

const getAll = catchAsync(async (req, res) => {
  const data = await reportTypeService.getAll();
  res.send(data);
});

const getById = catchAsync(async (req, res) => {
  const data = await reportTypeService.getById(req.params.id);
  res.status(201).send(data);
});

const create = catchAsync(async (req, res) => {
  const data = await reportTypeService.create(req.body);
  res.status(201).send(data);
});

const update = catchAsync(async (req, res) => {
  const data = await reportTypeService.update(req.params.id, req.body);
  res.send(data);
});

const deleteReportType = catchAsync(async (req, res) => {
  await reportTypeService.deleteReportType(req.params.id);
  res.status(204).send();
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteReportType,
};
