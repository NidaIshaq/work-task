const Disease = require('../models/diseaseModel');
const Symptom = require('../models/symptomsModel');
const DietPlan = require('../models/dietPlanModel')

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

const getAllSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find();
    res.status(200).json(symptoms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching symptoms' });
  }
};

const addDisease = async (req, res) => {
  try {
    const newDisease = new Disease({
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

const searchDiseases = async (req, res) => {
  const { animalType, symptoms } = req.body;
  try {
    console.log('Searching diseases with animal type:', animalType);
    console.log('Searching diseases with symptoms:', symptoms);

    const diseases = await Disease.find({
      animalType: animalType,
      symptoms: { $all: symptoms }
    }).populate('symptoms').exec();

    console.log('Found diseases:', diseases);

    res.status(200).json({ success: true, diseases });
  } catch (error) {
    console.error('Error searching diseases:', error);
    res.status(500).json({ success: false, message: `Error searching diseases: ${error.message}` });
  }
};

const diseaseDetails =  async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id).populate('symptoms').exec();
    if (!disease) {
      return res.status(404).json({ success: false, message: 'Disease not found' });
    }
    res.json({ success: true, disease });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

const getAllDiseases = async (req,res) => {
  try {
    const diseases = await Disease.find();
    res.json(diseases);
} catch (err) {
    res.status(500).json({ message: err.message });
}
}

const addDietPlan = async (req,res) => {
  const dietPlan = new DietPlan({
    disease: req.body.disease,
    dietaryGoal: req.body.dietaryGoal,
    morningMeal: req.body.morningMeal,
    afternoonMeal: req.body.afternoonMeal,
    lateAfternoonMeal: req.body.lateAfternoonMeal,
    eveningMeal: req.body.eveningMeal,
    supplements: req.body.supplements,
    additionalTips: req.body.additionalTips
});

try {
    const newDietPlan = await dietPlan.save();
    res.status(201).json(newDietPlan);
} catch (err) {
    res.status(400).json({ message: err.message });
}
}

const fetchDietPlan = async (req,res) =>{
  try {
    const { diseaseId } = req.params;
    const dietPlan = await DietPlan.findOne({ disease: diseaseId });

    if (!dietPlan) {
        return res.status(404).json({ success: false, message: 'Diet plan not found' });
    }

    res.status(200).json({ success: true, dietPlan });
} catch (error) {
    console.error('There was an error fetching the diet plan!', error);
    res.status(500).json({ success: false, message: 'Server error' });
}
}
module.exports = { addSymptomController, getAllSymptoms, addDisease, 
                   searchDiseases,diseaseDetails , getAllDiseases, addDietPlan, fetchDietPlan};
