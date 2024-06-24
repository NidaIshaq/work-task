// const mongoose = require('mongoose');

// const doctorResponseSchema = new mongoose.Schema({
//     appointment: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'EmergencyAppointment',
//         required: true
//     },
//     doctor: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Doctor',
//         required: true
//     },
//     response: {
//         type: String,
//         enum: ['Accepted', 'Rejected'],
//         required: true
//     },
//     responseTime: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('DoctorResponse', doctorResponseSchema);
