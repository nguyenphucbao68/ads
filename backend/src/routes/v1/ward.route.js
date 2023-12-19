const express = require('express');
const validate = require('../../middlewares/validate');
const { adsPanelValidation } = require('../../validations');
const { adsPanelController } = require('../../controllers');

const router = express.Router();

router.route('/:wardId/ads-panels', validate(adsPanelValidation.getAdsPanelByWard), adsPanelController.getAdsPanelByWard);

module.exports = router;
