const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const adsLicenseRoute = require('./ads-license.route');
const reportRoute = require('./report.route');
const vhttRoute = require('./vhtt.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  { path: '/ads-licenses', route: adsLicenseRoute },
  { path: '/reports', route: reportRoute },
  { path: '/vhtt', route: vhttRoute },
];

const devRoutes = [
  // routes available only in development mode
  // {
  //   path: '/docs',
  //   route: docsRoute,
  // },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
