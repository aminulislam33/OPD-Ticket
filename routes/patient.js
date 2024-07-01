const express = require('express');
const router = express.Router();
const {checkAuth} = require('../services/auth')
const { handleBookAppointment, handlePdfGeneration, handlePdfDownload } = require('../controllers/patient');

router.post('/appointment', checkAuth, handleBookAppointment);
router.get('/appointment/:patientId', checkAuth, handlePdfGeneration);
router.get('/appointment/:patientId/download-pdf', checkAuth, handlePdfDownload);

module.exports = router;