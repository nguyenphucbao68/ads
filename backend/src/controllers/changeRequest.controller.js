const catchAsync = require('../utils/catchAsync');
const { changeRequestService } = require('../services');

const update = catchAsync(async (req, res) => {
  const data = await changeRequestService.update(req.params.id, req.body);
  res.send(data);
});

const create = catchAsync(async (req, res) => {
  const data = await changeRequestService.create(req.body, req.user.id);
  res.send(data);
});

module.exports = {
  update,
  create,
};
