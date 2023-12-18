const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .get(auth('getProfile'), userController.getProfile)
  .put(auth('updateUser'), validate(userValidation.update), userController.update);

module.exports = router;
