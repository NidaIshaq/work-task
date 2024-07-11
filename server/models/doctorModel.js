const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
   
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    cnic:{
      type: String,
      required: [true, "CNIC is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    clinicName: {
      type: String,
      required: [true, "Clinic Name is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      required: [true, "specialization is require"],
    },
    experience: {
      type: String,
      required: [true, "experience is required"],
    },
    feesPerCunsaltation: {
      type: Number,
      required: [true, "fee is required"],
    },
  
    startTime: {
      type: String,
      required: [true, "wrok timing is required"],
    },
    endTime: {
      type: String,
      required: [true, "wrok timing is required"],
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
