const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const vhttRoute = require('./vhtt.route');
const reportRoute = require('./report.route');
const officerRoute = require('./officer.route');
const config = require('../../config/config');
const districtRoute = require('./district.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/officer',
    route: officerRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  { path: '/vhtt', route: vhttRoute },
  {
    path: '/report',
    route: reportRoute,
  },
  {
    path:'/districts',
    route: districtRoute,
  }
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
