const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  userAppointmentsController,
  applyAppointment,
  emergencyAppointment,
  logout
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//APply Doctor || POST
router.post("/apply-doctor",authMiddleware, applyDoctorController);


//Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);
router.post("/applyAppointment", authMiddleware,applyAppointment)
router.post("/emergencyAppointment", authMiddleware,emergencyAppointment)
router.post("/logout", logout)



module.exports = router;
