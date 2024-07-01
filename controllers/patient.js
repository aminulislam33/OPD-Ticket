const Patients = require('../models/AppointmentPatient');
const pdf = require('html-pdf');
const path = require('path');
const ejs = require('ejs');

async function handleBookAppointment(req, res) {
  const { name, age, gender, mobile, doctor, date } = req.body;
  try {
    const patient = await Patients.create({
      name,
      age,
      gender,
      mobile,
      doctor,
      date
    });

    res.redirect(`/patient/appointment/${patient._id}`);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while booking the appointment' });
  }
}

async function handlePdfGeneration(req, res) {
  try {
    const patientId = req.params.patientId;
    const patient = await Patients.findById(patientId);
    
    if (!patient) {
      return res.status(404).send('Patient not found (handlePdfGeneration)');
    }
    
    const hospitalName = 'Lifeline Healthcare Pvt Ltd';
    const appointmentDate = new Date(patient.date)
    console.log(appointmentDate)
    res.render('patient-details', { hospitalName, patient, appointmentDate, patientId });
  } catch (error) {
    res.status(500).send('An error occurred at handlePdfGeneration');
  }
}

async function handlePdfDownload(req, res) {
  try {
    const patientId = req.params.patientId;
    const patient = await Patients.findById(patientId);
    
    if (!patient) {
      return res.status(404).send('Patient not found (handlePdfDownload)');
    }

    const hospitalName = 'Lifeline Healthcare Pvt Ltd';
    const filePath = path.resolve('./views/pdf-template.ejs');
    const html = await ejs.renderFile(filePath, { hospitalName, patient });
    
    const options = { format: 'A4' };
    pdf.create(html, options).toStream((err, stream) => {
      if (err) {
        return res.status(500).send('An error occurred while generating the PDF');
      }
      res.setHeader('Content-type', 'application/pdf');
      res.setHeader('Content-disposition', `attachment; filename=Patient_${patientId}.pdf`);
      stream.pipe(res);
    });
  } catch (error) {
    res.status(500).send('An error occurred at handlePdfDownload');
  }
}

module.exports = {
  handleBookAppointment,
  handlePdfGeneration,
  handlePdfDownload
};