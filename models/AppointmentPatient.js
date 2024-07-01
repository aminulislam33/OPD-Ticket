const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    doctor: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
}, {timestamps: true});

const Patients = mongoose.model("Patients", AppointmentSchema);

module.exports = Patients;