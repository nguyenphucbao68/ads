const { socketService, districtService, wardService } = require('../services');
const joinRoomById = async (socket, id) => {
  const role = await socketService.findRoleById(id);
  if (role != 0) {
    if (role == 1) {
      const districtId = await districtService.getDistrictIdByUserId(id);
      if (districtId != null) {
        socket.join(`district-${districtId}`);
        return `district-${districtId}`;
      }
    } else if (role == 2) {
      const wardId = await wardService.getWardIdByUserId(id);
      if (wardId != null) {
        socket.join(`ward-${wardId}`);
        return `ward-${wardId}`;
      }
    }
  }
  return null;
};
module.exports = {
  joinRoomById,
};
