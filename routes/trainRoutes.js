const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

router.post('/admin/add-train', adminAuthMiddleware, trainController.addTrain);
router.get('/availability', trainController.getSeatAvailability);

module.exports = router;
