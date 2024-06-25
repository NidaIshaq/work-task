// const mongoose = require('mongoose');

// const emergencyAppointmentSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     doctor: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Doctor',
//         required: true
//     },
//     appointmentTime: {
//         type: Date,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['Pending', 'Accepted', 'Rejected'],
//         default: 'Pending'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('EmergencyAppointment', emergencyAppointmentSchema);
