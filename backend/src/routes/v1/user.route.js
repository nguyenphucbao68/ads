const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .get(auth('getProfile'), userController.getProfile)
  .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

router.route('/:userId').get(auth('getUser'), validate(userValidation.getUser), userController.getUser);

router
  .route('/history/:page/:limit')
  .post(auth('seeHistory'), validate(userValidation.getHistoryByUId), userController.getHistoryByUId);
module.exports = router;
