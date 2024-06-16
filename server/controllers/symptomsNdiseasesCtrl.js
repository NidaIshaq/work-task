const diseaseModel = require('../models/diseaseModel');
const Symptom = require('../models/symptomsModel')

const addSymptomController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Symptom name is required", success: false });
    }

    const existingSymptom = await Symptom.findOne({ name });
    if (existingSymptom) {
      return res.status(200).send({ message: "Symptom Already Exists", success: false });
    }

    const newSymptom = new Symptom({ name });
    await newSymptom.save();

    res.status(201).send({ message: "Symptom Added Successfully", success: true, symptom: newSymptom });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Add Symptom Controller Error: ${error.message}`,
    });
  }
};

const getAllSymptoms = async(req,res) => {
  try {
    const symptoms = await Symptom.find();
    res.status(200).json(symptoms);
} catch (error) {
    res.status(500).json({ message: 'Error fetching symptoms' });
}
};

const addDisease = async (req, res) => {
  try {
    const newDisease = new diseaseModel({
      name: req.body.name,
      description: req.body.description,
      animalType: req.body.animalType,
      treatment: req.body.treatment,
      symptoms: req.body.symptoms 
    });

 
    await newDisease.save();

  
    res.status(201).json({ success: true, disease: newDisease });
  } catch (error) {
   
    console.error('Error adding disease:', error);
    res.status(500).json({ success: false, message: `Error adding disease: ${error.message}` });
  }
};



module.exports = { addSymptomController , getAllSymptoms, addDisease};
