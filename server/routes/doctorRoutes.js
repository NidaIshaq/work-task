const newLocal = require("express");
const express = newLocal;
const {
  
  registerDoctor,
  getAllDoctors,
  loginDoctor,
  fetchAppointments,
  changeAppointmentStatus,
  fetchEmergencyAppointments,
  acceptedAppointments,
  changeAppointmentStatusToDone,
  getDoctorData,
  updateDoctor
} = require("../controllers/doctorCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const doctorAuthMiddleware = require("../middlewares/doctorAuthMiddleware")
const router = express.Router();


router.post("/registerDoctor", registerDoctor);
router.post("/registerDoctor", registerDoctor);
router.post("/loginDoctor", loginDoctor);
router.get("/getAllDoctors",getAllDoctors)
router.get(`/fetchAppointments/:doctorId`,fetchAppointments)
router.patch("/changeAppointmentStatus/:appointmentId", changeAppointmentStatus);
router.get(`/fetchEmergencyAppointments/:doctorId`,fetchEmergencyAppointments)
router.get(`/acceptedAppointments/:doctorId`,acceptedAppointments)
router.patch('/changeAppointmentStatusToDone/:appointmentId', changeAppointmentStatusToDone);
router.get(`/getDoctorData/:id`,getDoctorData);
router.patch('/updateDoctor/:id',updateDoctor);


module.exports = router;
