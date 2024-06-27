const express = require('express');
const router = express.Router();
const { handleBookAppointment, handlePdfGeneration, handlePdfDownload } = require('../controllers/patient');

router.post('/appointment', handleBookAppointment);
router.get('/appointment/:patientId', handlePdfGeneration);
router.get('/appointment/:patientId/download-pdf', handlePdfDownload);

module.exports = router;