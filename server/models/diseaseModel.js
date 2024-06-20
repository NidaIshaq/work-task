const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  animalType: { type: String, required: true },
  treatment:{type:String},
  symptoms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Symptoms' }]
});

const diseaseModel = mongoose.model('Disease', diseaseSchema);
module.exports = diseaseModel;
