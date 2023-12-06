import express from "express";
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import district from '../../validations/district.validation';
import districtController from '../../controllers/district.controller' 

const router = express.Router();


router.route('/district').get(auth('getWards'), validate(district.getWards), districtController.getWards);

