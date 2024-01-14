const catchAsync = require('../utils/catchAsync');
const { changeRequestService } = require('../services');
const socketController = require('./socket.Controller');

const update = catchAsync(async (req, res) => {
  const data = await changeRequestService.update(req.params.id, req.body);
  // const room = await socketController.findRoomById(data.user_id);
  req.io.to(`user-${data.user_id}`).emit('updateChangeRequest', data.id);
  res.send(data);
});

const create = catchAsync(async (req, res) => {
  const data = await changeRequestService.create(req.body, req.user.id);
  res.send(data);
});
const get = catchAsync(async (req, res) => {
  const data = await changeRequestService.get(req.user.id);
  res.send(data);
});

module.exports = {
  update,
  create,
  get,
};
