
const Patients = require('../models/patient');

async function handleBookAppointment(req, res) {
    const { name, age, gender, mobile, doctor, date } = req.body;

    if (!name || !age || !gender || !mobile || !doctor || !date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

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
        console.error('Error creating patient:', error);
        res.status(500).json({ error: 'An error occurred while booking the appointment' });
    }
};

async function handlePdfGeneration(req, res) {
    try {
        const patientId = req.params.patientId;
        const patient = await Patients.findById(patientId);

        if (!patient) {
            return res.status(404).send('Patient not found');
        }

        const hospitalName = 'LMBT Healthcare Pvt Ltd';
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          
          function formatDate(dateString) {
              const date = new Date(dateString);
              const day = date.getDate();
              const month = monthNames[date.getMonth()];
              const year = date.getFullYear();
          
              return `${month} ${day}, ${year}`;
          }
          
          
          const appointmentDate = formatDate(patient.date);
          
        res.render('patient-details', { hospitalName, patient, appointmentDate, patientId });
    } catch (error) {
        res.status(500).send('An error occurred');
    }
}

module.exports = {
    handleBookAppointment,
    handlePdfGeneration,
};