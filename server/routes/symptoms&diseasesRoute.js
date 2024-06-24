const express = require('express');
const router = express.Router();
const { addSymptomController,getAllSymptoms, addDisease, searchDiseases, diseaseDetails, getAllDiseases,addDietPlan, fetchDietPlan} = require('../controllers/symptomsNdiseasesCtrl');


// Admin Panel
router.post('/add-symptom', addSymptomController);
router.get('/getAllSymptoms', getAllSymptoms)
router.post('/addDisease', addDisease)

//for user
router.post('/searchDiseases', searchDiseases);
router.get('/diseaseDetails/:id', diseaseDetails);

// for diet plan module:
router.get('/getAllDiseases', getAllDiseases);
router.post('/addDietPlan', addDietPlan)

//Diet Plan at user side
router.get('/fetchDietPlan/:diseaseId', fetchDietPlan);



module.exports = router;
