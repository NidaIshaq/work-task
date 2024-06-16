const mongoose = require('mongoose');

const symptomSchema = new mongoose.Schema({
  name: { type: String, required: true }
});


const symptomsModel = mongoose.model("Symptoms", symptomSchema);

module.exports = symptomsModel;


