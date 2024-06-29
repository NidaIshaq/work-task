const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require ('nodemailer')
const {google} = require ('googleapis')
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from config.env file
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });


// Gmail API scopes
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// Creating an OAuth2 client
const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET,process.env.REDIRECT_URI);

//oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });


const registerDoctor = async (req, res) => {
  try {
    const { password, ...otherDetails } = req.body;
    
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doctor = new doctorModel({
      ...otherDetails,
      password: hashedPassword,
    });

    await doctor.save();

    // Generate token
    const token = JWT.sign(
      { id: doctor._id, email: doctor.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).send({ doctor, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.status(400).send({
        message: "Invalid email or password",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).send({
        message: "Invalid email or password",
        success: false,
      });
    }

    // Generate token
    const token = JWT.sign(
      { id: doctor._id, email: doctor.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).send({ doctor, token });
  } catch (error) {
    res.status(500).send({
      message: "Login failed",
      success: false,
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.json(doctors); 
  } catch (err) {
    console.log('Error fetching doctors:', err);
    res.status(500).json({ message: "Error fetching doctors" });
  }
};


// Create a transporter
const createTransporter = async () => {
  // const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_SENDER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken:  oAuth2Client.credentials.access_token,
    },
  });

  return transporter;
};

// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    const transporter = await createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const fetchAppointments = async (req, res) => {
  try {
    
    const appointments = await appointmentModel.find({ 
      doctorId: req.params.doctorId,
      type: 'normal',
      status: 'pending'
    });
    const appointmentsWithUserData = await Promise.all(
      appointments.map(async (appointment) => {
        const user = await userModel.findById(appointment.userId);
        return {
          ...appointment._doc,
          user,
        };
      })
    );

    res.status(200).json({ success: true, appointments: appointmentsWithUserData });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const changeAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    const user = await userModel.findById(appointment.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const doctor = await doctorModel.findById(appointment.doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    

    const subject = status === 'accepted' ? 'Appointment Confirmed' : 'Appointment Rejected';
    const text = status === 'accepted'
      ? `Dear ${user.name},\n\nYour appointment with Dr. ${doctor.firstName} ${doctor.lastName} on ${appointment.date} at ${appointment.time} has been confirmed.\n\nThank you.`
      : `Dear ${user.name},\n\nWe regret to inform you that your appointment with Dr. ${doctor.firstName} ${doctor.lastName} on ${appointment.date} at ${appointment.time} has been rejected.\n\nThank you.`;

    await sendEmail(user.email, subject, text);

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    console.error('Error changing appointment status:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const fetchEmergencyAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ 
      doctorId: req.params.doctorId,
      type: 'emergency',
      status: 'pending'
    });

    const appointmentsWithUserData = await Promise.all(
      appointments.map(async (appointment) => {
        const user = await userModel.findById(appointment.userId);
        return {
          ...appointment._doc,
          user,
        };
      })
    );

    res.status(200).json({ success: true, appointments: appointmentsWithUserData });
  } catch (error) {
    console.error('Error fetching emergency appointments:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const acceptedAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ 
      doctorId: req.params.doctorId,
    
      status: 'accepted'
    });

    const appointmentsWithUserData = await Promise.all(
      appointments.map(async (appointment) => {
        const user = await userModel.findById(appointment.userId);
        return {
          ...appointment._doc,
          user,
        };
      })
    );

    res.status(200).json({ success: true, appointments: appointmentsWithUserData });
  } catch (error) {
    console.error('Error fetching accepted appointments:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const changeAppointmentStatusToDone = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    
    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status: 'done' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    console.error('Error updating appointment status to done:', error);
    res.status(500).json({ success: false, message: 'Failed to update appointment status' });
  }
};

const getDoctorData = async (req, res) => {
  try {
    console.log("Doctors id ==",req.params.id)
    const doctor = await doctorModel.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update doctor details
const updateDoctor = async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Exclude the password field
    
    const doctor = await doctorModel.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
 
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

};
