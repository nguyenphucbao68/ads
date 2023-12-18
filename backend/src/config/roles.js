const allRoles = {
  ward: ['getProfile', 'updateUser', 'resetPassword'],
  district: [],
  vhtt: [
    'createAdsPanelType',
    'updateAdsPanelType',
    'deleteAdsPanelType',
    'createReportType',
    'updateReportType',
    'deleteReportType',
    'updateAdsLicense',
    'updateChangeRequest',
    'createUser',
    'updateUser',
    'deleteUser',
  ],
  // user: ['createTicket', 'seeHistory', 'createReview', 'printTicket', 'discardTicket', 'payTicket'],

  // bus_operator: [
  //   'bookingList',
  //   'busList',
  //   'cloneBus',
  //   'deleteTicket',
  //   'updateTicket',
  //   'bookingGet',
  //   'bookingUpdate',
  //   'createBus',
  //   'deleteBus',
  //   'updateBus',
  //   'getBus',
  // ],

  // admin: ['getBOByID', 'viewBO', 'createBO', 'updateBO', 'deteleBO'],
};

allRoles.district = [...allRoles.ward];
allRoles.vhtt = [...allRoles.district];

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
