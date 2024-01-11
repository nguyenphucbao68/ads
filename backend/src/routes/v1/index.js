const express = require('express');
const authRoute = require('./auth.route');
const vhttRoute = require('./vhtt.route');
const reportRoute = require('./report.route');
const officerRoute = require('./officer.route');
const userRoute = require('./user.route');
const wardRoute = require('./ward.route');
const citizenRoute = require('./citizen.route');

const config = require('../../config/config');

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

  { path: '/vhtt', route: vhttRoute },
  {
    path: '/report',
    route: reportRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/ward',
    route: wardRoute,
  },
  {
    path: '/citizen',
    route: citizenRoute,
  },
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
