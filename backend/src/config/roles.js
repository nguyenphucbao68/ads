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
    'createDistrict',
    'updateDistrict',
    'deleteDistrict',
    'createWard',
    'updateWard',
    'deleteWard',
    'createAdsSpot',
    'updateAdsSpot',
    'deleteAdsSpot',
  ],
};

allRoles.district = [...allRoles.ward, ...allRoles.district];
allRoles.vhtt = [...allRoles.district, ...allRoles.vhtt];

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
