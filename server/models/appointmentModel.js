const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
   
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    type:{               //normal or emergency
      type:String,
      default: "normal",
    },
    status: {           // pending, accepted, rejected, done
      type: String,
      required: true,
      default: "pending",
    },
    
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = appointmentModel;
