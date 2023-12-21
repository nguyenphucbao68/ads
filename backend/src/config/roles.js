const allRoles = {
  ward: ['getProfile', 'updateUser', 'resetPassword', 'viewAdsLicenses', 'postAdsLicense', 'deleteAdsLicense', 'getReports'],
  district: ['getWardsFromDistrict'],
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
    'updateAdsType',
    'deleteAdsType',
    'createAdsType',
    'createSpotType',
    'updateSpotType',
    'deleteSpotType',
    'deleteAdsPanel',
    'updateAdsPanel',
    'createAdsPanel',
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
