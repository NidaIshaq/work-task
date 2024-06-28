const newLocal = require("express");
const express = newLocal;
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
  registerDoctor,
  getAllDoctors,
  loginDoctor,
  fetchAppointments,
  changeAppointmentStatus,
  fetchEmergencyAppointments,
  acceptedAppointments,
  changeAppointmentStatusToDone
} = require("../controllers/doctorCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST  GET SINGLE DOC INFO
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

//GET Appointments
router.get(
  "/doctor-appointments",
  authMiddleware,
  doctorAppointmentsController
);

//POST Update Status
router.post("/update-status", authMiddleware, updateStatusController);


router.post("/registerDoctor", registerDoctor);
router.post("/registerDoctor", registerDoctor);
router.post("/loginDoctor", loginDoctor);
router.get("/getAllDoctors",getAllDoctors)
router.get(`/fetchAppointments/:doctorId`,fetchAppointments)
router.patch("/changeAppointmentStatus/:appointmentId", changeAppointmentStatus);
router.get(`/fetchEmergencyAppointments/:doctorId`,fetchEmergencyAppointments)
router.get(`/acceptedAppointments/:doctorId`,acceptedAppointments)
router.patch('/changeAppointmentStatusToDone/:appointmentId', changeAppointmentStatusToDone);

module.exports = router;
