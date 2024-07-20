const express = require('express');
const { handleBookAppointment, handlePdfGeneration, handlePdfDownload } = require('../controllers/patient');
const router = express.Router();

router.post('/appointment',  handleBookAppointment);
router.get('/appointment', (req,res)=>{return res.render("book-appointment")});
router.get('/appointment/:patientId',  handlePdfGeneration);

module.exports = router;