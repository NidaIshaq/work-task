const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");
const dotenv = require("dotenv");

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
<<<<<<< HEAD
    // Include the user data in the response
    res
      .status(200)
      .send({ message: "Login Success", success: true, token, user });
=======
    
    res.status(200).send({ message: "Login Success", success: true, token, user });
>>>>>>> origin/main
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

// APpply DOctor CTRL
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = new doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    // const adminUser = await userModel.findOne({ isAdmin: true });

    // if (!adminUser) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "Admin user not found",
    //   });
    // }

    // if (!adminUser.notification) {
    //   adminUser.notification = [];
    // }

    // adminUser.notification.push({
    //   type: "apply-doctor-request",
    //   message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
    //   data: {
    //     doctorId: newDoctor._id,
    //     name: `${newDoctor.firstName} ${newDoctor.lastName}`,
    //     onClickPath: "/admin/doctors",
    //   },
    // });

    // await userModel.findByIdAndUpdate(adminUser._id, { notification: adminUser.notification });
    res.status(201).send({
      success: true,
      message: "Doctor account applied successfully",
    });
  } catch (error) {
    console.error("Error while applying for doctor:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while applying for doctor",
    });
  }
};







const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};

const applyAppointment = async (req, res) => {
  try {
    const { date, time, doctorId } = req.body;
    const userId = req.body.userId;

    // Fetch doctor info to get their available time slots
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const startTime = moment(doctor.startTime, "HH:mm");
    const endTime = moment(doctor.endTime, "HH:mm");
    const appointmentTime = moment(time, "HH:mm");

    // Check if the appointment time is within the doctor's available time slots
    if (!appointmentTime.isBetween(startTime, endTime, null, '[]')) {
      return res.status(400).json({
        message: `Doctor is only available between ${doctor.startTime} and ${doctor.endTime}`,
      });
    }

    // Check if there's already an appointment at the given time and date for the doctor
    const existingAppointment = await appointmentModel.findOne({
      doctorId,
      date,
      time,
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: 'This time slot is already booked. Please choose another time.',
      });
    }

    const newAppointment = new appointmentModel({
      userId,
      doctorId,
      date,
      time,
    });

    await newAppointment.save();
    return res.status(201).json({
      message: 'Appointment created successfully',
      appointment: newAppointment,
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};


const emergencyAppointment = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const userId = req.body.userId;

    const appointment = new appointmentModel({
      userId,
      doctorId,
      date: new Date().toISOString().slice(0, 10), // Current date
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }), // Current time
      status: "pending",
      type: "emergency", // Setting the type to emergency
    });

    await appointment.save();

    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error saving appointment:", error);
    res.status(500).json({ error: "Failed to save appointment" });
  }
};

const logout = async (req, res) => {
  try {
    // Clear the token on the client side
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  userAppointmentsController,
  applyAppointment,
  emergencyAppointment,
  logout,
};
